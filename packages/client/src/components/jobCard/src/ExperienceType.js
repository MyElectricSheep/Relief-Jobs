import React from "react";
import PropTypes from "prop-types";

// i18n imports
import { FormattedMessage } from "react-intl";

// Icons imports
import { FaCog } from "react-icons/fa";

// Material UI imports
import { Typography, Grid, Tooltip } from "@material-ui/core";

const ExperienceType = props => {
  const { experienceTypeInfo, locale, justify, keyFactsBox } = props;

  if (experienceTypeInfo)
    return (
      <Grid container direction="row" justify={justify} alignItems="center">
        <FaCog />
        {keyFactsBox ? (
          <Typography variant="overline" style={{ marginLeft: "0.3em", marginRight: "0.2em" }}>
            <FormattedMessage id="components.card.experience" />:
          </Typography>
        ) : null}
        <Tooltip
          title={<FormattedMessage id="components.card.experience" />}
          aria-label="job closing date"
          placement="bottom"
          enterDelay={keyFactsBox ? 999999999 : 0}
        >
          <Typography
            variant="body1"
            color="textPrimary"
            component="span"
            style={
              keyFactsBox
                ? { paddingLeft: "0.2em", cursor: "pointer" }
                : { paddingLeft: "0.4em", cursor: "pointer" }
            }
          >
            {experienceTypeInfo} <FormattedMessage id="components.card.years" />
          </Typography>
        </Tooltip>
      </Grid>
    );
  else return null;
};

ExperienceType.propTypes = {
  experienceTypeInfo: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  justify: PropTypes.string.isRequired,
  keyFactsBox: PropTypes.bool
};

export default ExperienceType;
