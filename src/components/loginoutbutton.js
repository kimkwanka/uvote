import React from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../actions/userActions';

@connect((store) => {
  return {
    user: store.user,
  }
})
class LogInOutButton extends React.Component {
  
  handleClick = (e) => {
    e.preventDefault();
    if(this.props.user.loggedIn){
      this.props.dispatch(logout());
    } else {
      this.props.dispatch(login('Kesserasdasd'));
    }      
  }
  render() {
    let text;
    if(this.props.user.loggedIn){
      text = 'Logout';
    } else {
      text = 'Login';
    }
    return (
      <a href="/" onClick={this.handleClick}><li className="navItem">{text}</li></a>      
    );
  }
}

export default LogInOutButton;