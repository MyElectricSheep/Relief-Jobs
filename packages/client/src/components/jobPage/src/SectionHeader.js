import React from "react";
import PropTypes from "prop-types";

// i18n imports
import { injectIntl, intlShape } from "react-intl";

// Material UI import
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from "@material-ui/core";
import WorkIcon from "@material-ui/icons/Work";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  primary: {
    fontSize: "1.3em",
    fontWeight: 500,
    color: theme.palette.text.primary,
    marginLeft: "-1.5em"
  },
  pill: {
    // https://coveloping.com/tools/css-shapes-generator
    height: "4px",
    width: "17px",
    backgroundColor: theme.palette.reliefJobsOrange,
    borderRadius: "150px"
  }
}));

const SectionHeader = props => {
  const { primaryText, secondaryText, divider, icon } = props;
  const classes = useStyles();

  const getIcon = icon => {
    if (icon === "description") {
      return <WorkIcon />;
    } else return null;
  };

  return (
    <List className={classes.root} dense style={{ paddingBottom: "0px" }}>
      <ListItem dense style={{ paddingBottom: "0px" }}>
        <ListItemAvatar>
          {icon ? <Avatar>{getIcon(icon)}</Avatar> : <div className={classes.pill}></div>}
        </ListItemAvatar>
        <ListItemText
          classes={{ primary: classes.primary }}
          primary={primaryText || null}
          secondary={secondaryText || null}
        />
      </ListItem>
      {divider ? <Divider variant="fullWidth" component="li" /> : null}
    </List>
  );
};

SectionHeader.propTypes = {
  intl: intlShape.isRequired,
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string,
  divider: PropTypes.bool,
  icon: PropTypes.string
};

SectionHeader.defaultProps = {
  secondaryText: null,
  divider: false,
  icon: null
};

export default injectIntl(SectionHeader);
