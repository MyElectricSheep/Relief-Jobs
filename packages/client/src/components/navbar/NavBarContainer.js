import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  useScrollTrigger,
  withStyles,
  ButtonGroup,
  Grid
} from "@material-ui/core";

// Custom components imports
import NavButton from "./src/NavButton";
import SocialButton from "./src/SocialNetworksButton";
import ChooseLanguageButton from "./src/ChooseLanguageButton";

// Component specific styling
const styles = theme => ({
  appBar: {
    backgroundColor: theme.palette.navBackground
  },
  // toolbarTitle: {
  //   flexGrow: 1
  // },
  root: {
    border: 0,
    "&:hover": {
      border: 0
    }
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
    classes: { appBar, root }
  } = props;
  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar elevation={0} className={appBar}>
          <Toolbar style={{ paddingRight: 0, paddingLeft: 0, minHeight: "3.2em" }}>
            {/* <nav> */}
            {/* <ButtonGroup variant="contained" className={root}> */}
            {/* <Grid container direction="row" justify="center" alignItems="center"> */}
            {/* <Grid item xs={6}> */}
            <NavButton text="components.nav.recruiters" link="#" />
            <SocialButton which="twitter" />
            <SocialButton which="facebook" />
            <SocialButton which="linkedin" />
            <SocialButton which="instagram" />
            {/* </Grid> */}
            {/* <Grid item xs={6}> */}
            <ChooseLanguageButton options={["fr", "en"]} />
            <NavButton text="components.nav.login" link="#" />
            <NavButton text="components.nav.subscribe" link="#" />
            {/* </Grid> */}
            {/* </Grid> */}
            {/* </ButtonGroup> */}
            {/* </nav> */}
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
