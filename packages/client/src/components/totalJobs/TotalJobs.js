import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { Typography } from "@material-ui/core";

// i18n imports
import { FormattedMessage } from "react-intl";

// Custom components imports
import FiltersResetButton from "./src/FiltersResetButton";

// Checks if any of the filters is active (returns true or false)
const checkFilters = filters => {
  const spreadFilters = Object.values(filters);
  const result = [];
  for (const filter of spreadFilters) {
    result.push(Object.values(filter));
  }
  return result.reduce((acc, val) => acc.concat(val), []).includes(true);
};

const TotalJobs = ({ totalJobs, filters, setFilters }) => {
  return (
    <>
      <Typography
        variant="h2"
        color="textPrimary"
        component="h1"
        style={checkFilters(filters) ? { paddingRight: "0.5em" } : {}}
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
      {checkFilters(filters) ? (
        <FiltersResetButton
          setFilters={setFilters}
          setFilterBadges={setFilterBadges}
          filters={filters}
        />
      ) : null}
    </>
  );
};

TotalJobs.propTypes = {
  totalJobs: PropTypes.number.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default TotalJobs;
