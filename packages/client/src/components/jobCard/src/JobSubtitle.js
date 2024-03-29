import React from "react";
import PropTypes from "prop-types";

// i18n imports
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import { fr, enGB } from "date-fns/locale";

// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Tooltip, Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

// Date functions
import { formatDistanceToNow } from "date-fns";

// Icons imports
import { FaRegClock } from "react-icons/fa";

const useStyles = makeStyles(theme => ({
  clockIcon: {
    fontSize: "0.85em",
    marginRight: "0.3em",
    color: "grey",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      fontSize: "0.75em"
    }
  },
  sourceLink: {
    color: "grey",
    textDecoration: "underline dotted grey",
    marginRight: "0.3em",
    marginBottom: "0.3em",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      fontSize: "0.8em"
    },
    "&:hover": {
      color: "black",
      textDecoration: "underline dotted black"
    }
  },
  subheader: {
    color: "grey",
    fontSize: "1em",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      fontSize: "0.8em"
    },
    marginRight: "0.3em"
  },
  organization: {
    fontSize: "1em",
    fontWeight: 600,
    cursor: "pointer",
    color: "grey",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      fontSize: "0.8em"
    }
  }
}));

const JobSubtitle = props => {
  const classes = useStyles();
  const { intl, jobInfo, alignCenter } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const getDate = () => {
    let timeAgo;
    if (jobInfo.original_posting_date) {
      timeAgo = formatDistanceToNow(new Date(jobInfo.original_posting_date), {
        locale: intl.locale === "en" ? enGB : fr
      });
      return timeAgo;
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

  if (intl.locale === "en") {
    return (
      <Grid
        container
        direction="row"
        justify={isMobile || alignCenter ? "center" : "flex-start"}
        alignItems="center"
      >
        <FaRegClock className={classes.clockIcon} />{" "}
        <Typography component="span" className={classes.subheader}>
          <FormattedMessage id="components.card.posted" />{" "}
        </Typography>
        <Typography component="span" className={classes.subheader}>
          {getDate()}{" "}
        </Typography>
        <Typography component="span" className={classes.subheader}>
          <FormattedMessage id="components.card.ago" />{" "}
        </Typography>
        <Typography component="span" className={classes.subheader}>
          <FormattedMessage id="components.card.on" />{" "}
        </Typography>
        <Typography style={{ color: "grey", fontSize: "1em" }}>
          <a
            href={getSourceLink()}
            className={classes.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getSource()}
          </a>
        </Typography>{" "}
        {alignCenter ? null : (
          <div>
            <Typography
              component="span"
              className={classes.subheader}
              style={{ marginRight: "0.1em" }}
            >
              <FormattedMessage id="components.card.by" />{" "}
            </Typography>
            <Tooltip
              title={alignCenter ? getOrgName("small") || "" : getOrgName() || ""}
              aria-label="organization full name"
              placement="right"
            >
              <Typography variant="body1" component="span" className={classes.organization}>
                {alignCenter ? getOrgName() : getOrgName("small")}
              </Typography>
            </Tooltip>
          </div>
        )}
      </Grid>
    );
  } else
    return (
      <Grid
        container
        direction="row"
        justify={isMobile || alignCenter ? "center" : "flex-start"}
        alignItems="center"
      >
        <FaRegClock className={classes.clockIcon} />{" "}
        <Typography component="span" className={classes.subheader}>
          <FormattedMessage id="components.card.posted" />{" "}
        </Typography>
        <Typography component="span" className={classes.subheader}>
          {getDate()}{" "}
        </Typography>
        <Typography component="span" className={classes.subheader}>
          <FormattedMessage id="components.card.on" />{" "}
        </Typography>
        <Typography style={{ color: "grey", fontSize: "1em" }}>
          <a
            href={getSourceLink()}
            className={classes.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getSource()}
          </a>
        </Typography>{" "}
        {alignCenter ? null : (
          <div>
            <Typography
              component="span"
              className={classes.subheader}
              style={{ marginRight: "0.1em" }}
            >
              <FormattedMessage id="components.card.by" />{" "}
            </Typography>
            <Tooltip
              title={alignCenter ? getOrgName("small") || "" : getOrgName() || ""}
              aria-label="organization full name"
              placement="right"
            >
              <Typography variant="body1" component="span" className={classes.organization}>
                {alignCenter ? getOrgName() : getOrgName("small")}
              </Typography>
            </Tooltip>
          </div>
        )}
      </Grid>
    );
};

JobSubtitle.propTypes = {
  intl: intlShape.isRequired,
  jobInfo: PropTypes.object.isRequired,
  alignCenter: PropTypes.bool,
  isMobile: PropTypes.bool
};

JobSubtitle.defaultProps = {
  alignCenter: false,
  isMobile: false
};

export default injectIntl(JobSubtitle);
