import React, { useState } from "react";
import PropTypes from "prop-types";

// i18n imports
import { FormattedMessage } from "react-intl";

import clsx from "clsx"; // mix classes

// Material UI imports
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Typography,
  Divider
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  expand: {
    transform: "rotate(0deg)",
    marginRight: "0.5em",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  filterSection: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  divider: {
    width: "1px",
    zIndex: 3,
    height: "100%",
    backgroundColor: theme.palette.reliefJobsGrey,
    opacity: 0.9,
    marginRight: "1em"
  },
  sectionTitle: {
    marginRight: "0.5em"
  }
}));

const MenuSection = ({ title }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = `primary-filter-menu-${title}`;

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: -65, horizontal: "center" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: -65, horizontal: "center" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <>
      <div className={classes.filterSection} onClick={handleProfileMenuOpen}>
        <div className={classes.divider} />
        <Typography variant="subtitle1" className={classes.sectionTitle}>
          <FormattedMessage id={`component.filterBox.${title}`} />
        </Typography>
        <ExpandMoreIcon
          className={clsx(classes.expand, {
            [classes.expandOpen]: anchorEl
          })}
          aria-controls={menuId}
          aria-haspopup="true"
          aria-label="show more"
          color="disabled"
          style={{ paddingBottom: "0.15em" }}
        />
      </div>
      {renderMenu}
    </>
  );
};

MenuSection.propTypes = {
  title: PropTypes.string.isRequired
};

export default MenuSection;
