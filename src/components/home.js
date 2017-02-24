/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <h1>Home</h1>
          <a className="button" href="/login">Sign in with Github</a>
        </div>
      </div>
    );
  }
}
export default Home;
