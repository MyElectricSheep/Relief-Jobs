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
    navBackground: "#31333B",
    text: {
      primary: "#000000",
      secondary: "#FFFFFF"
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: ["Lato", "Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    fontSize: 14,
    button: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
      color: "FFFFFF"
    }
  }
};

export default reliefJobsTheme;
