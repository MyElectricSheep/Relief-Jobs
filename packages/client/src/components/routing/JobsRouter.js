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

// Component specific styling
const styles = theme => ({
  main: {
    width: "100%"
  }
});

const JobsRouter = ({ match, serverUrl }) => {
  const [jobs, setJobs] = useState({ jobs: [] });
  const [offset, setOffset] = useState(0);
  const { path } = match;

  useEffect(async () => {
    const result = await axios(`${serverUrl}/v1/jobs/latest/${offset}`);
    setJobs(result.data);
  }, []);

  return (
    <>
      <NavBar />
      <Header />
    </>
  );
};

JobsRouter.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(JobsRouter);
