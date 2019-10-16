import React from "react";
import PropTypes from "prop-types";

// i18n imports
import { FormattedMessage } from "react-intl";

// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AutorenewIcon from "@material-ui/icons/Autorenew";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    fontSize: "1.15em"
  }
}));

const FiltersResetButton = ({ filters, setFilters, setSearchInput, setResetOrder }) => {
  const classes = useStyles();

  // Clones the original filter object, and sets all values to false
  const handleResetFilters = filters => {
    const resetFilters = filters => {
      const filtersClone = Object.assign({}, filters);
      Object.keys(filtersClone).forEach(key => {
        return Object.keys(filtersClone[key]).forEach(subKey => {
          if (subKey === "country" || subKey === "region") return (filtersClone[key][subKey] = []);
          else return (filtersClone[key][subKey] = false);
        });
      });
      return filtersClone;
    };
    setFilters(resetFilters(filters));
    setSearchInput(null);
    setResetOrder(true);
  };

  return (
    <Fab
      variant="extended"
      size="small"
      aria-label="Clear filters"
      className={classes.fab}
      onClick={() => handleResetFilters(filters)}
    >
      <AutorenewIcon className={classes.extendedIcon} />
      <FormattedMessage id="component.resetButton.reset" />
    </Fab>
  );
};

FiltersResetButton.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  setSearchInput: PropTypes.func.isRequired,
  setResetOrder: PropTypes.func.isRequired
};

export default FiltersResetButton;
