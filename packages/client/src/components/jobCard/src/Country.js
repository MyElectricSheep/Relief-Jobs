import React from "react";
import PropTypes from "prop-types";

// Icons & flags imports
import ReactCountryFlag from "react-country-flag";

// Material UI imports
import { Typography, Grid } from "@material-ui/core";

// i18n imports
import { FormattedMessage } from "react-intl";

// Icons imports
import { FaGlobe } from "react-icons/fa";

const Country = props => {
  const { countryInfo, locale, justify, keyFactsBox } = props;

  const getCountryCode = () => {
    if (countryInfo.en) {
      return countryInfo.en.alpha2;
    } else return "";
  };

  const getCountryName = () => {
    return locale === "en"
      ? countryInfo.shortname
        ? countryInfo.shortname
        : countryInfo.name
      : countryInfo.fr
      ? countryInfo.fr.alternateName
        ? countryInfo.fr.alternateName
        : countryInfo.fr.name
      : countryInfo.shortname;
  };

  const shortenCountryName = name => {
    if (name) {
      if (name.length > 12) {
        const result = name.slice(0, 12);
        return `${result}...`;
      }
    } else return name;
    return name;
  };

  if (countryInfo)
    return (
      <Grid container direction="row" justify={justify} alignItems="center">
        {keyFactsBox ? <FaGlobe /> : null}
        {keyFactsBox ? (
          <Typography variant="overline" style={{ marginLeft: "0.3em", marginRight: "0.5em" }}>
            <FormattedMessage id="component.job.country" />:
          </Typography>
        ) : null}
        <ReactCountryFlag code={getCountryCode()} svg />
        <Typography
          variant="body1"
          color="textPrimary"
          component="span"
          style={{ paddingLeft: "0.5em", cursor: "pointer" }}
        >
          {shortenCountryName(getCountryName())}
        </Typography>
      </Grid>
    );
  else return null;
};

Country.propTypes = {
  countryInfo: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  justify: PropTypes.string.isRequired,
  keyFactsBox: PropTypes.bool
};

Country.defaultProps = {
  keyFactsBox: false
};

export default Country;
