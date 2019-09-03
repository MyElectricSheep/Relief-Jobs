import React, { useState } from "react";
import PropTypes from "prop-types";
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
    color: theme.palette.text.primary,
    fontSize: "0.9em"
  }
}));

const JobCardContainer = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { jobInfo } = props;

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
    if (jobInfo.original_posting_date) {
      const timeAgo = formatDistanceToNow(new Date(jobInfo.original_posting_date), {
        locale: enGB
      });
      return `${timeAgo} ago`;
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
        subheader={getDate()}
        classes={{
          title: classes.title,
          subheader: classes.subheader
        }}
      />
      <CardMedia className={classes.media} image="/static/images/cards/lorem.jpg" title="Lorem" />
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

export default JobCardContainer;
