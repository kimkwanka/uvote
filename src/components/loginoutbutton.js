/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';

@connect(store => ({
  user: store.user,
}))
class LogInOutButton extends React.Component {
  render() {
    let text = 'Sign in with Github';
    let href = '/login';
    if (this.props.user && this.props.user.name) {
      text = 'Logout';
      href = '/logout';
    }
    return (
      <a href={href}><li className="button">{text}</li></a>
    );
  }
}
export default LogInOutButton;
