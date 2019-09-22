import React from "react";
import PropTypes from "prop-types";

// Icons imports
import { FaMapMarkerAlt } from "react-icons/fa";

// Material UI imports
import { Typography, Grid } from "@material-ui/core";

// i18n imports
import { FormattedMessage } from "react-intl";

const City = props => {
  const { cityInfo, justify, keyFactsBox } = props;

  const formatCityInfo = () => {
    if (cityInfo) {
      const cityName = cityInfo
        .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
        .replace(/\s{2,}/g, " ")
        .split(" ");
      if (cityName.length !== 0) {
        const city = cityName[0].toLowerCase();
        const result = cityInfo.charAt(0).toUpperCase() + city.substring(1);
        if (result.length > 15) return `${result.slice(0, 14)}...`;
        return result;
      }
    } else return null;
  };
  if (cityInfo)
    return (
      <Grid container direction="row" justify={justify} alignItems="center">
        {<FaMapMarkerAlt />}
        {keyFactsBox ? (
          <Typography variant="overline" style={{ marginLeft: "0.3em", marginRight: "0.2em" }}>
            <FormattedMessage id="component.job.city" />:
          </Typography>
        ) : null}
        <Typography
          variant="body1"
          color="textPrimary"
          component="span"
          style={{ paddingLeft: "0.2em", cursor: "pointer" }}
        >
          {formatCityInfo()}
        </Typography>
      </Grid>
    );
  else return null;
};

City.propTypes = {
  cityInfo: PropTypes.string.isRequired,
  justify: PropTypes.string.isRequired,
  keyFactsBox: PropTypes.bool
};

City.defaultProps = {
  keyFactsBox: false
};

export default City;
