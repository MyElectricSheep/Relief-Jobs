import React from "react";
import PropTypes from "prop-types";

// Icons imports
import { FaWrench } from "react-icons/fa";

// Material UI imports
import { Typography } from "@material-ui/core";

// Conversion imports
import { jobTypes } from "../../../i18n/typesConversion";

const CareerType = props => {
  const { careerTypeInfo, locale } = props;

  //   const convertJobType = typeToConvert => {
  //     if (typeToConvert) {
  //       const targetType = jobTypes.filter(validType => validType.reliefJobsName === typeToConvert);
  //       return targetType && targetType.length !== 0 && locale === "en"
  //         ? targetType[0].enName
  //         : targetType[0].frName;
  //     } else return null;
  //   };

  return (
    <>
      {careerTypeInfo && (
        <>
          <FaWrench />
          <Typography
            variant="body1"
            color="textPrimary"
            component="span"
            style={{ paddingLeft: "0.4em" }}
          >
            {careerTypeInfo[0].name}
          </Typography>
        </>
      )}
    </>
  );
};

CareerType.propTypes = {
  careerTypeInfo: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
};

export default CareerType;
