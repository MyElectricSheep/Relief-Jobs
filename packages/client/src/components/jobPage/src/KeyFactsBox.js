import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { Typography, makeStyles, Grid } from "@material-ui/core";

// i18n imports
import { injectIntl, intlShape, FormattedMessage } from "react-intl";

// Custom components imports
import Country from "../../jobCard/src/Country";
import City from "../../jobCard/src/City";
import JobType from "../../jobCard/src/JobType";
import EndDate from "../../jobCard/src/EndDate";

const useStyles = makeStyles(theme => ({
  xyz: {
    height: "100%"
  }
}));

const KeyFactsBox = props => {
  const { intl, job } = props;
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      style={{ paddingLeft: "1.1em" }}
    >
      {job.country && (
        <Grid item xs={12}>
          <Country
            countryInfo={job.country}
            locale={intl.locale}
            justify="flex-start"
            keyFactsBox
          />
        </Grid>
      )}
      {job.city && (
        <Grid item xs={12}>
          <City cityInfo={job.city} justify="flex-start" keyFactsBox />
        </Grid>
      )}
      {job.job_type && (
        <Grid item xs={12}>
          <JobType
            jobTypeInfo={job.job_type}
            locale={intl.locale}
            justify="flex-start"
            keyFactsBox
          />
        </Grid>
      )}
      {job.closing_date && (
        <Grid item xs={12}>
          <EndDate
            endDateInfo={job.closing_date}
            locale={intl.locale}
            justify="flex-start"
            keyFactsBox
          />
        </Grid>
      )}
    </Grid>
  );
};

KeyFactsBox.propTypes = {
  intl: intlShape.isRequired,
  job: PropTypes.object.isRequired
};

export default injectIntl(KeyFactsBox);
