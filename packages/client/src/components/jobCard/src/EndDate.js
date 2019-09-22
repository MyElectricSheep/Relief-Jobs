import React from "react";
import PropTypes from "prop-types";

// Import date functions
import { format, formatDistanceToNow } from "date-fns";
import { fr, enGB } from "date-fns/locale";

// i18n imports
import { FormattedMessage, injectIntl } from "react-intl";

// Icons imports
import { FaRegCalendarAlt } from "react-icons/fa";

// Material UI imports
import { Typography, Grid, Tooltip } from "@material-ui/core";

const EndDate = props => {
  const { endDateInfo, locale, justify, intl, keyFactsBox } = props;

  const getNumberOfDaysLeft = () => {
    const daysLeft = formatDistanceToNow(new Date(endDateInfo), {
      locale: locale === "en" ? enGB : fr
    });
    return daysLeft;
  };

  if (endDateInfo)
    return (
      <Grid container direction="row" justify={justify} alignItems="center">
        <FaRegCalendarAlt />
        {keyFactsBox ? (
          <Typography variant="overline" style={{ marginLeft: "0.3em", marginRight: "0.2em" }}>
            <FormattedMessage id="components.card.endDate" />:
          </Typography>
        ) : null}
        <Tooltip
          title={
            keyFactsBox
              ? `${intl.formatMessage({
                  id: "components.card.in",
                  defaultMessage: "in"
                })} ${getNumberOfDaysLeft()}`
              : `${intl.formatMessage({
                  id: "components.card.endDate",
                  defaultMessage: "Closing date"
                })}: ${intl.formatMessage({
                  id: "components.card.in",
                  defaultMessage: "in"
                })} ${getNumberOfDaysLeft()}`
          }
          aria-label="job closing date"
          placement={keyFactsBox ? "right" : "bottom"}
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
  justify: PropTypes.string.isRequired,
  keyFactsBox: PropTypes.bool
};

EndDate.defaultProps = {
  keyFactsBox: false
};

export default injectIntl(EndDate);
