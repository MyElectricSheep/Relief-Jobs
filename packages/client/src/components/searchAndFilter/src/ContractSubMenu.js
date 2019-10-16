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

const ContractSubMenu = ({ filters, setFilters, intl }) => {
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
    {
      term: "job",
      checked: job,
      label: `${intl.formatMessage({
        id: "component.filtersContract.job",
        defaultMessage: "Job"
      })}`
    },
    {
      term: "consultancy",
      checked: consultancy,
      label: `${intl.formatMessage({
        id: "component.filtersContract.consultancy",
        defaultMessage: "Consultancy"
      })}`
    },
    {
      term: "internship",
      checked: internship,
      label: `${intl.formatMessage({
        id: "component.filtersContract.internship",
        defaultMessage: "Internship"
      })}`
    },
    {
      term: "volunteer",
      checked: volunteer,
      label: `${intl.formatMessage({
        id: "component.filtersContract.volunteer",
        defaultMessage: "Volunteer"
      })}`
    }
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
  intl: intlShape.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default ContractSubMenu;
