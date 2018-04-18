import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import './prism.css';
import { Layout } from './layout';

ReactDOM.render(<Layout />, document.getElementById('app'));
module.hot.accept();
