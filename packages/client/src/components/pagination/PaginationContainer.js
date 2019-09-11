import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { withStyles, Fab, Grid } from "@material-ui/core";

const styles = theme => ({
  init: {}
});

const PaginationContainer = props => {
  const {
    totalJobs,
    offset,
    changePage,
    classes: { init }
  } = props;
  const numberOfPages = Array(Math.floor(totalJobs / 30))
    .fill(1)
    .map((e, i) => i + 1);
  const jobsLeftOnLastPage = totalJobs % 30;
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {numberOfPages.map(pageNumber => (
        <Fab
          key={pageNumber}
          color="primary"
          disabled={pageNumber === parseInt(offset) + 1 ? true : false}
          size="small"
          aria-label="pagination item"
          style={{ marginRight: "0.5em" }}
          onClick={() => changePage(pageNumber - 1)}
        >
          {pageNumber}
        </Fab>
      ))}
    </Grid>
  );
};

PaginationContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  totalJobs: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired
};

// PaginationContainer.defaultProps = {
//   xyz: " ",
// };

export default withStyles(styles)(PaginationContainer);
