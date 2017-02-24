/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */

import React from 'react';
import { IndexLink, Link } from 'react-router';
import LogInOutButton from './loginoutbutton';

class Header extends React.Component {
  render() {
    let greeting = '';
    let dashLink = null;
    if (this.props.userName) {
      greeting = `Hello, ${this.props.userName}`;
      dashLink = <Link to="/dashboard" activeClassName="active"><li className="navItem">Dashboard</li></Link>;
    }
    return (
      <header>
        <nav className="container">
          <div className="navLogo">
            <h2>uVote</h2>
          </div>
          <ul className="nav" role="navigation">
            <IndexLink to="/" activeClassName="active"><li className="navItem">Polls</li></IndexLink>
            {dashLink}
            <LogInOutButton />
          </ul>
          <div className="navUser">
            <h4>{greeting}</h4>
          </div>
        </nav>
      </header>
    );
  }
}
export default Header;
