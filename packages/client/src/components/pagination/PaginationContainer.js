import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { withStyles, Fab, Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

// Icons imports
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight } from "react-icons/fa";

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
  const theme = useTheme();
  const mobilePagination = useMediaQuery(theme.breakpoints.down("sm"));
  const responsiveOffset = mobilePagination ? offset + 3 : offset + 7;
  const numberOfPages = Array(Math.floor(totalJobs / 30))
    .fill(1)
    .map((e, i) => i + 1)
    .slice(offset, responsiveOffset);
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {offset == 0 ? null : (
        <Fab
          color="primary"
          size="small"
          aria-label="pagination back to start"
          style={{ marginRight: "0.5em" }}
          onClick={() => changePage(0)}
        >
          <FaAngleDoubleLeft />
        </Fab>
      )}
      {offset == 0 ? null : (
        <Fab
          color="primary"
          size="small"
          aria-label="pagination back"
          style={{ marginRight: "0.5em" }}
          onClick={() => changePage(offset - 1)}
        >
          <FaAngleLeft />
        </Fab>
      )}
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
      {numberOfPages.length === 1 ? null : (
        <Fab
          color="primary"
          size="small"
          aria-label="pagination next"
          onClick={() => changePage(offset + 1)}
        >
          <FaAngleRight />
        </Fab>
      )}
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
