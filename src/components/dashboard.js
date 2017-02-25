/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { connect } from 'react-redux';
import Poll from './poll';

const getUserPolls = (polls, username) => {
  const retPolls = [];
  if (polls !== []) {
    polls.forEach((p, i) => {
      if (p.author === username) {
        retPolls.push(<Poll mode="edit" key={i} pId={i} question={p.question} options={p.options} votes={p.votes} author={p.author} />);
      }
    });
  }
  return retPolls;
};

@connect(store => ({
  user: store.user,
  polls: store.polls,
}))
class Dashboard extends React.Component {
  addOption = () => {

  }
  render() {
    const polls = getUserPolls(this.props.polls, this.props.user.name);
    return (
      <div className="container">
        <h1 className="pageHeadline">Create a Poll</h1>
        <form action="post">
          <label>Poll question:</label>
          <input type="text" placeholder="Who is your favorite Captain?" />
          <label>Options:</label>
          <input type="text" placeholder="Picard" />
          <input type="text" placeholder="Kirk" />
        </form>
        <div className="buttonWrap">
          <button>Add option</button>
          <button className="createPollButton">Create the Poll</button>
        </div>
        <h1 className="pageHeadline">My Polls</h1>
        {polls}
      </div>
    );
  }
}
export default Dashboard;
