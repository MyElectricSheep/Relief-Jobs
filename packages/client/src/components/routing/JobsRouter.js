import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Tools & Utilities importa
import axios from "axios";
import _ from "lodash";

// Routing imports
import { Switch, Route } from "react-router-dom";

// Animation imports
import { useTrail, animated } from "react-spring";

// Material UI & Styling imports
import { Grid, useMediaQuery, Modal, Backdrop, Fade, Slide } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import "./styles.css";

// Custom components import
import NavBar from "../navbar";
import Header from "../header";
import SearchAndFilter from "../searchAndFilter";
import TotalJobs from "../totalJobs/";
import JobCard from "../jobCard";
import JobPage from "../jobPage";
import Pagination from "../pagination";
import ScrollUp from "../scrollUp";

// Component specific styling
const styles = theme => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.6em"
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.3)",
      outline: "1px solid slategrey"
    }
  },
  cardsContainer: {
    paddingTop: "1em"
  },
  cardsGrid: {
    paddingLeft: "1em"
  },
  jobPageGrid: {
    paddingLeft: "1em",
    paddingRight: "1em",
    position: "sticky",
    top: 50,
    maxHeight: "calc(100vh - 50px)",
    overflow: "auto",
    overflowStyle: "none",
    overflowY: "scroll",
    overflowX: "hidden",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      width: "0px",
      background: "transparent"
    }
  },
  modal: {
    width: "100%",
    overflow: "auto"
  }
});

// React-spring config
const config = { mass: 5, tension: 2000, friction: 200 };

