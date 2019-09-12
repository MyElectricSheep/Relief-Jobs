import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Routing imports
import { Switch, Route } from "react-router-dom";

// Material UI imports
import { Grid, useMediaQuery } from "@material-ui/core";
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
  }
});

const JobsRouter = ({ match, serverUrl, classes }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const [offset, setOffset] = useState(0);
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

  const handleSetSelectedJob = id => {
    setSelectedJob(id);
  };

  const scrollUpRef = useRef(null);

  const handleScroll = () => {
    scrollUpRef.current.children[0].click();
  };
  const changePage = offset => {
    setOffset(offset);
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
          alignItems="center"
          className={classes.cardsContainer}
        >
          {!selectedJob
            ? jobs.map(job => (
                <JobCard key={job.id} jobInfo={job} setSelectedJob={handleSetSelectedJob} />
              ))
            : null}
          {selectedJob ? (
            <Grid item xs className={classes.cardsGrid}>
              {jobs.map(job => (
                <JobCard key={job.id} jobInfo={job} setSelectedJob={handleSetSelectedJob} />
              ))}
            </Grid>
          ) : null}

          {!selectedJob ? null : (
            <Grid item xs>
              <JobPage />
            </Grid>
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
