import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  useScrollTrigger,
  withStyles,
  ButtonGroup
} from "@material-ui/core";

// Custom components imports
import NavButton from "./src/NavButton";
import SocialNetworks from "./src/SocialNetworksButton";

// Component specific styling
const styles = theme => ({
  appBar: {
    backgroundColor: theme.palette.navBackground
  },
  toolbarTitle: {
    flexGrow: 1
  }
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
          <Toolbar style={{ paddingRight: 0, paddingLeft: 0, minHeight: "3.2em" }}>
            <nav>
              <NavButton text="components.nav.recruiters" className={toolbarTitle} link="#" />
              <SocialNetworks which="twitter" />
              <SocialNetworks which="facebook" />
              <SocialNetworks which="linkedin" />
              <SocialNetworks which="instagram" />
              <ButtonGroup variant="contained">
                <NavButton text="components.nav.login" link="#" />
                <NavButton text="components.nav.subscribe" link="#" />
              </ButtonGroup>
            </nav>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
};

NavBarContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBarContainer);
