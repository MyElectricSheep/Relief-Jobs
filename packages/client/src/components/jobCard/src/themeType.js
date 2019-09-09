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

import { IconButton, Tooltip } from "@material-ui/core";

// Conversion imports
import { themeTypes } from "../../../i18n/typesConversion";

const ThemeType = props => {
  const { theme, locale, width, height } = props;

  const getThemeInfo = theme => {
    if (locale === "en") {
      return theme.name;
    } else return theme.coordinationSudName;
  };

  const getJobThemeIcon = (theme, width, height) => {
    switch (theme.id) {
      case 4595:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <HealthIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 12033:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <MineIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 4602:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <SafetySecurityIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 4601:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <ReconstructionIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 4599:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <PeacekeepingIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 4598:
        return (
          <>
            <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
              <IconButton aria-label={theme.name}>
                <Logistics1Icon width={width} height={height} />
              </IconButton>
            </Tooltip>
            <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
              <IconButton aria-label={theme.name}>
                <Logistics2Icon width={width} height={height} />
              </IconButton>
            </Tooltip>
          </>
        );
      case 4604:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <WashIcon1 width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 4597:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <FinancingIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 4596:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <HivAidsHealthIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 4594:
        const flipACoin = () => {
          return Math.floor(Math.random() * Math.floor(10));
        };
        return (
          <>
            <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
              <IconButton aria-label={theme.name}>
                {flipACoin() > 5 ? (
                  <GenderFemaleIcon width={width} height={height} />
                ) : (
                  <GenderMaleIcon width={width} height={height} />
                )}
              </IconButton>
            </Tooltip>
          </>
        );
      case 4593:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <NutritionIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 4592:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <EducationIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 4591:
        return (
          <>
            <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
              <IconButton aria-label={theme.name}>
                <CrisisManagement2IconSvg width={width} height={height} />
              </IconButton>
            </Tooltip>
          </>
        );
      case 4590:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <CoordinationIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 4589:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <ContributionsReportingIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 4588:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <ClimateEnvironmentIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 4587:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <AgricultureIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 9991:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <MigrationIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 9992:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <EconomicDevIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      case 4603:
        return (
          <>
            <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
              <IconButton aria-label={theme.name}>
                <ShelterIcon width={width} height={height} />
              </IconButton>
            </Tooltip>
            <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
              <IconButton aria-label={theme.name}>
                <NfiIcon width={width} height={height} />
              </IconButton>
            </Tooltip>
          </>
        );
      case 4600:
        return (
          <Tooltip title={getThemeInfo(theme)} aria-label={getThemeInfo(theme)} placement="top">
            <IconButton aria-label={theme.name}>
              <ProtectionIcon width={width} height={height} />
            </IconButton>
          </Tooltip>
        );
      default:
        return null;
    }
  };

  if (theme) return <>{getJobThemeIcon(theme, width, height)}</>;
  else return null;
};

ThemeType.propTypes = {
  theme: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired
};

export default ThemeType;
