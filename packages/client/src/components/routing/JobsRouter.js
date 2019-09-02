import React, { useState, useEffect } from "react";
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

// Component specific styling
const styles = theme => ({
  cardsContainer: {
    paddingTop: "1em"
  }
});

const JobsRouter = ({ match, serverUrl, classes }) => {
  const [jobs, setJobs] = useState([]);
  const [offset, setOffset] = useState(0);
  const { path } = match;

  useEffect(() => {
    const setJobsData = async () => {
      const result = await axios(`${serverUrl}/v1/jobs/latest/${offset}`);
      setJobs(result.data);
    };
    setJobsData();
  }, [offset, serverUrl]);

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
            <JobCard jobInfo={job} />
          ))}
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
