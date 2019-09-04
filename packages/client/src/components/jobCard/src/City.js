import React from "react";
import PropTypes from "prop-types";

// Icons imports
import { FaMapMarkerAlt } from "react-icons/fa";

// Material UI imports
import { Typography } from "@material-ui/core";

const City = props => {
  const { cityInfo } = props;

  const formatCityInfo = () => {
    if (cityInfo) {
      const cityName = cityInfo
        .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
        .replace(/\s{2,}/g, " ")
        .split(" ");
      if (cityName.length !== 0) {
        const city = cityName[0].toLowerCase();
        const result = cityInfo.charAt(0).toUpperCase() + city.substring(1);
        return result;
      }
    } else return null;
  };

  return (
    <>
      {cityInfo && (
        <>
          <FaMapMarkerAlt />
          <Typography
            variant="body1"
            color="textPrimary"
            component="span"
            style={{ paddingLeft: "0.2em" }}
          >
            {formatCityInfo()}
          </Typography>
        </>
      )}
    </>
  );
};

City.propTypes = {
  cityInfo: PropTypes.string.isRequired
};

export default City;
