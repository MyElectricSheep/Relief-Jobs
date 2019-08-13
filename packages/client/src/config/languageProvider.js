/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

const LanguageProvider = ({ locale, messages, children }) => (
  <IntlProvider
    locale={locale}
    key={locale}
    messages={messages[locale]}
  >
    {React.Children.only(children)}
  </IntlProvider>
);

LanguageProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

export default LanguageProvider;
