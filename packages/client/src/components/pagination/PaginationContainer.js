import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  init: {}
});

const PaginationContainer = props => {
  const {
    classes: { init }
  } = props;
  return <></>;
};

PaginationContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

// PaginationContainer.defaultProps = {
//   xyz: " ",
// };

export default withStyles(styles)(PaginationContainer);
