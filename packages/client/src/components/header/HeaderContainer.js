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
  },
  bringSearchUp: {
    marginBottom: "-2.5em"
  }
});

const HeaderContainer = props => {
  const {
    classes: { carouselPosition, test, bringSearchUp }
  } = props;
  return (
    <div className={bringSearchUp}>
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
