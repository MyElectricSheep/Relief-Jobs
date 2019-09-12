import React, { useState } from "react";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import Markdown from "react-markdown";

import { FaRegClock } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { fr, enGB } from "date-fns/locale";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Grid,
  Tooltip,
  useMediaQuery
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useTheme } from "@material-ui/core/styles";

// Custom components imports
import Country from "./src/Country";
import City from "./src/City";
import JobType from "./src/JobType";
import EndDate from "./src/EndDate";
import CareerType from "./src/CareerType";
import ThemeType from "./src/themeType";
import ExperienceType from "./src/ExperienceType";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 945,
    width: 945,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 600,
      width: 600
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: 300,
      width: 300
    },
    marginBottom: "1em"
  },
  media: {
    height: 0,
    paddingTop: "5.25%"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: orange[500]
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: "1.3em",
    fontWeight: 500,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2em",
      textAlign: "center",
      paddingBottom: "0.3em"
    }
  },
  subheader: {
    color: "grey",
    fontSize: "0.9em",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center"
    }
  },
  clockIcon: {
    paddingTop: "0.2em",
    fontSize: "0.9em"
  },
  sourceLink: {
    color: "grey",
    textDecoration: "underline dotted grey",
    "&:hover": {
      color: "black",
      textDecoration: "underline dotted black"
    }
  },
  root: {
    paddingTop: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 0,
    "&:last-child": {
      paddingBottom: 10
    }
  },
  logo: {
    width: "50px",
    height: "50px",
    borderRadius: "50%"
  }
}));

const JobCardContainer = props => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallCard = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [expanded, setExpanded] = useState(false);
  const { jobInfo, intl } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getTitle = () => {
    if (jobInfo.title) {
      return jobInfo.title
        .toLowerCase()
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    } else return null;
  };

  const getDate = () => {
    let timeAgo;
    if (jobInfo.original_posting_date) {
      timeAgo = formatDistanceToNow(new Date(jobInfo.original_posting_date), {
        locale: intl.locale === "en" ? enGB : fr
      });
      return timeAgo;
    } else return null;
  };

  const getCardContent = () => {
    const htmlTagRegex = /<[^>]*>/g;
    if (jobInfo.body) {
      if (jobInfo.body.split(" ").length < 120) {
        return jobInfo.body;
      } else
        return jobInfo.body
          .replace(htmlTagRegex, "")
          .split(" ")
          .splice(0, 120)
          .join(" ");
    } else return null;
  };

  const getSource = () => {
    if (jobInfo.body) {
      if (jobInfo.origin_source === "reliefWeb") return "ReliefWeb";
      if (jobInfo.origin_source === "coordinationSud") return "Coordination Sud";
    } else return "ReliefJobs";
  };

  const getSourceLink = () => {
    if (jobInfo.source) {
      return jobInfo.source;
    } else return "#";
  };

  const getOrgName = type => {
    if (jobInfo.org_shortname && type === "small") return jobInfo.org_shortname;
    if (jobInfo.org_name) return jobInfo.org_name;
    else return null;
  };

  const getCardContentDirection = () => {
    if (isMobile) return "column";
    else return "row";
  };

  const getOrgLogo = () => {
    console.log(jobInfo);
    return !jobInfo.org_logo ? (
      <Avatar aria-label="job" className={classes.avatar}>
        RJ
      </Avatar>
    ) : (
      <img src={jobInfo.org_logo.url} className={classes.logo} />
    );
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={isMobile ? null : getOrgLogo()}
        action={
          <>
            {jobInfo.theme_type && !isMobile
              ? jobInfo.theme_type.themeTypes.map(theme => {
                  return (
                    <ThemeType
                      key={theme.name}
                      theme={theme}
                      locale={intl.locale}
                      width="20px"
                      height="20px"
                      color={orange[500]}
                    />
                  );
                })
              : null}
          </>
        }
        title={getTitle()}
        subheader={
          intl.locale === "en" ? (
            <>
              <FaRegClock className={classes.clockIcon} />{" "}
              <FormattedMessage id="components.card.posted" /> {getDate()}{" "}
              <FormattedMessage id="components.card.ago" />{" "}
              <FormattedMessage id="components.card.on" />{" "}
              <a
                href={getSourceLink()}
                className={classes.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getSource()}
              </a>{" "}
              <FormattedMessage id="components.card.by" />{" "}
              <Tooltip
                title={getOrgName() || ""}
                aria-label="organization full name"
                placement="right"
              >
                <Typography
                  variant="body1"
                  component="span"
                  style={{
                    fontSize: "1em",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  {getOrgName("small")}
                </Typography>
              </Tooltip>
            </>
          ) : (
            <>
              <FaRegClock className={classes.clockIcon} />{" "}
              <FormattedMessage id="components.card.posted" /> {getDate()}{" "}
              <FormattedMessage id="components.card.on" />{" "}
              <a
                href={getSourceLink()}
                className={classes.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getSource()}
              </a>{" "}
              <FormattedMessage id="components.card.by" />{" "}
              <Tooltip
                title={getOrgName() || ""}
                aria-label="organization full name"
                placement="right"
              >
                <Typography
                  variant="body1"
                  component="span"
                  style={{
                    fontSize: "1em",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  {getOrgName("small")}
                </Typography>
              </Tooltip>
            </>
          )
        }
        classes={{
          title: classes.title,
          subheader: classes.subheader
        }}
      />
      {/* <CardMedia className={classes.media} image="/static/images/cards/lorem.jpg" title="Lorem" /> */}
      <CardContent style={isMobile ? { padding: 0 } : { padding: 0, paddingLeft: "1.65em" }}>
        <Grid
          container
          direction={getCardContentDirection()}
          justify="flex-start"
          alignItems="center"
        >
          {jobInfo.country && (
            <Grid item xs={12} sm={4} md={2}>
              <Country countryInfo={jobInfo.country} locale={intl.locale} justify="flex-start" />
            </Grid>
          )}
          {jobInfo.city && (
            <Grid item xs={12} sm={4} md={2}>
              <City cityInfo={jobInfo.city} justify="flex-start" />
            </Grid>
          )}
          {jobInfo.job_type && (
            <Grid item xs={12} sm={4} md={2}>
              <JobType jobTypeInfo={jobInfo.job_type} locale={intl.locale} justify="flex-start" />
            </Grid>
          )}
          {jobInfo.closing_date && (
            <Grid item xs={12} sm={4} md={2}>
              <EndDate
                endDateInfo={jobInfo.closing_date}
                locale={intl.locale}
                justify="flex-start"
              />
            </Grid>
          )}
          {jobInfo.career_type &&
            jobInfo.career_type.careerTypes &&
            jobInfo.career_type.careerTypes.length !== 0 && (
              <Grid item xs={12} sm={4} md={2}>
                <CareerType
                  careerTypeInfo={jobInfo.career_type.careerTypes}
                  locale={intl.locale}
                  justify="flex-start"
                />
              </Grid>
            )}
          {jobInfo.experience_type && (
            <Grid item xs={12} sm={4} md={2}>
              <ExperienceType
                experienceTypeInfo={jobInfo.experience_type}
                locale={intl.locale}
                justify="flex-start"
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.root}>
          <Markdown source={`${getCardContent()}...`} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

JobCardContainer.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(JobCardContainer);
