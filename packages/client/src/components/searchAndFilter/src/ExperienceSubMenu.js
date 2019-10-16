import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";

// i18n imports
import { intlShape } from "react-intl";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  },
  root: {
    color: "#000000"
  }
}));

const ExperienceSubMenu = ({ filters, setFilters, intl }) => {
  const classes = useStyles();

  const handleChange = value => event => {
    setFilters(rest => {
      return { ...rest, experience: { ...filters.experience, [value]: event.target.checked } };
    });
  };

  const {
    experience: { "0-2": junior, "3-4": medium, "5-9": advanced, "10%2B": senior }
  } = filters;

  const checkboxes = [
    {
      xp: "0-2",
      checked: junior,
      label: `${intl.formatMessage({
        id: "component.filtersExperience.zeroTwo",
        defaultMessage: "0-2 years"
      })}`
    },
    {
      xp: "3-4",
      checked: medium,
      label: `${intl.formatMessage({
        id: "component.filtersExperience.threeFour",
        defaultMessage: "3-4 years"
      })}`
    },
    {
      xp: "5-9",
      checked: advanced,
      label: `${intl.formatMessage({
        id: "component.filtersExperience.fiveNine",
        defaultMessage: "5-9 years"
      })}`
    },
    {
      xp: "10%2B",
      checked: senior,
      label: `${intl.formatMessage({
        id: "component.filtersExperience.tenPlus",
        defaultMessage: "10+ years"
      })}`
    }
  ];

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormGroup>
        {checkboxes.map(checkbox => {
          return (
            <FormControlLabel
              key={checkbox.xp}
              control={
                <Checkbox
                  checked={checkbox.checked}
                  onChange={handleChange(checkbox.xp)}
                  value={checkbox.xp}
                  color="primary"
                  className={classes.root}
                />
              }
              label={checkbox.label}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

ExperienceSubMenu.propTypes = {
  intl: intlShape.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default ExperienceSubMenu;
