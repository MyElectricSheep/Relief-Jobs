import React from "react";
import PropTypes from "prop-types";

// Icons imports
import { FaRegEye } from "react-icons/fa";

// Material UI imports
import { Typography, Grid } from "@material-ui/core";

// Conversion imports
import { careerTypes } from "../../../i18n/typesConversion";

const CareerType = props => {
  const { careerTypeInfo, locale, justify } = props;

  const convertCareerType = typeToConvert => {
    if (typeToConvert) {
      const targetType = careerTypes.filter(validType => validType.name === typeToConvert);
      return targetType && targetType.length !== 0 && locale === "en"
        ? targetType[0].name
        : targetType[0].coordinationSudName;
    } else return null;
  };

  const shortenCareerTypes = type => {
    if (type === "Information and Communications Technology") return "ICT";
    if (type === "Program/Project Management") return "Projects";
    if (type === "Monitoring and Evaluation") return "M&E";
    if (type === "Suivi et évaluation") return "Suivi/Eval";
    if (type === "Donor Relations/Grants Management") return "Donors/Grants";
    if (type === "Gestion de projets/programmes") return "Projets";
    if (type === "Direction et administration" || type === "Admin/Fin") return "Admin/Fin";
    if (type === "Logistics/Procurement") return "Logistics";
    if (type === "Services et Logistique") return "Logistique";
    if (type === "Information Management" || type === "Gestion de l'information")
      return "Information";
    if (type === "Technologie de l'information et de la communication") return "TIC";
    if (type === "Gestion des subventions & bailleurs") return "Subventions";
    if (type === "Advocacy/Communications") return "Communications";
    if (type === "Plaidoyer / Communication") return "Communication";
    if (type === "Human Resources") return "HR";
    if (type === "RH et Finances") return "RH / Direction";
    else return type;
  };

  if (careerTypeInfo)
    return (
      <Grid container direction="row" justify={justify} alignItems="center">
        <FaRegEye />
        <Typography
          variant="body1"
          color="textPrimary"
          component="span"
          style={{ paddingLeft: "0.4em" }}
        >
          {shortenCareerTypes(convertCareerType(careerTypeInfo[0].name))}
        </Typography>
      </Grid>
    );
  else return null;
};

CareerType.propTypes = {
  careerTypeInfo: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  justify: PropTypes.string.isRequired
};

export default CareerType;
