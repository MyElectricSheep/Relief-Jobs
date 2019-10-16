import React, { useState } from "react";
import PropTypes from "prop-types";

// Country names imports
import combinedCountries from "../../../resources/combinedCountries.json";

// i18n imports
import { injectIntl, intlShape, FormattedMessage } from "react-intl";

// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import {
  FormControl,
  FormGroup,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Fab,
  Divider
} from "@material-ui/core";

import clsx from "clsx"; // tool to mix classes

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    paddingRight: theme.spacing(2),
    maxHeight: "350px",
    overflow: "auto"
  },
  buttons: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    borderRadius: "20px",
    width: "140px"
  },
  searchField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  root: {
    "& label": {
      color: theme.palette.reliefJobsGrey
    },
    "& label.Mui-focused": {
      color: theme.palette.reliefJobsGreyLighter1
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.reliefJobsGreyLighter1
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.reliefJobsGreyLighter1
      },
      "&:hover fieldset": {
        borderColor: theme.palette.reliefJobsGreyLighter1
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.reliefJobsGreyLighter1
      }
    }
  },
  checkBox: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  showMore: {
    margin: theme.spacing(1)
  }
}));

const LocationSubMenu = ({ filters, setFilters, intl }) => {
  const classes = useStyles();
  const { formatMessage } = intl;
  const [sliceOffset, setSliceOffset] = useState(10);
  const [countrySearchInput, setCountrySearchInput] = useState("");

  const handleChange = value => event => {
    if (filters.location.country.includes(value)) {
      const filteredCountries = [...filters.location.country].filter(country => country !== value);
      setFilters(rest => {
        return {
          ...rest,
          location: { ...filters.location, country: [...filteredCountries] }
        };
      });
    } else
      setFilters(rest => {
        return {
          ...rest,
          location: { ...filters.location, country: [...filters.location.country, value] }
        };
      });
  };

  const handleSearch = e => {
    setCountrySearchInput(e.target.value);
  };

  const countries = combinedCountries
    .filter(country => {
      if (intl.locale === "en")
        return country.name.toLowerCase().includes(countrySearchInput.toLowerCase());
      else return country.frName.toLowerCase().includes(countrySearchInput.toLowerCase());
    })
    .filter(country => !filters.location.country.includes(country.id));

  const selectedCountries = combinedCountries.filter(country =>
    filters.location.country.includes(country.id)
  );

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormGroup>
        <Grid container direction="row" justify="center" alignItems="center">
          <Button variant="contained" size="small" color="primary" className={classes.buttons}>
            <FormattedMessage id="component.location.country" />
          </Button>
          <Button variant="contained" size="small" color="" className={classes.buttons}>
            <FormattedMessage id="component.location.region" />
          </Button>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <TextField
            fullWidth
            label={formatMessage({ id: "component.location.searchHere" })}
            type="search"
            className={clsx(classes.searchField, classes.dense, classes.root)}
            margin="dense"
            variant="outlined"
            value={countrySearchInput}
            onChange={handleSearch}
          />
        </Grid>
        {selectedCountries.map(country => {
          return (
            <FormControlLabel
              key={country.name}
              control={
                <Checkbox
                  checked={filters.location.country.includes(country.id) ? true : false}
                  value={intl.locale === "en" ? country.name : country.frName}
                  onChange={handleChange(country.id)}
                  color="primary"
                  className={classes.checkBox}
                />
              }
              label={intl.locale === "en" ? country.name : country.frName}
            />
          );
        })}
        {selectedCountries.length !== 0 && <Divider variant="middle" />}
        {countries.slice(0, sliceOffset).map(country => {
          return (
            <FormControlLabel
              key={country.name}
              control={
                <Checkbox
                  checked={filters.location.country.includes(country.id) ? true : false}
                  value={intl.locale === "en" ? country.name : country.frName}
                  onChange={handleChange(country.id)}
                  color="primary"
                  style={{ color: "#000000" }}
                  className={classes.checkBox}
                />
              }
              label={intl.locale === "en" ? country.name : country.frName}
            />
          );
        })}
        {countries.length > 10 && (
          <Grid container direction="row" justify="center" alignItems="center">
            <Fab
              color="primary"
              aria-label="Show more"
              className={classes.showMore}
              size="small"
              onClick={() => setSliceOffset(sliceOffset + 20)}
            >
              <AddIcon />
            </Fab>
          </Grid>
        )}
      </FormGroup>
    </FormControl>
  );
};

LocationSubMenu.propTypes = {
  intl: intlShape.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default LocationSubMenu;
