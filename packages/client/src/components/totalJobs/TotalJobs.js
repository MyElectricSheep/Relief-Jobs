import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { Typography, Grid } from "@material-ui/core";

// i18n imports
import { FormattedMessage } from "react-intl";

// Custom components imports
import FiltersResetButton from "./src/FiltersResetButton";

// Checks if any of the filters is active (returns true or false)
const checkFilters = filters => {
  if (filters.location.country.length !== 0 || filters.location.region.length !== 0) return true;
  const spreadFilters = Object.values(filters);
  const result = [];
  for (const filter of spreadFilters) {
    result.push(Object.values(filter));
  }
  return result.reduce((acc, val) => acc.concat(val), []).includes(true);
};

const TotalJobs = ({ totalJobs, filters, setFilters, noJobs, setSearchInput, setResetOrder }) => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {!noJobs && (
        <Typography
          variant="h2"
          color="textPrimary"
          component="h1"
          style={
            checkFilters(filters)
              ? { paddingRight: "0.5em", lineHeight: 1.25 }
              : { lineHeight: 1.25 }
          }
          align="center"
        >
          {totalJobs > 1 ? (
            <>
              {totalJobs} <FormattedMessage id="component.totalJobs.numberOfJobs" />
            </>
          ) : (
            <>
              {totalJobs} <FormattedMessage id="component.totalJobs.numberOfJobsAlt" />
            </>
          )}
        </Typography>
      )}
      {noJobs && (
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography
            variant="h2"
            color="textPrimary"
            component="h1"
            style={{ paddingBottom: "0.4em", lineHeight: 1.25 }}
            align="center"
          >
            <FormattedMessage id="component.totalJobs.noJobPart1" />
          </Typography>
          <Typography
            variant="h2"
            color="textPrimary"
            component="h1"
            style={{ paddingBottom: "0.8em", lineHeight: 1.25 }}
            align="center"
          >
            <FormattedMessage id="component.totalJobs.noJobPart2" />
          </Typography>
        </Grid>
      )}
      {checkFilters(filters) || noJobs ? (
        <FiltersResetButton
          setFilters={setFilters}
          filters={filters}
          setSearchInput={setSearchInput}
          setResetOrder={setResetOrder}
        />
      ) : null}
    </Grid>
  );
};

TotalJobs.propTypes = {
  totalJobs: PropTypes.number.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  noJobs: PropTypes.bool.isRequired,
  setSearchInput: PropTypes.func.isRequired,
  setResetOrder: PropTypes.func.isRequired
};

export default TotalJobs;
