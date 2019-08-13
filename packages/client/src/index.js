import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { translationMessages, DEFAULT_LOCALE } from './i18n';
import * as serviceWorker from './serviceWorker';

const MOUNT_NODE = 'root';

const render = () => {
ReactDOM.render(<App messages={translationMessages} defaultLocale={DEFAULT_LOCALE} />, document.getElementById(MOUNT_NODE));
}
// Chunked polyfill for browsers without Intl support.
if (!window.Intl) {
    new Promise(resolve => resolve(import('intl')))
      .then(() => Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/fr.js'),
      ]))
      .then(() => render())
      .catch((err) => {
        throw err;
      });
  } else {
    render();
  }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
