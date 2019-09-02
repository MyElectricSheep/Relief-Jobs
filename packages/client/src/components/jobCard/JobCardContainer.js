import React, { useState } from "react";
import PropTypes from "prop-types";
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

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            RJ
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={getTitle()}
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, ducimus voluptas.
          Explicabo dolores fugiat suscipit quae doloremque. Distinctio asperiores, nostrum earum
          quis, expedita labore nisi ducimus obcaecati, placeat quia quos.
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
          <Typography paragraph>Lorem:</Typography>
          <Typography paragraph>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque ut labore, et itaque,
            omnis.
          </Typography>
          <Typography paragraph>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque ut labore, et itaque,
            omnis tempora excepturi voluptatibus odio asperiores at, iusto amet numquam veniam
            corporis perspiciatis nisi quibusdam. Possimus, voluptatibus.
          </Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis beatae nobis adipisci
            commodi eum modi amet! Delectus nobis odio debitis aperiam! Dolorem distinctio, autem
            excepturi ex repudiandae fugiat ad in. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Voluptate, necessitatibus culpa expedita consequatur ad inventore
            placeat provident quaerat laborum cupiditate repellendus, iste molestias voluptates
            nesciunt, sequi recusandae unde ab voluptatum!
          </Typography>
          <Typography>
            Iste molestias voluptates nesciunt, sequi recusandae unde ab voluptatum!
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default JobCardContainer;
