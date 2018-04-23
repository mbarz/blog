import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

import './style.css';
// import './prism.css';
import './favicon.ico';

ReactDOM.render(<App />, document.getElementById('app'));
module.hot.accept();
