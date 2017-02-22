/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Poll from './poll';

class Dashboard extends React.Component {
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
