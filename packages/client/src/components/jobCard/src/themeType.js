import React from "react";
import PropTypes from "prop-types";

// Icons imports
import {
  AgricultureIcon,
  ClimateEnvironmentIcon,
  ContributionsReportingIcon,
  CoordinationIcon,
  CrisisManagement1Icon,
  CrisisManagement2IconSvg,
  EconomicDevIcon,
  EducationIcon,
  FinancingIcon,
  GenderFemaleIcon,
  GenderMaleIcon,
  HealthIcon,
  HivAidsHealthIcon,
  Logistics1Icon,
  Logistics2Icon,
  MigrationIcon,
  MineIcon,
  NfiIcon,
  NutritionIcon,
  PeacekeepingIcon,
  ProtectionIcon,
  ReconstructionIcon,
  SafetySecurityIcon,
  ShelterIcon,
  WashIcon1,
  WashIcon2,
  HrIcon,
  IctIcon,
  InformationManagementIcon,
  DonorGrantsIcon,
  MonitoringEvaluationIcon,
  ProjectManagement1Icon,
  ProjectManagement2Icon,
  TrainingIcon,
  AdvocacyIcon
} from "../../../pics/icons";

import { IconButton } from "@material-ui/core";

// Conversion imports
import { themeTypes } from "../../../i18n/typesConversion";

const ThemeType = props => {
  const { theme, locale } = props;

  const getJobThemeIcon = (theme, width, height) => {
    switch (theme.id) {
      case 4595:
        return (
          <IconButton aria-label={theme.name}>
            <HealthIcon width={width} height={height} />
          </IconButton>
        );
      case 12033:
        return (
          <IconButton aria-label={theme.name}>
            <MineIcon width={width} height={height} />
          </IconButton>
        );
      case 4602:
        return (
          <IconButton aria-label={theme.name}>
            <SafetySecurityIcon width={width} height={height} />
          </IconButton>
        );
      case 4601:
        return (
          <IconButton aria-label={theme.name}>
            <ReconstructionIcon width={width} height={height} />
          </IconButton>
        );
      case 4599:
        return (
          <IconButton aria-label={theme.name}>
            <PeacekeepingIcon width={width} height={height} />
          </IconButton>
        );
      case 4598:
        return (
          <>
            <IconButton aria-label={theme.name}>
              <Logistics1Icon width={width} height={height} />
            </IconButton>
            <IconButton aria-label={theme.name}>
              <Logistics2Icon width={width} height={height} />
            </IconButton>
          </>
        );
      case 4604:
        return (
          <>
            <IconButton aria-label={theme.name}>
              <WashIcon1 width={width} height={height} />
            </IconButton>
            <IconButton aria-label={theme.name}>
              <WashIcon2 width={width} height={height} />
            </IconButton>
          </>
        );
      case 4597:
        return (
          <IconButton aria-label={theme.name}>
            <FinancingIcon width={width} height={height} />
          </IconButton>
        );
      case 4596:
        return (
          <IconButton aria-label={theme.name}>
            <HivAidsHealthIcon width={width} height={height} />
          </IconButton>
        );
      case 4594:
        return (
          <>
            <IconButton aria-label={theme.name}>
              <GenderFemaleIcon width={width} height={height} />
            </IconButton>
            <IconButton aria-label={theme.name}>
              <GenderMaleIcon width={width} height={height} />
            </IconButton>
          </>
        );
      case 4593:
        return (
          <IconButton aria-label={theme.name}>
            <NutritionIcon width={width} height={height} />
          </IconButton>
        );
      case 4592:
        return (
          <IconButton aria-label={theme.name}>
            <EducationIcon width={width} height={height} />
          </IconButton>
        );
      case 4591:
        return (
          <>
            <IconButton aria-label={theme.name}>
              <CrisisManagement1Icon width={width} height={height} />
            </IconButton>
            <IconButton aria-label={theme.name}>
              <CrisisManagement2IconSvg width={width} height={height} />
            </IconButton>
          </>
        );
      case 4590:
        return (
          <IconButton aria-label={theme.name}>
            <CoordinationIcon width={width} height={height} />
          </IconButton>
        );
      case 4589:
        return (
          <IconButton aria-label={theme.name}>
            <ContributionsReportingIcon width={width} height={height} />
          </IconButton>
        );
      case 4588:
        return (
          <IconButton aria-label={theme.name}>
            <ClimateEnvironmentIcon width={width} height={height} />
          </IconButton>
        );
      case 4587:
        return (
          <IconButton aria-label={theme.name}>
            <AgricultureIcon width={width} height={height} />
          </IconButton>
        );
      case 9991:
        return (
          <IconButton aria-label={theme.name}>
            <MigrationIcon width={width} height={height} />
          </IconButton>
        );
      case 9992:
        return (
          <IconButton aria-label={theme.name}>
            <EconomicDevIcon width={width} height={height} />
          </IconButton>
        );
      case 4603:
        return (
          <>
            <IconButton aria-label={theme.name}>
              <ShelterIcon width={width} height={height} />
            </IconButton>
            <IconButton aria-label={theme.name}>
              <NfiIcon width={width} height={height} />
            </IconButton>
          </>
        );
      case 4600:
        return (
          <IconButton aria-label={theme.name}>
            <ProtectionIcon width={width} height={height} />
          </IconButton>
        );
      default:
        return null;
    }
  };

  if (theme) return <>{getJobThemeIcon(theme, "20px", "20px")}</>;
  else return null;
};

ThemeType.propTypes = {
  theme: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
};

export default ThemeType;
