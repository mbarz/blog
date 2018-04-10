import './style.css';
import './prism.css';
import { render } from './renderer';
import { Router } from './router';

Router.render = render;
render();
