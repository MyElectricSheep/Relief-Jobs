import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { Typography, makeStyles, Grid, Divider } from "@material-ui/core";

// i18n imports
import { injectIntl, intlShape, FormattedMessage } from "react-intl";

// Custom components imports
import Country from "../../jobCard/src/Country";
import City from "../../jobCard/src/City";
import JobType from "../../jobCard/src/JobType";
import EndDate from "../../jobCard/src/EndDate";
import CareerType from "../../jobCard/src/CareerType";
import ExperienceType from "../../jobCard/src/ExperienceType";

const useStyles = makeStyles(theme => ({
  logo: {
    width: "50%",
    height: "auto",
    maxWidth: "100px",
    maxHeight: "100px"
  },
  title: {
    textTransform: "uppercase",
    fontSize: "0.625rem",
    fontWeight: 500,
    letterSpacing: "1px",
    color: theme.palette.reliefJobsGrey,
    marginBottom: "0.5rem"
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "none",
      color: "inherit"
    },
    "&:visited": {
      textDecoration: "none",
      color: "inherit"
    }
  }
}));

const KeyFactsBox = props => {
  const { intl, job } = props;
  const classes = useStyles();

  const getOrgName = () => {
    if (job.org_name) return job.org_name;
    if (job.org_shortname) return job.org_shortname;
    else return null;
  };

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      style={{ paddingLeft: "1.1em" }}
    >
      <Grid item xs={12}>
        <Typography variant="body1" color="textPrimary" component="span" className={classes.title}>
          <FormattedMessage id="component.keyFacts.organization" />
        </Typography>
        <Divider style={{ marginBottom: "1em" }} />
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          style={{ paddingBottom: "1em" }}
        >
          {job.org_logo ? <img src={job.org_logo.url} className={classes.logo} /> : null}
          <Typography variant="subtitle2" style={job.org_logo ? { paddingLeft: "0.5em" } : {}}>
            {job.org_homepage ? (
              <a
                href={job.org_homepage}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
              >
                {getOrgName()}
              </a>
            ) : (
              getOrgName()
            )}
          </Typography>
        </Grid>
        <Typography variant="body1" color="textPrimary" component="span" className={classes.title}>
          <FormattedMessage id="component.keyFacts.job" />
        </Typography>
        <Divider style={{ marginBottom: "1em" }} />
      </Grid>
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
      {job.career_type && job.career_type.careerTypes && job.career_type.careerTypes.length !== 0 && (
        <Grid item xs={12}>
          <CareerType
            careerTypeInfo={job.career_type.careerTypes}
            locale={intl.locale}
            justify="flex-start"
            keyFactsBox
          />
        </Grid>
      )}
      {job.experience_type && (
        <Grid item xs={12}>
          <ExperienceType
            experienceTypeInfo={job.experience_type}
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
