import React from "react";
import PropTypes from "prop-types";

// Tool to combine classes
import clsx from "clsx";

// Country flags import
import ReactCountryFlag from "react-country-flag";

// Material UI imports
import {
  Grid,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Typography,
  withStyles
} from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";

// Component specific styling
const styles = theme => ({
  textStyle: {
    fontWeight: 700,
    fontSize: "0.875rem",
    lineHeight: 1.75,
    letterSpacing: "0.08857em",
    textTransform: "uppercase",
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily
  },
  contained: {
    border: 0
  },
  root: {
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.text.secondary,
      border: 0,
      textDecoration: "none",
      backgroundColor: "transparent",
      "@media (hover: none)": {
        backgroundColor: "transparent"
      },
      "&$disabled": {
        backgroundColor: "transparent"
      }
    }
  }
});

const ChooseLanguageButton = props => {
  const {
    classes: { textStyle, contained, root },
    options
  } = props;

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} align="center">
        <ButtonGroup
          variant="outlined"
          color="primary"
          ref={anchorRef}
          aria-label="split button"
          className={clsx(contained, root)}
          onClick={handleToggle}
        >
          <Button className={clsx(contained, root)}>
            {" "}
            <ReactCountryFlag
              code={options[selectedIndex] === "en" ? "gb" : options[selectedIndex]}
              styleProps={{
                width: "1.1em",
                height: "1.7em"
              }}
              svg
            />
            <Typography
              variant="button"
              style={{ paddingLeft: "0.3em" }}
              color="textSecondary"
              className={textStyle}
            >
              {options[selectedIndex]}
            </Typography>
          </Button>
          <Button
            color="primary"
            className={clsx(contained, root)}
            size="small"
            aria-owns={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
          >
            {!open ? <ArrowDropDown /> : <ArrowDropUp />}
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={event => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
};

ChooseLanguageButton.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.array
};

ChooseLanguageButton.defaultProps = {
  options: ["fr", "en"]
};

export default withStyles(styles)(ChooseLanguageButton);
