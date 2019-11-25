import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './service-worker';

import App from './app-routing';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
