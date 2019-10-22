import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// i18n imports
import { FormattedMessage, injectIntl } from "react-intl";

// Material UI imports
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  InputAdornment,
  Drawer
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { fade, makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

// Custom components imports
import MenuSection from "./src/MenuSection";
import MobileMenuSection from "./src/MobileMenuSection";

const useStyles = makeStyles(theme => ({
  grow: {
    width: "60vw",
    [theme.breakpoints.down("md")]: {
      width: "60vw"
    },
    [theme.breakpoints.down("sm")]: {
      width: "80vw"
    },
    [theme.breakpoints.down("xs")]: {
      width: "90vw"
    },
    zIndex: "2"
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      marginLeft: theme.spacing(3),
      width: "60%"
    }
  },
  searchIcon: {
    width: theme.spacing(0, 0, 0, 0),
    left: "0em",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "1em"
    },
    [theme.breakpoints.down("lg")]: {
      marginLeft: "1em"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(0, 0, 0, 5),
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "90%"
    },
    [theme.breakpoints.down("lg")]: {
      padding: theme.spacing(0, 0, 0, 7)
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  },
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
  }
}));

const SearchAndFilter = ({
  filters,
  setFilters,
  filterBadges,
  searchInput,
  handleSearchBarInput,
  intl,
  resetOrder,
  upToLaptopSize
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    handleSearchBarInput(userInput);
  }, [userInput]);

  useEffect(() => {
    if (resetOrder) setUserInput("");
  }, [resetOrder]);

  const handleChange = e => {
    setUserInput(e.target.value);
  };

  ////////// MOBILE MENU DRAWER CONTROLLERS /////////////
  const [drawer, setDrawer] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setDrawer({ ...drawer, [side]: open });
  };
  const mobileMenuId = "primary-menu-mobile";
  /////////////////////////////////////////////////////

  // Custom styled badge mini-component
  const StyledBadge = withStyles(theme => ({
    badge: {
      right: 50,
      top: 11,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px"
    }
  }))(Badge);

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="inherit" style={{ borderRadius: "10px" }}>
        <Toolbar disableGutters>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={
                !upToLaptopSize
                  ? `${intl.formatMessage({
                      id: "component.searchBar.search",
                      defaultMessage: "Search..."
                    })}`
                  : `${intl.formatMessage({
                      id: "component.location.searchHere",
                      defaultMessage: "Search..."
                    })}`
              }
              value={userInput}
              onChange={handleChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search bar" }}
              style={{
                width: "100%"
              }}
              endAdornment={
                <InputAdornment position="end">
                  {userInput ? (
                    <HighlightOffIcon
                      aria-label="clear search bar"
                      onClick={() => setUserInput("")}
                      style={{ cursor: "pointer", color: "#97999D", opacity: 0.9 }}
                    />
                  ) : null}
                </InputAdornment>
              }
            />
          </div>
          {/* <div className={classes.grow} /> */}
          <div className={classes.sectionDesktop}>
            <StyledBadge
              badgeContent={filterBadges.contract ? filterBadges.contract : 0}
              invisible={filterBadges.contract ? false : true}
              color="primary"
            >
              <MenuSection
                title="contract"
                filters={filters}
                setFilters={setFilters}
                filterBadges={filterBadges}
              />
            </StyledBadge>
            <StyledBadge
              badgeContent={filterBadges.experience ? filterBadges.experience : 0}
              invisible={filterBadges.experience ? false : true}
              color="primary"
            >
              <MenuSection
                title="experience"
                filters={filters}
                setFilters={setFilters}
                filterBadges={filterBadges}
              />
            </StyledBadge>
            <StyledBadge
              badgeContent={filterBadges.career ? filterBadges.career : 0}
              invisible={filterBadges.career ? false : true}
              color="primary"
            >
              <MenuSection
                title="career"
                filters={filters}
                setFilters={setFilters}
                filterBadges={filterBadges}
              />
            </StyledBadge>
            <StyledBadge
              badgeContent={
                filterBadges.country || filterBadges.region
                  ? filterBadges.country + filterBadges.region
                  : 0
              }
              invisible={filterBadges.country || filterBadges.region ? false : true}
              color="primary"
            >
              <MenuSection
                title="location"
                filters={filters}
                setFilters={setFilters}
                filterBadges={filterBadges}
              />
            </StyledBadge>
            <StyledBadge
              badgeContent={filterBadges.language ? filterBadges.language : 0}
              invisible={filterBadges.language || filterBadges.language ? false : true}
              color="primary"
            >
              <MenuSection
                title="more"
                filters={filters}
                setFilters={setFilters}
                filterBadges={filterBadges}
              />
            </StyledBadge>
          </div>
          <div className={classes.sectionMobile} style={{ paddingRight: "0.5em" }}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={toggleDrawer("right", true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawer.right} onClose={toggleDrawer("right", false)}>
        <MobileMenuSection
          filters={filters}
          setFilters={setFilters}
          filterBadges={filterBadges}
          intl={intl}
          setDrawer={setDrawer}
        />
      </Drawer>
    </div>
  );
};

SearchAndFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  filterBadges: PropTypes.object.isRequired,
  searchInput: PropTypes.object.isRequired,
  handleSearchBarInput: PropTypes.func.isRequired,
  resetOrder: PropTypes.bool.isRequired,
  upToLaptopSize: PropTypes.bool.isRequired
};

export default injectIntl(SearchAndFilter);
