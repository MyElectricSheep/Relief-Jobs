import React from "react";
import PropTypes from "prop-types";

// Import date functions
import { format } from "date-fns";
import { fr, enGB } from "date-fns/locale";

// Icons imports
import { FaRegCalendarAlt } from "react-icons/fa";

// Material UI imports
import { Typography } from "@material-ui/core";

const EndDate = props => {
  const { endDateInfo, locale } = props;

  return (
    <>
      {endDateInfo && (
        <>
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
        </>
      )}
    </>
  );
};

EndDate.propTypes = {
  endDateInfo: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired
};

export default EndDate;
