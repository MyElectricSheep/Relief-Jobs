import React from "react";
import PropTypes from "prop-types";

// Icons imports
import { FaMapMarkerAlt } from "react-icons/fa";

// Material UI imports
import { Typography, Grid, Tooltip } from "@material-ui/core";

// i18n imports
import { FormattedMessage } from "react-intl";

const City = props => {
  const { cityInfo, justify, keyFactsBox, locale } = props;

  const formatCityInfo = () => {
    if (cityInfo) {
      const cityName = cityInfo
        .replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "")
        .replace(/\s{2,}/g, " ")
        .split(" ");
      if (cityName.length !== 0) {
        const city = cityName.map(name => name.toLowerCase());
        const result = city.map(
          (name, index) => city[index].charAt(0).toUpperCase() + name.substring(1)
        );
        return result.join(" ");
      }
    } else return null;
  };

  if (cityInfo)
    return (
      <Grid
        container
        direction="row"
        justify={justify}
        alignItems="center"
        zeroMinWidth
        style={{ flexFlow: "nowrap" }}
      >
        {<FaMapMarkerAlt />}
        {keyFactsBox ? (
          <Typography variant="overline" style={{ marginLeft: "0.3em", marginRight: "0.2em" }}>
            <FormattedMessage id="component.job.city" />:
          </Typography>
        ) : null}
        <Tooltip
          title={locale === "en" ? `City: ${formatCityInfo()}` : `Ville: ${formatCityInfo()}`}
          aria-label="country"
          enterDelay={keyFactsBox ? 999999999 : 0}
          placement="bottom"
        >
          <Typography
            variant="body1"
            color="textPrimary"
            component="span"
            style={{
              paddingLeft: "0.2em",
              cursor: "pointer",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden"
            }}
          >
            {formatCityInfo()}
          </Typography>
        </Tooltip>
      </Grid>
    );
  else return null;
};

City.propTypes = {
  cityInfo: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  justify: PropTypes.string.isRequired,
  keyFactsBox: PropTypes.bool
};

City.defaultProps = {
  keyFactsBox: false
};

export default City;
