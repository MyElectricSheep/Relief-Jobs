import React from "react";
import PropTypes from "prop-types";

// i18n imports
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import { fr, enGB } from "date-fns/locale";

// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Tooltip } from "@material-ui/core";

// Date functions
import { formatDistanceToNow } from "date-fns";

// Icons imports
import { FaRegClock } from "react-icons/fa";

const useStyles = makeStyles(theme => ({
  clockIcon: {
    paddingTop: "0.2em",
    fontSize: "1em",
    color: "grey"
  },
  sourceLink: {
    color: "grey",
    textDecoration: "underline dotted grey",
    "&:hover": {
      color: "black",
      textDecoration: "underline dotted black"
    }
  },
  subheader: {
    color: "grey",
    fontSize: "1em",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center"
    }
  },
  center: {
    textAlign: center
  }
}));

const JobSubtitle = props => {
  const classes = useStyles();
  const { intl, jobInfo } = props;

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
      <React.Fragment className={classes.center}>
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
        <a
          href={getSourceLink()}
          className={classes.sourceLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {getSource()}
        </a>{" "}
        <Typography component="span" className={classes.subheader}>
          <FormattedMessage id="components.card.by" />{" "}
        </Typography>
        <Tooltip title={getOrgName() || ""} aria-label="organization full name" placement="right">
          <Typography
            variant="body1"
            component="span"
            style={{
              fontSize: "1em",
              fontWeight: 600,
              cursor: "pointer",
              color: "grey"
            }}
          >
            {getOrgName("small")}
          </Typography>
        </Tooltip>
      </React.Fragment>
    );
  } else
    return (
      <React.Fragment className={classes.center}>
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
        <a
          href={getSourceLink()}
          className={classes.sourceLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {getSource()}
        </a>{" "}
        <Typography component="span" className={classes.subheader}>
          <FormattedMessage id="components.card.by" />{" "}
        </Typography>
        <Tooltip title={getOrgName() || ""} aria-label="organization full name" placement="right">
          <Typography
            variant="body1"
            component="span"
            style={{
              fontSize: "1em",
              fontWeight: 600,
              cursor: "pointer",
              color: "grey"
            }}
          >
            {getOrgName("small")}
          </Typography>
        </Tooltip>
      </React.Fragment>
    );
};

JobSubtitle.propTypes = {
  intl: intlShape.isRequired,
  jobInfo: PropTypes.object.isRequired
};

export default injectIntl(JobSubtitle);
