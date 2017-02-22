/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { IndexLink, Link } from 'react-router';

class Nav extends React.Component {
  render() {
    return (
      <ul className="nav" role="navigation">
        <IndexLink to="/" activeClassName="active"><li className="navItem">Home</li></IndexLink>
        <Link to="/signin" activeClassName="active"><li className="navItem">Sign in</li></Link>
        <Link to="/signup" activeClassName="active"><li className="navItem">Sign up</li></Link>
      </ul>
    );
  }
}
export default Nav;
