const reliefJobsTheme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    reliefJobsOrange: "#f57c00",
    reliefJobsGrey: "#97999D",
    navBackground: "#31333B",
    navButtonBgRecruiters: "#4B4D55",
    navButtonBgRegister: "#f57c00",
    primary: {
      main: "#ef6c00"
    },
    secondary: {
      main: "#3949ab"
    },
    text: {
      primary: "#000000",
      secondary: "#FFFFFF"
    },
    action: {
      hoverOpacity: 0.1,
      hoverOpacityPagination: 0.8
    },
    disabled: {
      main: "#97999D"
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: ["Lato", "Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    fontSize: 14,
    h2: {
      fontFamily: "Lato",
      fontSize: "2.5em",
      lineHeight: 2,
      fontWeight: 600
    },
    body1: {
      fontFamily: "Lato",
      fontSize: "1.25em",
      lineHeight: 1.25,
      fontWeight: 400
    },
    overline: {
      color: "#000000",
      fontFamily: "Lato",
      fontSize: "0.845rem",
      fontWeight: 400,
      textTransform: "uppercase",
      lineHeight: 1.25,
      textDecoration: "underline"
    },
    subtitle1: {
      textTransform: "uppercase",
      fontFamily: "sans-serif",
      fontSize: "0.7rem",
      fontWeight: 500,
      opacity: 0.95,
      letterSpacing: "0.9px",
      color: "#97999D"
    },
    subtitle2: {
      color: "#373942",
      fontFamily: "Lato",
      fontSize: "1.25rem",
      fontWeight: 600,
      opacity: "0.9",
      lineHeight: 1.25
    }
  },
  overrides: {
    // Name of the ⚛️ component / style sheet
    MuiLinearProgress: {
      // Name of the rule
      colorPrimary: {
        backgroundColor: "#bababa"
      }
    }
  }
};

export default reliefJobsTheme;
