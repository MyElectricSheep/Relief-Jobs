import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { Paper, Typography, makeStyles } from "@material-ui/core";

// i18n imports
import { injectIntl, intlShape, FormattedMessage } from "react-intl";

const useStyles = makeStyles(theme => ({
  root: {
    height: "600px",
    padding: theme.spacing(2, 2)
  }
}));

const JobPageContainer = props => {
  const { jobInfo } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        Job Title
      </Typography>
      <Typography component="p">This is where the job information will go</Typography>
    </Paper>
  );
};

JobPageContainer.propTypes = {
  intl: intlShape.isRequired,
  jobInfo: PropTypes.object.isRequired
};

export default injectIntl(JobPageContainer);
