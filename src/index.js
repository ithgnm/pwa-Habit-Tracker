import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './service-worker';

import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import translations from './languages/translation.languages'

import App from './app-routing';

var reducers = combineReducers(Object.assign({}, { Intl }))
var store = createStore(reducers, { Intl: { locale: 'en'}})

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider translations={translations}>
            <App />
        </IntlProvider>
    </Provider>
    , document.getElementById('root'));

serviceWorker.register();
