/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';
import Nav from './nav';

@connect(store => ({
  user: store.user,
}))
class Layout extends React.Component {
  render() {
    let navUserName = null;

    if (this.props.user && this.props.user.name !== null) {
      navUserName = <h4>Hello, {this.props.user.name}</h4>;
    }
    return (
      <div>
        <header>
          <div className="container">
            <div className="navLogo">
              <h2>uVote</h2>
            </div>
            <Nav />
            <div className="navUser">
              {navUserName}
            </div>
          </div>
        </header>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}
Layout.propTypes = {
  children: React.PropTypes.node,
};
Layout.defaultProps = () => ({ children: null });

export default Layout;
