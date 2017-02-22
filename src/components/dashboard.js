/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Poll from './poll';

import { connect } from 'react-redux';
import { login, logout } from '../actions/userActions';

@connect((store) => {
  return {
    user: store.user,
  }
})
class Dashboard extends React.Component {
  componentDidMount(){
    this.props.dispatch(login(this.props.params.username));
  }
  render() {
    return (
      <div className="container">
        <h1>Dashboard</h1>
        <button>Create Poll</button>
        <div />
        <Poll pq="Is Luigi sexy?" />
        <Poll pq="Who is the better Enterprise Captain?" />
        <Poll pq="Is Luigi sexy?" />
        <Poll pq="Who is the better Enterprise Captain?" />
        <Poll pq="Is Luigi sexy?" />
      </div>
    );
  }
}
export default Dashboard;
