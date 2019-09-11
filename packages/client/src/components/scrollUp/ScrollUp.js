import React from "react";
import ScrollUpButton from "react-scroll-up-button";
import Fab from "@material-ui/core/Fab";

// Custom css import
import "./src/scrollUpStyle.css";

// Icons imports
import { FaAngleDoubleUp } from "react-icons/fa";

const ScrollUp = () => {
  return (
    <ScrollUpButton
      EasingType="easeInOutQuart"
      ShowAtPosition={1000}
      AnimationDuration={1500}
      ContainerClassName="AnyClassForContainer"
      TransitionClassName="AnyClassForTransition"
    >
      <Fab color="primary" size="small" aria-label="Scroll up">
        <FaAngleDoubleUp />
      </Fab>
    </ScrollUpButton>
  );
};

export default ScrollUp;
