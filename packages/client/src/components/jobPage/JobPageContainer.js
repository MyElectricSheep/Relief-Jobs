import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { Paper, Typography, makeStyles } from "@material-ui/core";

// i18n imports
import { injectIntl, intlShape, FormattedMessage } from "react-intl";

// Custom components imports
import JobSubtitle from "../jobCard/src/JobSubtitle";

const useStyles = makeStyles(theme => ({
  root: {
    height: "600px",
    padding: theme.spacing(2, 2)
  }
}));

const JobPageContainer = props => {
  const { jobInfo, fullJobInfo } = props;
  const classes = useStyles();
  if (fullJobInfo) {
    const job = fullJobInfo[0];
    return (
      <Paper className={classes.root}>
        {job.title ? (
          <Typography variant="h5" component="h3">
            {job.title}
          </Typography>
        ) : null}
        {jobInfo ? <JobSubtitle jobInfo={jobInfo} /> : null}

        <Typography component="p">This is where the job information will go</Typography>
      </Paper>
    );
  } else return null;
};

JobPageContainer.propTypes = {
  intl: intlShape.isRequired,
  jobInfo: PropTypes.object.isRequired,
  fullJobInfo: PropTypes.array.isRequired
};

export default injectIntl(JobPageContainer);
