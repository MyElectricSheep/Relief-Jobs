import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// i18n imports
import { injectIntl, intlShape } from "react-intl";

// React component to support markdown display
import Markdown from "react-markdown";

// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
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
import clsx from "clsx"; // mix classes
import { orange } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShareIcon from "@material-ui/icons/Share";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useTheme } from "@material-ui/core/styles";

// Custom components imports
import Country from "./src/Country";
import JobSubtitle from "./src/JobSubtitle";
import City from "./src/City";
import JobType from "./src/JobType";
import EndDate from "./src/EndDate";
import CareerType from "./src/CareerType";
import ThemeType from "./src/themeType";
import ExperienceType from "./src/ExperienceType";

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: "10px",
    width: "100%"
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
    lineHeight: 1.25,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2em",
      textAlign: "center",
      paddingBottom: "0.3em"
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
    height: "50px"
  },
  bottomIconStar: {
    fontSize: "1.15em",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.05em"
    }
  },
  bottomIconShare: {
    fontSize: "0.9em",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8em"
    }
  }
}));

const JobCardContainer = props => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [expanded, setExpanded] = useState(false);
  const [raised, setRaised] = useState(false);
  const { jobInfo, intl, setSelectedJob, selectedJob, selectedJobId } = props;

  const handleExpandClick = e => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const getTitle = () => {
    if (jobInfo.title) {
      const title = jobInfo.title
        .toLowerCase()
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
      return <span>{title}</span>;
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

  const getCardContentDirection = () => {
    if (isMobile) return "column";
    else return "row";
  };

  const getCardJustification = () => {
    if (selectedJob) return "flex-start";
    else if (
      jobInfo.country &&
      jobInfo.city &&
      jobInfo.job_type &&
      jobInfo.closing_date &&
      jobInfo.career_type &&
      jobInfo.career_type.careerTypes &&
      jobInfo.career_type.careerTypes.length !== 0 &&
      jobInfo.experience_type
    ) {
      return "center";
    } else return "flex-start";
  };

  const getOrgLogo = () => {
    return !jobInfo.org_logo ? (
      <Avatar aria-label="job" className={classes.avatar}>
        RJ
      </Avatar>
    ) : (
      <img src={jobInfo.org_logo.url} className={classes.logo} />
    );
  };

  useEffect(() => {
    if (jobInfo.id === selectedJobId) {
      setRaised(true);
    } else setRaised(false);
  }, [selectedJobId]);

  return (
    <div style={{ paddingBottom: "1.1em" }}>
      <Card
        className={classes.card}
        raised={raised}
        onMouseEnter={() => setRaised(true)}
        onMouseLeave={jobInfo.id === selectedJobId ? () => {} : () => setRaised(false)}
        onTouchStart={() => setRaised(true)}
        onTouchEnd={jobInfo.id === selectedJobId ? () => {} : () => setRaised(false)}
        onClick={() => setSelectedJob(jobInfo)}
        style={
          jobInfo.id === selectedJobId
            ? { cursor: "pointer", backgroundColor: "rgba(245, 124, 0, 0.05)" }
            : // rgb(245, 124, 0) === #f57c00 (theme.palette.reliefJobsOrange)
              { cursor: "pointer" }
        }
      >
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
          subheader={<JobSubtitle jobInfo={jobInfo} />}
          classes={{
            title: classes.title
          }}
        />
        {/* <CardMedia className={classes.media} image="/static/images/cards/lorem.jpg" title="Lorem" /> */}
        <CardContent style={isMobile ? { padding: 0 } : { padding: 0, paddingLeft: "1.65em" }}>
          <Grid
            container
            direction={getCardContentDirection()}
            justify={getCardJustification()}
            alignItems="center"
          >
            {jobInfo.country && (
              <Grid
                item
                xs={12}
                sm={selectedJob ? 4 : 4}
                md={selectedJob ? 4 : 4}
                lg={selectedJob ? 4 : 2}
              >
                <Country
                  countryInfo={jobInfo.country}
                  locale={intl.locale}
                  justify={selectedJob ? "flex-start" : "center"}
                />
              </Grid>
            )}
            {jobInfo.city && (
              <Grid
                item
                xs={12}
                sm={selectedJob ? 4 : 4}
                md={selectedJob ? 4 : 4}
                lg={selectedJob ? 4 : 2}
              >
                <City
                  cityInfo={jobInfo.city}
                  locale={intl.locale}
                  justify={selectedJob ? "flex-start" : "center"}
                />
              </Grid>
            )}
            {jobInfo.job_type && (
              <Grid
                item
                xs={12}
                sm={selectedJob ? 4 : 4}
                md={selectedJob ? 4 : 4}
                lg={selectedJob ? 4 : 2}
              >
                <JobType
                  jobTypeInfo={jobInfo.job_type}
                  locale={intl.locale}
                  justify={selectedJob ? "flex-start" : "center"}
                  selectedJob={selectedJob ? true : false}
                />
              </Grid>
            )}
            {jobInfo.closing_date && (
              <Grid
                item
                xs={12}
                sm={selectedJob ? 4 : 4}
                md={selectedJob ? 4 : 4}
                lg={selectedJob ? 4 : 2}
              >
                <EndDate
                  endDateInfo={jobInfo.closing_date}
                  locale={intl.locale}
                  justify={selectedJob ? "flex-start" : "center"}
                />
              </Grid>
            )}
            {jobInfo.career_type &&
              jobInfo.career_type.careerTypes &&
              jobInfo.career_type.careerTypes.length !== 0 && (
                <Grid
                  item
                  xs={12}
                  sm={selectedJob ? 4 : 4}
                  md={selectedJob ? 4 : 4}
                  lg={selectedJob ? 4 : 2}
                >
                  <CareerType
                    careerTypeInfo={jobInfo.career_type.careerTypes}
                    locale={intl.locale}
                    justify={selectedJob ? "flex-start" : "center"}
                  />
                </Grid>
              )}
            {jobInfo.experience_type && (
              <Grid
                item
                xs={12}
                sm={selectedJob ? 4 : 4}
                md={selectedJob ? 4 : 4}
                lg={selectedJob ? 4 : 2}
              >
                <ExperienceType
                  experienceTypeInfo={jobInfo.experience_type}
                  locale={intl.locale}
                  justify={selectedJob ? "flex-start" : "center"}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <StarBorderIcon className={classes.bottomIconStar} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon className={classes.bottomIconShare} />
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
    </div>
  );
};

JobCardContainer.propTypes = {
  intl: intlShape.isRequired,
  setSelectedJob: PropTypes.func.isRequired,
  selectedJob: PropTypes.bool,
  selectedJobId: PropTypes.string
};

JobCardContainer.defaultProps = {
  selectedJob: false,
  selectedJobId: ""
};

export default injectIntl(JobCardContainer);
