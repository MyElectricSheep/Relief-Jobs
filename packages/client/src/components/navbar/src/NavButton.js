import React from "react";
import PropTypes from "prop-types";

// i18n imports
import { FormattedMessage } from "react-intl";

// Material UI imports
import { Button, withStyles, Typography } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";

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
  root: {
    "&:hover": {
      textDecoration: "none",
      backgroundColor: fade(theme.palette.text.secondary, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }
  }
});

const NavButton = props => {
  const {
    classes: { textStyle, root },
    text,
    link
  } = props;
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Button
        variant="outlined"
        size="large"
        classes={{ root }}
        style={{ height: "2.8em", width: "12em", borderRadius: 0 }}
      >
        <Typography color="textSecondary" className={textStyle}>
          <FormattedMessage id={text} />
        </Typography>
      </Button>
    </a>
  );
};

NavButton.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.object,
  link: PropTypes.bool
};

NavButton.defaultProps = {
  text: " ",
  link: "#"
};

export default withStyles(styles)(NavButton);
