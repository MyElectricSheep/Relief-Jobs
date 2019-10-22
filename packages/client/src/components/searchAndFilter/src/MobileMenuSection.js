import React, { useState } from "react";
import PropTypes from "prop-types";

// i18n imports
import { intlShape, FormattedMessage } from "react-intl";

// Material UI imports
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { ExpansionPanel, ExpansionPanelDetails, Typography, Fab, Grid } from "@material-ui/core";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SaveIcon from "@material-ui/icons/Save";

// Custom component imports
import ContractSubMenu from "./ContractSubMenu";
import CareerSubMenu from "./CareerSubMenu";
import LocationSubMenu from "./LocationSubMenu";
import MoreSubMenu from "./MoreSubMenu";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ExpansionPanelSummary = withStyles(theme => ({
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
  ["@media (max-width:390px)"]: {
    root: {
      paddingLeft: "6.5em"
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
}))(MuiExpansionPanelSummary);

const MobileMenuSection = ({ filters, filterBadges, setFilters, intl, setDrawer }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpansionPanel = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <ExpansionPanel
        expanded={expanded === "contractPanel"}
        onChange={handleExpansionPanel("contractPanel")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="contractPanelbh-content"
          id="contractPanelbh-header"
        >
          <Typography variant="body1" color="textPrimary">
            <FormattedMessage id={`component.filterBox.contract`} />
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ContractSubMenu
            filters={filters}
            setFilters={setFilters}
            filterBadges={filterBadges}
            intl={intl}
            mobile
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "careerPanel"}
        onChange={handleExpansionPanel("careerPanel")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="careerPanelbh-content"
          id="careerPanelbh-header"
        >
          <Typography variant="body1" color="textPrimary">
            <FormattedMessage id={`component.filterBox.career`} />
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CareerSubMenu
            filters={filters}
            setFilters={setFilters}
            filterBadges={filterBadges}
            intl={intl}
            mobile
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "locationPanel"}
        onChange={handleExpansionPanel("locationPanel")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="locationPanelbh-content"
          id="locationPanelbh-header"
        >
          <Typography variant="body1" color="textPrimary">
            <FormattedMessage id={`component.filterBox.location`} />
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <LocationSubMenu
            filters={filters}
            setFilters={setFilters}
            filterBadges={filterBadges}
            intl={intl}
            mobile
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "morePanel"}
        onChange={handleExpansionPanel("morePanel")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="morePanelbh-content"
          id="morePanelbh-header"
        >
          <Typography variant="body1" color="textPrimary">
            <FormattedMessage id={`component.filterBox.more`} />
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <MoreSubMenu
            filters={filters}
            setFilters={setFilters}
            filterBadges={filterBadges}
            intl={intl}
            mobile
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ paddingTop: "2em", paddingBottom: "1em" }}
      >
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="save filters"
          className={classes.margin}
          onClick={() => setDrawer({ right: false })}
        >
          <SaveIcon className={classes.extendedIcon} />
          <FormattedMessage id="component.mobileMenu.saveFilters" />
        </Fab>
      </Grid>
    </>
  );
};

MobileMenuSection.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  filterBadges: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  setDrawer: PropTypes.func.isRequired
};

export default MobileMenuSection;
