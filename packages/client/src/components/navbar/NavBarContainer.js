import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, CssBaseline, useScrollTrigger, withStyles } from "@material-ui/core";

// Get the current locale
import { injectIntl, intlShape } from "react-intl";

// Custom components imports
import NavButton from "./src/NavButton";
import SocialButton from "./src/SocialNetworksButton";
import ChooseLanguageButton from "./src/ChooseLanguageButton";

// Component specific styling
const styles = theme => ({
  appBar: {
    backgroundColor: theme.palette.navBackground
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
    classes: { appBar },
    intl
  } = props;

  const localeOptions = intl.locale === "en" ? ["fr", "en"] : ["en", "fr"];
  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar elevation={0} className={appBar}>
          <Toolbar style={{ paddingRight: 0, paddingLeft: 0, minHeight: "3.2em" }}>
            <NavButton text="components.nav.recruiters" link="#" background="#4B4D55" />
            <SocialButton which="twitter" />
            <SocialButton which="facebook" />
            <SocialButton which="linkedin" />
            <SocialButton which="instagram" />
            <ChooseLanguageButton options={localeOptions} />
            <NavButton text="components.nav.login" link="#" />
            <NavButton text="components.nav.subscribe" link="#" background="#f57c00" />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
};

NavBarContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(withStyles(styles)(NavBarContainer));
