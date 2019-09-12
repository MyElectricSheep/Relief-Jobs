import React from "react";

// Scroll Up component import
import ScrollUpButton from "react-scroll-up-button";

// Material UI imports
import { Fab, useMediaQuery, withStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

// Custom CSS import
import "./src/scrollUpStyle.css";

// Icons imports
import { FaAngleDoubleUp } from "react-icons/fa";

const styles = theme => ({
  root: {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.reliefJobsOrange,
    "&:hover": {
      backgroundColor: fade(
        theme.palette.reliefJobsOrange,
        theme.palette.action.hoverOpacityPagination
      ),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      },
      "&$focusVisible": {
        boxShadow: theme.palette.text.secondary
      }
    }
  }
});

const ScrollUp = props => {
  const {
    classes: { root }
  } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <ScrollUpButton
      EasingType="easeInOutQuart"
      ShowAtPosition={1000}
      AnimationDuration={1500}
      ContainerClassName={isMobile ? "hiddeScrollUp" : "scrollUpContainer"}
      TransitionClassName="scrollUpTransition"
    >
      <Fab color="primary" size="small" aria-label="Scroll up" classes={{ root }}>
        <FaAngleDoubleUp />
      </Fab>
    </ScrollUpButton>
  );
};

export default withStyles(styles)(ScrollUp);
