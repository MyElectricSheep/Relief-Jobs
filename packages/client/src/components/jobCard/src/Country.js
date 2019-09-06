import React from "react";
import PropTypes from "prop-types";

// Icons & flags imports
import ReactCountryFlag from "react-country-flag";

// Material UI imports
import { Typography } from "@material-ui/core";

const Country = props => {
  const { countryInfo, locale } = props;

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

  return (
    <>
      {countryInfo && (
        <>
          <ReactCountryFlag
            code={getCountryCode()}
            styleProps={{
              marginBottom: "0.3em"
            }}
            svg
          />
          <Typography
            variant="body1"
            color="textPrimary"
            component="span"
            style={{ paddingLeft: "0.5em" }}
          >
            {shortenCountryName(getCountryName())}
          </Typography>
        </>
      )}
    </>
  );
};

Country.propTypes = {
  countryInfo: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
};

export default Country;
