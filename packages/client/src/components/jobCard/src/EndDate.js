import React from "react";
import PropTypes from "prop-types";

// Import date functions
import { format } from "date-fns";
import { fr, enGB } from "date-fns/locale";

// Icons imports
import { FaRegCalendarAlt } from "react-icons/fa";

// Material UI imports
import { Typography, Grid } from "@material-ui/core";

const EndDate = props => {
  const { endDateInfo, locale, justify } = props;

  if (endDateInfo)
    return (
      <Grid container direction="row" justify={justify} alignItems="center">
        <FaRegCalendarAlt />
        <Typography
          variant="body1"
          color="textPrimary"
          component="span"
          style={{ paddingLeft: "0.4em" }}
        >
          {format(new Date(endDateInfo), locale === "en" ? "MM/dd/yyyy" : "dd/MM/yyyy", {
            locale: locale === "en" ? enGB : fr
          })}
        </Typography>
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
