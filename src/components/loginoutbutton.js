import React from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../actions/userActions';

//@connect((store) => {
//  return {
//    user: store.user,
//  }
//})

class LogInOutButton extends React.Component {
  handleClick (e) {
    e.preventDefault();
    if(this.props.user.loggedIn){
      this.props.dispatch(logout());
    } else {
      this.props.dispatch(login('Kesserasdasd'));      
    }
  }
  componentDidMount(){
    console.log('MOUNT?', this.props)
  }
  render() {
    let text;
    console.log('USER?', this.props.user)
    console.log('PROPS?', this.props)
    if(this.props.user && this.props.user.loggedIn){
      text = 'Logout';
    } else {
      text = 'Login';
    }
    return (
      <a href="/" onClick={(e) => this.handleClick(e)} ><li className="navItem">{text}</li></a>      
    );
  }
}
function mapStateToProps (state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(LogInOutButton);
//export default LogInOutButton;