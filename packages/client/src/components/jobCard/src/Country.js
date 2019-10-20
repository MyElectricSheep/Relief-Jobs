import React from "react";
import PropTypes from "prop-types";

// Icons & flags imports
import ReactCountryFlag from "react-country-flag";

// Material UI imports
import { Typography, Grid, Tooltip } from "@material-ui/core";

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

  if (countryInfo)
    return (
      <Grid
        container
        direction="row"
        justify={justify}
        alignItems="center"
        zeroMinWidth
        style={{ flexFlow: "nowrap" }}
      >
        {keyFactsBox ? <FaGlobe /> : null}
        {keyFactsBox ? (
          <Typography variant="overline" style={{ marginLeft: "0.3em", marginRight: "0.5em" }}>
            <FormattedMessage id="component.job.country" />:
          </Typography>
        ) : null}
        <ReactCountryFlag code={getCountryCode()} svg />
        <Tooltip
          title={locale === "en" ? `Country: ${getCountryName()}` : `Pays: ${getCountryName()}`}
          aria-label="country"
          enterDelay={keyFactsBox ? 999999999 : 0}
          placement="bottom"
        >
          <Typography
            variant="body1"
            color="textPrimary"
            component="span"
            style={{
              paddingLeft: "0.5em",
              cursor: "pointer",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden"
            }}
          >
            {getCountryName()}
          </Typography>
        </Tooltip>
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
