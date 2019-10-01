import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./styles.css";

// Routing imports
import { Switch, Route } from "react-router-dom";

// Animation imports
import { useTrail, animated } from "react-spring";

// Material UI imports
import { Grid, useMediaQuery, Modal, Backdrop, Fade, Slide } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";

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

const config = { mass: 5, tension: 2000, friction: 200 };

const JobsRouter = ({ match, serverUrl, classes }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [filters, setFilters] = useState({
    experience: {
      "0-2": false,
      "3-4": false,
      "5-9": false,
      "10+": false
    }
  });

  const [jobs, setJobs] = useState([]); // gets 30 jobs card info based on filters/pagination
  const [selectedJob, setSelectedJob] = useState(null); // when the user clicks on a job card
  const [fullJobInfo, setFullJobInfo] = useState(null); // API call to get all details for a job
  const [totalJobs, setTotalJobs] = useState(0); // number of total jobs in the database
  const [offset, setOffset] = useState(0); // offset for pagination
  const [openModal, setOpenModal] = useState(false); // handles the mobile display of a job
  const [toggle, set] = useState(true); // handles the initial card animation

  const cardsTrail = useTrail(30, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 60,
    delay: 500,
    from: { opacity: 0, x: 60 }
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = e => {
    setOpenModal(false);
    setSelectedJob(null);
  };
  const { path } = match;

  useEffect(() => {
    const setJobsData = async () => {
      const result = await axios(`${serverUrl}/v1/jobs/latest/${offset}`);
      setJobs(result.data.jobs);
      setTotalJobs(result.data.totalCount);
      setOffset(result.data.paginationIndex);
      if (result.data.jobs) handleScroll();
    };
    setJobsData();
  }, [offset, serverUrl]);

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

  if (jobs && jobs.length !== 0)
    return (
      <>
        {isMobile ? null : <NavBar />}
        {isMobile ? null : <Header />}
        <Grid container direction="row" justify="center" alignItems="center">
          <SearchAndFilter filters={filters} setFilters={setFilters} />
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ paddingTop: "2em", paddingBottom: "1em" }}
        >
          <TotalJobs totalJobs={totalJobs} />
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          className={classes.cardsContainer}
        >
          {!selectedJob && (
            <>
              {cardsTrail.map(({ x, ...rest }, index) => (
                <animated.div
                  key={jobs[index].id}
                  className="cardTrail"
                  style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}
                >
                  <animated.div>
                    <JobCard
                      jobInfo={jobs[index]}
                      setSelectedJob={!isMobile ? handleSetSelectedJob : handleMobileSetSelectedJob}
                    />
                  </animated.div>
                </animated.div>
              ))}
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
      </>
    );
  else return <h1>loading...</h1>;
};

JobsRouter.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(JobsRouter);
