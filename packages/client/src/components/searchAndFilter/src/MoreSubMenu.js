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

const MoreSubMenu = ({ filters, setFilters }) => {
  const classes = useStyles();

  const handleChange = value => event => {
    setFilters(rest => {
      return { ...rest, language: { ...filters.language, [value]: event.target.checked } };
    });
  };

  const {
    language: { fra: fra, eng: eng, spa: spa, und: und }
  } = filters;

  const languageCheckboxes = [
    {
      term: "eng",
      checked: eng,
      label: <FormattedMessage id="component.filtersLanguage.english" />
    },
    {
      term: "fra",
      checked: fra,
      label: <FormattedMessage id="component.filtersLanguage.french" />
    },
    {
      term: "spa",
      checked: spa,
      label: <FormattedMessage id="component.filtersLanguage.spanish" />
    },
    {
      term: "und",
      checked: und,
      label: <FormattedMessage id="component.filtersLanguage.other" />
    }
  ];

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormGroup>
        {languageCheckboxes.map(checkbox => {
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

MoreSubMenu.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default MoreSubMenu;
