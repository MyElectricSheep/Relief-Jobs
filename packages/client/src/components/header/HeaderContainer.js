import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { withStyles } from "@material-ui/core";

// Custom components imports
import HeaderCarousel from "./src/HeaderCarousel";

// Logo
import reliefJobsLogo from "../../pics/images/reliefJobsLogo.png";

const styles = theme => ({
  carouselPosition: {
    position: "relative"
  },
  test: {
    position: "absolute",
    top: "3.5em",
    left: "8px"
  },
  bringSearchUp: {
    marginBottom: "-2.5em"
  },
  logo: {
    width: "25%",
    position: "absolute",
    top: "6.5vh",
    [theme.breakpoints.down("md")]: {
      top: "5.9vh"
    },
    left: "37.5%",
    zIndex: 3
  }
});

const HeaderContainer = props => {
  const {
    classes: { carouselPosition, test, bringSearchUp, logo }
  } = props;
  return (
    <div className={bringSearchUp}>
      <img src={reliefJobsLogo} alt="Relief Jobs Logo" className={logo} />
      <HeaderCarousel className={carouselPosition} />

      {/* <span className={test}> text positioning test </span> */}
    </div>
  );
};

HeaderContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

// HeaderContainer.defaultProps = {
//   xyz: " ",
// };

export default withStyles(styles)(HeaderContainer);
