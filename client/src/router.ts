import { render } from './renderer';

export const Router = {
  render: () => {},
  route: (target: string) => {
    history.pushState(null, undefined, target);
    render();
  }
};
