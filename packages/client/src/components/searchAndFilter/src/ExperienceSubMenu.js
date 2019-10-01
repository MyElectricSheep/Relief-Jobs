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
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false
  });

  const handleChange = value => event => {
    // setFilters({ ...filters, filters[value]: event.target.checked });
    setFilters({ experience: { "0-2": true } });
  };

  const {
    experience: { "0-2": junior, "3-4": medium, "5-9": advanced, "10+": senior }
  } = filters;

  console.log(junior);

  const { gilad, jason, antoine } = state;
  //   const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={junior} onChange={handleChange("0-2")} value="0-2" />}
          label="0-2 years"
        />
        {/* <FormControlLabel
          control={<Checkbox checked={jason} onChange={handleChange("jason")} value="jason" />}
          label="Jason Killian"
        />
        <FormControlLabel
          control={
            <Checkbox checked={antoine} onChange={handleChange("antoine")} value="antoine" />
          }
          label="Antoine Llorca"
        /> */}
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
