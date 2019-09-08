import React from "react";
import PropTypes from "prop-types";

// Import date functions
import { format } from "date-fns";
import { fr, enGB } from "date-fns/locale";

// i18n imports
import { FormattedMessage } from "react-intl";

// Icons imports
import { FaRegCalendarAlt } from "react-icons/fa";

// Material UI imports
import { Typography, Grid, Tooltip } from "@material-ui/core";

const EndDate = props => {
  const { endDateInfo, locale, justify } = props;

  if (endDateInfo)
    return (
      <Grid container direction="row" justify={justify} alignItems="center">
        <FaRegCalendarAlt />
        <Tooltip
          title={<FormattedMessage id="components.card.endDate" />}
          aria-label="job closing date"
          placement="bottom"
        >
          <Typography
            variant="body1"
            color="textPrimary"
            component="span"
            style={{ paddingLeft: "0.4em", cursor: "pointer" }}
          >
            {format(new Date(endDateInfo), locale === "en" ? "MM/dd/yyyy" : "dd/MM/yyyy", {
              locale: locale === "en" ? enGB : fr
            })}
          </Typography>
        </Tooltip>
      </Grid>
    );
  else return null;
};

EndDate.propTypes = {
  endDateInfo: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  justify: PropTypes.string.isRequired
};

export default EndDate;
