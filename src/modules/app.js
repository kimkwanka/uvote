/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Nav from './nav';

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <div className="container">
            <div className="navLogo">
              <h2>uVote</h2>
            </div>
            <Nav />
            <div className="navUser">
              <h4>Hello, Quincy</h4>
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
App.propTypes = {
  children: React.PropTypes.node,
};
App.defaultProps = () => ({ children: null });

export default App;
