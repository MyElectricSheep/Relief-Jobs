import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Routing imports
import { Switch, Route } from "react-router-dom";

// Material UI imports
import { Grid, useMediaQuery, Modal, Backdrop, Fade } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";

// Custom components import
import NavBar from "../navbar";
import Header from "../header";
import JobCard from "../jobCard";
import JobPage from "../jobPage";
import Pagination from "../pagination";
import ScrollUp from "../scrollUp";

// Component specific styling
const styles = theme => ({
  cardsContainer: {
    paddingTop: "1em"
  },
  cardsGrid: {
    paddingLeft: "1em"
  },
  jobPageGrid: {
    paddingLeft: "1em",
    paddingRight: "1em"
  },
  modal: {
    width: "100%",
    overflow: "auto"
  }
});

const JobsRouter = ({ match, serverUrl, classes }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [jobs, setJobs] = useState([]); // gets 30 jobs card info based on filters/pagination
  const [selectedJob, setSelectedJob] = useState(null); // when the user clicks on a job card
  const [fullJobInfo, setFullJobInfo] = useState(null); // API call to get all details for a job
  const [totalJobs, setTotalJobs] = useState(0); // number of total jobs in the database
  const [offset, setOffset] = useState(0); // offset for pagination
  const [openModal, setOpenModal] = useState(false); // handles the mobile display of a job

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const { path } = match;

  useEffect(() => {
    const setJobsData = async () => {
      const result = await axios(`${serverUrl}/v1/jobs/latest/${offset}`);
      // console.log("Server Call:", `${serverUrl}/v1/jobs/latest/${offset}`);
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

  if (jobs && jobs.length !== 0)
    return (
      <>
        {isMobile ? null : <NavBar />}
        {isMobile ? null : <Header />}
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          className={classes.cardsContainer}
        >
          {!selectedJob
            ? jobs.map(job => (
                <JobCard
                  key={job.id}
                  jobInfo={job}
                  setSelectedJob={!isMobile ? handleSetSelectedJob : handleMobileSetSelectedJob}
                />
              ))
            : null}
          {selectedJob ? (
            <Grid item xs={4} className={classes.cardsGrid}>
              {jobs.map(job => (
                <JobCard
                  key={job.id}
                  jobInfo={job}
                  selectedJob={selectedJob ? true : false}
                  setSelectedJob={handleSetSelectedJob}
                />
              ))}
            </Grid>
          ) : null}

          {!selectedJob && !fullJobInfo && !openModal ? null : (
            <Grid item xs={8} className={classes.jobPageGrid}>
              <JobPage jobInfo={selectedJob} fullJobInfo={fullJobInfo} />
            </Grid>
          )}

          {!selectedJob && !fullJobInfo && openModal ? null : (
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
              <Fade in={openModal}>
                <Grid item xs={12}>
                  <JobPage
                    jobInfo={selectedJob}
                    fullJobInfo={fullJobInfo}
                    handleCloseModal={handleCloseModal}
                  />
                </Grid>
              </Fade>
            </Modal>
          )}

          <Pagination totalJobs={totalJobs} offset={parseInt(offset)} changePage={changePage} />
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
