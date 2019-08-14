import React, { useState } from "react";

// Material UI imports
import { Button, withStyles } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";

// icons imports
import { IconContext } from "react-icons";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { PropTypes } from "prop-types";

// Component specific styling
const styles = theme => ({
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

const SocialNetworksButton = props => {
  const {
    which,
    link,
    classes: { root }
  } = props;

  const [iconColor, setIconColor] = useState({ color: "#888a91" });

  const socialIconsList = {
    facebook: <FaFacebookF />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    youtube: <FaYoutube />,
    linkedin: <FaLinkedin />
  };

  const renderSocialIcon = icon => {
    return socialIconsList[icon];
  };

  const changeIconColor = () => {
    setIconColor({ color: "FFFFFF" });
  };

  const revertIconColor = () => {
    setIconColor({ color: "#888a91" });
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => changeIconColor()}
      onMouseLeave={() => revertIconColor()}
    >
      <Button
        variant="outlined"
        size="large"
        classes={{ root }}
        style={{ height: "2.8em", width: "0.5em", maxWidth: "0.5em", borderRadius: 0, border: 0 }}
      >
        <IconContext.Provider value={iconColor}>{renderSocialIcon(which)}</IconContext.Provider>
      </Button>
    </a>
  );
};

SocialNetworksButton.propTypes = {
  classes: PropTypes.object.isRequired,
  which: PropTypes.string.isRequired,
  link: PropTypes.bool
};

SocialNetworksButton.defaultProps = {
  link: "#"
};

export default withStyles(styles)(SocialNetworksButton);
