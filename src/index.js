import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './service-worker';

import App from './app-routing';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
