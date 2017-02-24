/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */

import React from 'react';
import { IndexLink } from 'react-router';
import LogInOutButton from './loginoutbutton';

class Header extends React.Component {
  render() {
    const greeting = this.props.userName ? `Hello, ${this.props.userName}` : '';
    return (
      <header>
        <nav className="container">
          <div className="navLogo">
            <h2>uVote</h2>
          </div>
          <ul className="nav" role="navigation">
            <IndexLink to="/" activeClassName="active"><li className="navItem">Home</li></IndexLink>
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
