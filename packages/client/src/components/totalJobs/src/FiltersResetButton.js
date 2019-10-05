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

const FiltersResetButton = ({ filters, setFilters, setFilterBadges }) => {
  const classes = useStyles();
  return (
    <Fab variant="extended" size="small" aria-label="Clear filters" className={classes.fab}>
      <AutorenewIcon className={classes.extendedIcon} />
      <FormattedMessage id="component.resetButton.reset" />
    </Fab>
  );
};

FiltersResetButton.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  setFilterBadges: PropTypes.func.isRequired
};

export default FiltersResetButton;
