import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

import './style.css';
import './prism.css';

ReactDOM.render(<App />, document.getElementById('app'));
module.hot.accept();
