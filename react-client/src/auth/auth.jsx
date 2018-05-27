import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

export default function requireAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }
    checkAuth() {
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
  const mapStateToProps = state => ({ isLoggedIn: state.auth.loggedIn });
  const comopnent = connect(mapStateToProps)(AuthenticatedComponent);
  return withRouter(comopnent);
}
