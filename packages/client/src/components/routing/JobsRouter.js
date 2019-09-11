import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Routing imports
import { Switch, Route } from "react-router-dom";

// Material UI imports
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

// Custom components import
import NavBar from "../navbar";
import Header from "../header";
import JobCard from "../jobCard";
import Pagination from "../pagination";
import ScrollUp from "../scrollUp";

// Component specific styling
const styles = theme => ({
  cardsContainer: {
    paddingTop: "1em"
  }
});

const JobsRouter = ({ match, serverUrl, classes }) => {
  const [jobs, setJobs] = useState([]);
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

  const scrollUpRef = useRef(null);

  const handleScroll = () => {
    scrollUpRef.current.children[0].click();
  };
  const changePage = offset => {
    setOffset(offset);
  };

  if (jobs.length !== 0)
    return (
      <>
        <NavBar />
        <Header />
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.cardsContainer}
        >
          {jobs.map(job => (
            <JobCard key={job.id} jobInfo={job} />
          ))}
          <Pagination totalJobs={totalJobs} offset={offset} changePage={changePage} />
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
