/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class SignIn extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>SignIn</h1>
        <a className="button" href="/login">Sign in with Github</a>
        <form method="post" action="/login">
          <label htmlFor="email">Email:</label>
          <input id="email" type="text" placeholder="Your email address" />
          <label htmlFor="pw">Password:</label>
          <input id="pw" type="text" placeholder="Your password" />
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}
export default SignIn;
