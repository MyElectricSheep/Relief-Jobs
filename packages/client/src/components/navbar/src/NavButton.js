import React from "react";

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
    text
  } = props;
  return (
    <Button
      variant="outlined"
      size="large"
      classes={{ root }}
      style={{ height: "2.8em", width: "12em", borderRadius: 0 }}
    >
      <Typography color="textSecondary" className={textStyle}>
        <FormattedMessage id={text || " "} />
      </Typography>
    </Button>
  );
};

export default withStyles(styles)(NavButton);
