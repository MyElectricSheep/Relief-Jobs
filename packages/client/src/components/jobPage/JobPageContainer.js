import React from "react";
import parse, { domToReact } from "html-react-parser"; // https://github.com/remarkablemark/html-react-parser
import PropTypes from "prop-types";

// Material UI imports
import { Paper, Typography, makeStyles, Grid } from "@material-ui/core";

// i18n imports
import { injectIntl, intlShape, FormattedMessage } from "react-intl";

// Custom components imports
import JobSubtitle from "../jobCard/src/JobSubtitle";
import SectionHeader from "./src/SectionHeader";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    padding: theme.spacing(2, 2)
  }
}));

const JobPageContainer = props => {
  const { jobInfo, fullJobInfo, intl } = props;
  const { formatMessage } = intl;
  const classes = useStyles();

  const options = {
    replace: ({ attribs, children }) => {
      if (!attribs) return;

      if (attribs.href && attribs.href.includes("http")) {
        return (
          <a
            href={attribs.href}
            style={{ color: "orange", fontWeight: 500 }}
            target="_blank"
            rel="noopener noreferrer"
          >
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
          <Typography variant="h5" component="h4" style={{ fontWeight: 500 }} align="center">
            {job.title}
          </Typography>
        ) : null}
        {jobInfo ? (
          <Grid container>
            <Grid item xs={12}>
              <JobSubtitle jobInfo={jobInfo} alignCenter />{" "}
            </Grid>
          </Grid>
        ) : null}

        {/* JOB DESCRIPTION SECTION */}
        {job.body_html ? (
          <SectionHeader primaryText={formatMessage({ id: "component.job.description" })} divider />
        ) : null}
        <>{parse(`${job.body_html}`, options)}</>

        {/* HOW TO APPLY SECTION */}
        {job.how_to_apply_html ? (
          <SectionHeader primaryText={formatMessage({ id: "component.job.howToApply" })} divider />
        ) : null}
        <>{parse(`${job.how_to_apply_html}`, options)}</>
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
