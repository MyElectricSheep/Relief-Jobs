import React, { useState, useContext, useEffect } from "react";
import { LocaleContext } from "../../App";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
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
  Typography
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 845,
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
    fontSize: "1.6em",
    fontWeight: 500
  },
  subheader: {
    color: "grey",
    fontSize: "0.9em"
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
  }
}));

const JobCardContainer = props => {
  const classes = useStyles();
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

  const getCardContent = type => {
    if (jobInfo.body) {
      if (jobInfo.body.split(" ").length < 60) return jobInfo.body;
      if (type === "excerpt") {
        return jobInfo.body
          .split(" ")
          .splice(0, 60)
          .join(" ");
      } else if (type === "collapsed") {
        return jobInfo.body
          .split(" ")
          .splice(60, jobInfo.body.split(" ").length - 60)
          .join(" ");
      }
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

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="job" className={classes.avatar}>
            RJ
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
              </a>
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
              </a>
            </>
          )
        }
        classes={{
          title: classes.title,
          subheader: classes.subheader
        }}
      />
      {/* <CardMedia className={classes.media} image="/static/images/cards/lorem.jpg" title="Lorem" /> */}
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {`${getCardContent("excerpt")}...`}
        </Typography>
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
        <CardContent>
          <Typography paragraph>{`...${getCardContent("collapsed")}`}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

JobCardContainer.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(JobCardContainer);
