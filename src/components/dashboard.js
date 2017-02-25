/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { connect } from 'react-redux';
import { createPoll } from '../actions/pollActions';
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
  constructor() {
    super();
    this.newPoll = {
      question: '',
      options: ['', ''],
      votes: [0, 0],
      author: '',
    };
  }
  onCreateClick = () => {
    this.newPoll.author = this.props.user.name;
    this.props.dispatch(createPoll(this.newPoll));
  }
  handleChange = (e, prop) => {
    if (prop === 'question') {
      this.newPoll.question = e.target.value;
    } else {
      this.newPoll.options[prop] = e.target.value;
    }
  }
  addOption = () => {

  }
  render() {
    const polls = getUserPolls(this.props.polls, this.props.user.name);
    return (
      <div className="container">
        <h1 className="pageHeadline">Create a Poll</h1>
        <form action="post">
          <label htmlFor="question">Poll question:</label>
          <input id="question" type="text" placeholder="Who is your favorite Captain?" onChange={e => this.handleChange(e, 'question')} />
          <label htmlFor="option0">Options:</label>
          <input id="option0" type="text" placeholder="Picard" onChange={e => this.handleChange(e, 0)} />
          <input id="option1" type="text" placeholder="Kirk" onChange={e => this.handleChange(e, 1)} />
        </form>
        <div className="buttonWrap">
          <button>Add option</button>
          <button className="createPollButton" onClick={this.onCreateClick}>Create the Poll</button>
        </div>
        <h1 className="pageHeadline">My Polls</h1>
        {polls}
      </div>
    );
  }
}
export default Dashboard;
