import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { withStyles } from "@material-ui/core";

// Custom components imports
import HeaderCarousel from "./src/HeaderCarousel";

const styles = theme => ({
  carouselPosition: {
    position: "relative"
  },
  test: {
    position: "absolute",
    top: "3.5em",
    left: "8px"
  }
});

const HeaderContainer = props => {
  const {
    classes: { carouselPosition, test }
  } = props;
  return (
    <>
      <HeaderCarousel className={carouselPosition} />
      <span className={test}> yoloooooooo </span>
    </>
  );
};

HeaderContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

// HeaderContainer.defaultProps = {
//   xyz: " ",
// };

export default withStyles(styles)(HeaderContainer);
