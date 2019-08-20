import React from "react";
import PropTypes from "prop-types";

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

const JobsRouter = ({ match }) => {
  const { path } = match;
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