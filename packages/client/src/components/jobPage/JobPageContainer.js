import React from "react";
import parse, { domToReact } from "html-react-parser"; // https://github.com/remarkablemark/html-react-parser
import PropTypes from "prop-types";

// Material UI imports
import { Paper, Typography, makeStyles } from "@material-ui/core";

// i18n imports
import { injectIntl, intlShape, FormattedMessage } from "react-intl";

// Custom components imports
import JobSubtitle from "../jobCard/src/JobSubtitle";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    padding: theme.spacing(2, 2)
  }
}));

const JobPageContainer = props => {
  const { jobInfo, fullJobInfo } = props;
  const classes = useStyles();

  const options = {
    replace: ({ attribs, children }) => {
      if (!attribs) return;

      if (attribs.href && attribs.href.includes("http")) {
        return (
          <a href={attribs.href} style={{ color: "orange", fontWeight: 500 }}>
            {domToReact(children)}
          </a>
        );
      }
    }
  };

  if (fullJobInfo) {
    const job = fullJobInfo[0];
    return (
      <Paper className={classes.root}>
        {job.title ? (
          <Typography variant="h5" component="h4" style={{ fontWeight: 500 }}>
            {job.title}
          </Typography>
        ) : null}
        {jobInfo ? <JobSubtitle jobInfo={jobInfo} /> : null}
        <>{parse(`${job.body_html}`, options)}</>
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
