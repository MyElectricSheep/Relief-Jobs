import React from "react";
import ScrollUpButton from "react-scroll-up-button";
import { Fab, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

// Custom css import
import "./src/scrollUpStyle.css";

// Icons imports
import { FaAngleDoubleUp } from "react-icons/fa";

const ScrollUp = () => {
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
      <Fab color="primary" size="small" aria-label="Scroll up">
        <FaAngleDoubleUp />
      </Fab>
    </ScrollUpButton>
  );
};

export default ScrollUp;
