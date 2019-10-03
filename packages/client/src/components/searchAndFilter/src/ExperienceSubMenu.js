import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  },
  root: {
    color: "#000000"
  }
}));

const ExperienceSubMenu = ({ filters, setFilters }) => {
  const classes = useStyles();

  const handleChange = value => event => {
    setFilters({ experience: { ...filters.experience, [value]: event.target.checked } });
  };

  const {
    experience: { "0-2": junior, "3-4": medium, "5-9": advanced, "10%2B": senior }
  } = filters;

  const checkboxes = [
    { xp: "0-2", checked: junior, label: "0-2 years" },
    { xp: "3-4", checked: medium, label: "3-4 years" },
    { xp: "5-9", checked: advanced, label: "5-9 years" },
    { xp: "10%2B", checked: senior, label: "10+ years" }
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
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default ExperienceSubMenu;
