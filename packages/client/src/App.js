import React, { Component, createContext } from "react";
import PropTypes from "prop-types";

// material-ui imports
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// routing imports
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./components/routing/MainRouter";

// styling imports
import reliefJobsTheme from "./styles/reliefJobsTheme";

// i18n imports
import LanguageProvider from "./config/languageProvider";

export const LocaleContext = createContext(() => {});

class App extends Component {
  theme = createMuiTheme(reliefJobsTheme);

  defineUserLocale = () => {
    return (
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      navigator.userLanguage
    );
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.state.locale =
      this.defineUserLocale() === "en" || this.defineUserLocale() === "fr"
        ? this.defineUserLocale()
        : props.defaultLocale;
  }

  changeLocale = locale => this.setState({ locale });

  render = () => {
    const { messages } = this.props;
    const { locale } = this.state;
    return (
      <MuiThemeProvider theme={this.theme}>
        <CssBaseline />
        <LanguageProvider locale={locale} defaultLocale="en" messages={messages}>
          <BrowserRouter>
            <LocaleContext.Provider value={this.changeLocale}>
              <MainRouter />
            </LocaleContext.Provider>
          </BrowserRouter>
        </LanguageProvider>
      </MuiThemeProvider>
    );
  };
}

App.propTypes = {
  messages: PropTypes.object.isRequired,
  defaultLocale: PropTypes.string.isRequired
};

export default App;
