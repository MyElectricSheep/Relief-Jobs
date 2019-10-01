import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

const ExperienceSubMenu = ({ filters, setFilters }) => {
  const classes = useStyles();

  const handleChange = value => event => {
    setFilters({ experience: { ...filters.experience, [value]: event.target.checked } });
  };

  const {
    experience: { "0-2": junior, "3-4": medium, "5-9": advanced, "10+": senior }
  } = filters;

  const checkboxes = [
    { xp: "0-2", checked: junior, label: "0-2 years" },
    { xp: "3-4", checked: medium, label: "3-4 years" },
    { xp: "5-9", checked: advanced, label: "5-9 years" },
    { xp: "10+", checked: senior, label: "10+ years" }
  ];

  //   const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormGroup>
        {checkboxes.map(checkbox => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkbox.checked}
                  onChange={handleChange(checkbox.xp)}
                  value={checkbox.xp}
                />
              }
              label={checkbox.label}
            />
          );
        })}
      </FormGroup>
      {/* <FormHelperText>Be careful</FormHelperText> */}
    </FormControl>
  );
};

ExperienceSubMenu.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default ExperienceSubMenu;
