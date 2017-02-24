/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';
import Header from './header';

@connect(store => ({
  user: store.user,
}))
class Layout extends React.Component {
  render() {
    const userName = (this.props.user.name !== null) ? this.props.user.name : null;
    return (
      <div>
        <Header userName={userName} />
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
