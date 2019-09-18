import React from "react";
import PropTypes from "prop-types";

// i18n imports
import { injectIntl, intlShape, FormattedMessage } from "react-intl";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import WorkIcon from "@material-ui/icons/Work";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const SectionHeader = props => {
  const { primaryText, secondaryText, divider } = props;
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={primaryText || null} secondary={null || null} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};

SectionHeader.propTypes = {
  intl: intlShape.isRequired,
  primaryText: PropTypes.object.isRequired,
  secondaryText: PropTypes.array.isRequired,
  divider: PropTypes.bool.isRequired
};

export default injectIntl(SectionHeader);
