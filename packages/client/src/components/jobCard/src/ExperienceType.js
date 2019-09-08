import React from "react";
import PropTypes from "prop-types";

// i18n imports
import { FormattedMessage } from "react-intl";

// Icons imports
import { FaCog } from "react-icons/fa";

// Material UI imports
import { Typography, Grid, Tooltip } from "@material-ui/core";

const ExperienceType = props => {
  const { experienceTypeInfo, locale, justify } = props;

  if (experienceTypeInfo)
    return (
      <Grid container direction="row" justify={justify} alignItems="center">
        <FaCog />
        <Tooltip
          title={<FormattedMessage id="components.card.experience" />}
          aria-label="job closing date"
          placement="bottom"
        >
          <Typography
            variant="body1"
            color="textPrimary"
            component="span"
            style={{ paddingLeft: "0.4em", cursor: "pointer" }}
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
  justify: PropTypes.string.isRequired
};

export default ExperienceType;