const JobsRouter = ({ match, serverUrl, classes }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [filters, setFilters] = useState({
    experience: {
      "0-2": false,
      "3-4": false,
      "5-9": false,
      "10%2B": false
    },
    contract: {
      job: false,
      volunteer: false,
      internship: false,
      consultancy: false
    },
    career: {
      9999: false, // Other
      36601: false, // Logistics/Procurement
      20971: false, // Information Management
      20966: false, // Donor Relations/Grants Management
      6868: false, // Monitoring and Evaluation
      6867: false, // Program/Project Management
      6866: false, // Information and Communications Technology
      6865: false, // Advocacy/Communications
      6864: false, // Administration/Finance
      6863: false, // Human Resources
      9991: false // Training
    }
  });

  const [filterBadges, setFilterBadges] = useState({
    experience: 0,
    contract: 0,
    career: 0
  });

  const [jobs, setJobs] = useState([]); // gets 30 jobs card info based on filters /search bar /pagination
  const [selectedJob, setSelectedJob] = useState(null); // when the user clicks on a job card
  const [fullJobInfo, setFullJobInfo] = useState(null); // API call to get all details for a job
  const [totalJobs, setTotalJobs] = useState(0); // number of total jobs in the database for that query
  const [offset, setOffset] = useState(0); // offset for pagination
  const [openModal, setOpenModal] = useState(false); // handles the mobile display of a full page job
  const [toggle, set] = useState(true); // handles the initial card animation
  const [searchInput, setSearchInput] = useState(null); // handles the search query
  const [noJobs, setNoJobs] = useState(false); // handles what happens when the DB returns 0 jobs
  const [resetOrder, setResetOrder] = useState(false); // Handles the reset of the search bar input

  // React-spring trail set-up for job cards fade in
  const cardsTrail = useTrail(jobs && jobs.length > 0 ? jobs.length : 0, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 60,
    delay: 500,
    from: { opacity: 0, x: 60 }
  });

  // This functions debounces the user's input in the search bar
  // so that the new API call launches only when the user stops typing
  const handleSearchBarInput = _.debounce(
    input => {
      setSearchInput(input);
    },
    500
    // { leading: false, trailing: true }
  );

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = e => {
    setOpenModal(false);
    setSelectedJob(null);
  };

  const { path } = match;

  useEffect(() => {
    setResetOrder(false);
    const xpFilters = Object.keys(filters.experience).filter(key => filters.experience[key]);
    const contractFilters = Object.keys(filters.contract).filter(key => filters.contract[key]);
    const careerFilters = Object.keys(filters.career).filter(key => filters.career[key]);
    const xpQuery = xpFilters ? xpFilters.map(filter => `xp[]=${filter}`).join("&") : null;
    const contractQuery = contractFilters
      ? contractFilters.map(filter => `contract[]=${filter}`).join("&")
      : null;
    const searchQuery = searchInput && searchInput.length > 1 ? `q=${searchInput}` : null;
    setFilterBadges({
      experience: xpFilters.length,
      contract: contractFilters.length,
      career: careerFilters.length
    });

    const buildQuery = queries => {
      const filters = queries.join("&");
      if (!filters || filters === "&" || filters === "&&") {
        return `${serverUrl}/v1/jobs/latest/${offset}`;
      } else return `${serverUrl}/v1/jobs/latest/${offset}?${filters}`;
    };

    const setJobsData = async () => {
      const result = await axios(buildQuery([xpQuery, contractQuery, searchQuery]));
      if (result.data.jobs) {
        setNoJobs(false);
        setJobs(result.data.jobs);
        setTotalJobs(result.data.filteredCount);
        setOffset(result.data.paginationIndex);
      }
      if (result.data.emptyDatabase) setNoJobs(true);
      if (result.data.jobs) handleScroll();
    };
    setJobsData();
  }, [offset, serverUrl, filters, searchInput]);

  useEffect(() => {
    const setUniqueJobToDisplay = async () => {
      if (selectedJob) {
        const result = await axios(`${serverUrl}/v1/jobs/id/${selectedJob.id}`);
        setFullJobInfo(result.data);
      }
    };
    setUniqueJobToDisplay();
  }, [selectedJob]);

  const handleSetSelectedJob = info => {
    setSelectedJob(info);
    handleScroll();
  };

  const handleMobileSetSelectedJob = info => {
    setSelectedJob(info);
    handleOpenModal();
  };

  const scrollUpRef = useRef(null);

  const handleScroll = () => {
    scrollUpRef.current.children[0].click();
  };

  const changePage = offset => {
    setOffset(offset);
    setSelectedJob(null);
    setFullJobInfo(null);
  };

  const handleClosePage = () => {
    setSelectedJob(null);
  };

  // if (jobs && jobs.length !== 0)
  return (
    <>
      {isMobile ? null : <NavBar />}
      {isMobile ? null : <Header />}
      <Grid container direction="row" justify="center" alignItems="center">
        <SearchAndFilter
          filters={filters}
          setFilters={setFilters}
          filterBadges={filterBadges}
          searchInput={searchInput}
          handleSearchBarInput={handleSearchBarInput}
          resetOrder={resetOrder}
        />
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ paddingTop: "2em", paddingBottom: "1em" }}
      >
        {jobs && jobs.length !== 0 && (
          <TotalJobs
            totalJobs={totalJobs}
            filters={filters}
            setFilters={setFilters}
            noJobs={noJobs}
            setSearchInput={setSearchInput}
            setResetOrder={setResetOrder}
          />
        )}
      </Grid>
      {jobs && jobs.length !== 0 && !noJobs && (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          className={classes.cardsContainer}
        >
          {!selectedJob && (
            <>
              {cardsTrail.map(({ x, ...rest }, index) =>
                jobs[index] ? (
                  <animated.div
                    key={jobs[index].id}
                    className="cardTrail"
                    style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}
                  >
                    <animated.div>
                      <JobCard
                        jobInfo={jobs[index]}
                        setSelectedJob={
                          !isMobile ? handleSetSelectedJob : handleMobileSetSelectedJob
                        }
                      />
                    </animated.div>
                  </animated.div>
                ) : null
              )}
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ paddingTop: "1em", paddingBottom: "1em" }}
              >
                <Pagination
                  totalJobs={totalJobs}
                  offset={parseInt(offset)}
                  changePage={changePage}
                />
              </Grid>
            </>
          )}

          {selectedJob && (
            <Grid item xs={4} className={classes.cardsGrid}>
              {jobs.map(job => (
                <JobCard
                  key={job.id}
                  jobInfo={job}
                  selectedJob={selectedJob ? true : false}
                  setSelectedJob={handleSetSelectedJob}
                />
              ))}
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ paddingTop: "1em", paddingBottom: "1em" }}
              >
                <Pagination
                  totalJobs={totalJobs}
                  offset={parseInt(offset)}
                  changePage={changePage}
                />
              </Grid>
            </Grid>
          )}

          {(!selectedJob && !fullJobInfo) || openModal || isMobile ? null : (
            <Slide direction="left" timeout={1000} in={selectedJob} mountOnEnter unmountOnExit>
              <Grid item xs={8} className={classes.jobPageGrid} style={{ paddingBottom: "3.90em" }}>
                <JobPage
                  jobInfo={selectedJob}
                  fullJobInfo={fullJobInfo}
                  isMobile={isMobile}
                  handleClosePage={handleClosePage}
                />
              </Grid>
            </Slide>
          )}

          {!selectedJob && !fullJobInfo && !openModal ? null : (
            <Modal
              aria-labelledby="transition-fulljob-page"
              aria-describedby="transition-fulljobinfo"
              className={classes.modal}
              open={openModal}
              onClose={handleCloseModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={openModal} timeout={1000}>
                <Grid item xs={12}>
                  <JobPage
                    jobInfo={selectedJob}
                    fullJobInfo={fullJobInfo}
                    handleCloseModal={handleCloseModal}
                    isMobile={isMobile}
                  />
                </Grid>
              </Fade>
            </Modal>
          )}
          <div ref={scrollUpRef}>
            <ScrollUp />
          </div>
        </Grid>
      )}
    </>
  );
  // else return <h1>loading...</h1>;
};

JobsRouter.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(JobsRouter);
