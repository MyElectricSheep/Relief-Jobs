import React from 'react';
import PropTypes from 'prop-types';

// routing imports
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './components/routing/MainRouter';

// material-ui imports
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// styling imports
import reliefJobsTheme from './styles/reliefJobsTheme';

// i18n imports
import LanguageProvider from './config/languageProvider'

class App extends React.Component {
  state = {};

  theme = createMuiTheme(reliefJobsTheme);

  constructor(props) {
    super(props);
    this.state.locale = props.defaultLocale;
  }

  changeLocale = locale => this.setState({ locale });

  render = () => {
    const { messages } = this.props;
    const { locale } = this.state;
    return (
        <MuiThemeProvider theme={this.theme}>
          <CssBaseline />
          <LanguageProvider
            locale={locale}
            defaultLocale="en"
            messages={messages}
          >
            <BrowserRouter>
                <MainRouter />
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
