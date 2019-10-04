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

const ContractSubMenu = ({ filters, setFilters }) => {
  const classes = useStyles();

  const handleChange = value => event => {
    setFilters(rest => {
      return { ...rest, contract: { ...filters.contract, [value]: event.target.checked } };
    });
  };

  const {
    contract: { job: job, consultancy: consultancy, internship: internship, volunteer: volunteer }
  } = filters;

  const checkboxes = [
    { term: "job", checked: job, label: "Job" },
    { term: "consultancy", checked: consultancy, label: "Consultancy" },
    { term: "internship", checked: internship, label: "Internship" },
    { term: "volunteer", checked: volunteer, label: "Volunteer" }
  ];

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormGroup>
        {checkboxes.map(checkbox => {
          return (
            <FormControlLabel
              key={checkbox.term}
              control={
                <Checkbox
                  checked={checkbox.checked}
                  onChange={handleChange(checkbox.term)}
                  value={checkbox.term}
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

ContractSubMenu.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default ContractSubMenu;
