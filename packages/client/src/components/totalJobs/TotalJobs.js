import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { Typography } from "@material-ui/core";

// i18n imports
import { FormattedMessage } from "react-intl";

const TotalJobs = ({ totalJobs }) => {
  return (
    <Typography variant="h2" color="textPrimary" component="h1">
      {totalJobs} <FormattedMessage id="component.totalJobs.numberOfJobs" />
    </Typography>
  );
};

TotalJobs.propTypes = {
  totalJobs: PropTypes.number.isRequired
};

export default TotalJobs;
