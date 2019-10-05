import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";

// i18n imports
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    maxHeight: "250px",
    overflow: "auto"
  },
  root: {
    color: "#000000"
  }
}));

const CareerSubMenu = ({ filters, setFilters }) => {
  const classes = useStyles();

  const handleChange = value => event => {
    setFilters(rest => {
      return { ...rest, career: { ...filters.career, [value]: event.target.checked } };
    });
  };

  const {
    career: {
      9999: other,
      36601: logistics,
      20971: information,
      20966: grants,
      6868: monitoring,
      6867: program,
      6866: ict,
      6865: communication,
      6864: adminfi,
      6863: hr,
      9991: training
    }
  } = filters;

  const checkboxes = [
    { term: 9999, checked: other, label: <FormattedMessage id="component.filtersCareer.other" /> },
    {
      term: 36601,
      checked: logistics,
      label: <FormattedMessage id="component.filtersCareer.logistics" />
    },
    {
      term: 20971,
      checked: information,
      label: <FormattedMessage id="component.filtersCareer.information" />
    },
    {
      term: 20966,
      checked: grants,
      label: <FormattedMessage id="component.filtersCareer.grants" />
    },
    {
      term: 6868,
      checked: monitoring,
      label: <FormattedMessage id="component.filtersCareer.monitoring" />
    },
    {
      term: 6867,
      checked: program,
      label: <FormattedMessage id="component.filtersCareer.program" />
    },
    { term: 6866, checked: ict, label: <FormattedMessage id="component.filtersCareer.ict" /> },
    {
      term: 6865,
      checked: communication,
      label: <FormattedMessage id="component.filtersCareer.communication" />
    },
    {
      term: 6864,
      checked: adminfi,
      label: <FormattedMessage id="component.filtersCareer.adminfi" />
    },
    { term: 6863, checked: hr, label: <FormattedMessage id="component.filtersCareer.hr" /> },
    {
      term: 9991,
      checked: training,
      label: <FormattedMessage id="component.filtersCareer.training" />
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
                  style={{ marginLeft: "0.5em" }}
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

CareerSubMenu.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default CareerSubMenu;
