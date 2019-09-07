import React from "react";
import PropTypes from "prop-types";

// Icons imports
import {
  AdvocacyIcon,
  AgricultureIcon,
  ClimateEnvironmentIcon,
  ContributionsReportingIcon,
  CoordinationIcon,
  CrisisManagement1Icon,
  CrisisManagement2IconSvg,
  DonorGrantsIcon,
  EconomicDevIcon,
  EducationIcon,
  FinancingIcon,
  GenderFemaleIcon,
  GenderMaleIcon,
  HealthIcon,
  HivAidsHealthIcon,
  HrIcon,
  IctIcon,
  InformationManagementIcon,
  Logistics1Icon,
  Logistics2Icon,
  MigrationIcon,
  MineIcon,
  MonitoringEvaluationIcon,
  NfiIcon,
  NutritionIcon,
  PeacekeepingIcon,
  ProjectManagement1Icon,
  ProjectManagement2Icon,
  ProtectionIcon,
  ReconstructionIcon,
  SafetySecurityIcon,
  ShelterIcon,
  TrainingIcon,
  WashIcon1,
  WashIcon2
} from "../../../pics/icons";

// Conversion imports
import { themeTypes } from "../../../i18n/typesConversion";

const ThemeType = props => {
  const { theme, locale } = props;

  if (theme)
    return (
      <>
        <AdvocacyIcon width="20px" height="20px" />
      </>
    );
  else return null;
};

ThemeType.propTypes = {
  theme: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
};

export default ThemeType;
