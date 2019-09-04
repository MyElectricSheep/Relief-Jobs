import React from "react";
import PropTypes from "prop-types";

// Icons imports
import { FaBriefcase } from "react-icons/fa";

// Material UI imports
import { Typography } from "@material-ui/core";

const JobType = props => {
  const { jobTypeInfo, locale } = props;

  const formatJobType = () => {
    if (jobTypeInfo) {
      const type = jobTypeInfo.toLowerCase();
      const result = jobTypeInfo.charAt(0).toUpperCase() + type.substring(1);
      return result;
    } else return null;
  };

  return (
    <>
      {jobTypeInfo && (
        <>
          <FaBriefcase />
          <Typography
            variant="body1"
            color="textPrimary"
            component="span"
            style={{ paddingLeft: "0.4em" }}
          >
            {formatJobType()}
          </Typography>
        </>
      )}
    </>
  );
};

JobType.propTypes = {
  jobTypeInfo: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired
};

export default JobType;
