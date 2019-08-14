import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useScrollTrigger,
  withStyles,
  ButtonGroup
} from "@material-ui/core";

// Custom components imports
import NavButton from "./src/NavButton";

// Component specific styling
const styles = theme => ({
  appBar: {
    // height: "5%",
    backgroundColor: theme.palette.navBackground
  },
  toolbarTitle: {
    flexGrow: 1
  }
  // link: {
  //   margin: theme.spacing(1, 1.5)
  // }
});

const ElevationScroll = props => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
};

const NavBarContainer = props => {
  const {
    classes: { appBar, toolbarTitle }
  } = props;
  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar elevation={0} className={appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={toolbarTitle}>
              ReliefJobs
            </Typography>
            <nav>
              <ButtonGroup variant="contained">
                <NavButton text="components.nav.subscribe" />
                <NavButton text="components.nav.subscribe" />
              </ButtonGroup>
            </nav>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
};

export default withStyles(styles)(NavBarContainer);
