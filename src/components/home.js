/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import SignIn from './signin';
import Dashboard from './dashboard';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <h1>Home</h1>
        </div>
        <SignIn />
      </div>
    );
  }
}
export default Home;
