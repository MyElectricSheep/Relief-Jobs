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
  },
  primary: {
    fontSize: "1.3em",
    fontWeight: 500,
    color: theme.palette.text.primary
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
        <ListItemText
          classes={{ primary: classes.primary }}
          primary={primaryText || null}
          secondary={secondaryText || null}
        />
      </ListItem>
      {divider ? <Divider variant="inset" component="li" /> : null}
    </List>
  );
};

SectionHeader.propTypes = {
  intl: intlShape.isRequired,
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string,
  divider: PropTypes.bool
};

SectionHeader.defaultProps = {
  secondaryText: null,
  divider: true
};

export default injectIntl(SectionHeader);
