import React from "react";
import { Paper, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    height: "600px",
    padding: theme.spacing(2, 2)
  }
}));

const JobPageContainer = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        This is a sheet of paper.
      </Typography>
      <Typography component="p">
        Paper can be used to build surface or other elements for your application.
      </Typography>
    </Paper>
  );
};

export default JobPageContainer;
