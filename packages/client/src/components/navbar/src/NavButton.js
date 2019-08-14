import React from "react";
import { Button, withStyles, Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

// Component specific styling
const styles = theme => ({
  button: {
    // margin: theme.spacing(1)
  }
});

const NavButton = props => {
  const {
    classes: { button },
    text
  } = props;
  return (
    <Button
      variant="outlined"
      size="large"
      className={button}
      style={{ height: "4em", borderRadius: 0 }}
    >
      <Typography color="textSecondary">
        <FormattedMessage id={text || "."} />
      </Typography>
    </Button>
  );
};

export default withStyles(styles)(NavButton);
