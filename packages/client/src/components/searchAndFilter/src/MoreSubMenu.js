import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelDetails,
  Typography,
  Grid
} from "@material-ui/core";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// i18n imports
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    maxHeight: "250px",
    width: "300px",
    overflow: "auto"
  },
  root: {
    color: "#000000"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.primary
  }
}));

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderRadius: "5%",
    overflow: "hidden",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const MoreSubMenu = ({ filters, setFilters }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = value => event => {
    setFilters(rest => {
      return { ...rest, language: { ...filters.language, [value]: event.target.checked } };
    });
  };

  const handleExpansionPanel = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
        <ExpansionPanel expanded={expanded === "panel1"} onChange={handleExpansionPanel("panel1")}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography variant="body1" color="textPrimary">
              <FormattedMessage id="component.filtersLanguage.languages" />
            </Typography>
            {/* <Typography className={classes.secondaryHeading}>Choose language</Typography> */}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
              //   style={{ paddingLeft: "1.1em" }}
            >
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
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </FormGroup>
    </FormControl>
  );
};

MoreSubMenu.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default MoreSubMenu;
