import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Editor from './editor';

export default function requireAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }
    checkAuth() {
      console.log('checking auth', this.props);
      if (!this.props.isLoggedIn) {
        const location = this.props.location;
        const redirect = location.pathname + location.search;
        // this.props.history.push(`/login?redirect=${redirect}`);
        this.props.history.push('/login');
      }
    }
    render() {
      // return <div>TEST</div>;
      return this.props.isLoggedIn ? (
        <Component {...this.props} />
      ) : (
        <div>Forbidden</div>
      );
    }
  }
  console.log('build component');
  console.log('authenticated component');
  const mapStateToProps = state => ({ isLoggedIn: state.auth.loggedIn });
  const comopnent = connect(mapStateToProps)(AuthenticatedComponent);
  return withRouter(comopnent);
}
