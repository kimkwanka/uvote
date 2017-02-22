/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class SignUp extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>SignUp</h1>
        <a className="button" href="/">Sign in with Github</a>
        <form action="post">
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" placeholder="Your name" />
          <label htmlFor="email">Email:</label>
          <input id="email" type="text" placeholder="Your email address" />
          <label htmlFor="pw">Password:</label>
          <input id="pw" type="text" placeholder="Your password" />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}
export default SignUp;
