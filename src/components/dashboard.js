/* global document */
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
        retPolls.unshift(<div key={i} className="pollDashContainer"><Poll mode="edit" key={i} pId={i} question={p.question} options={p.options} votes={p.votes} author={p.author} /></div>);
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
      voterNames: [],
      voterIPs: [],
      author: '',
    };
  }
  onCreateClick = () => {
    this.newPoll.author = this.props.user.name;
    this.props.dispatch(createPoll(this.newPoll));
    this.newPoll = {
      question: '',
      options: ['', ''],
      votes: [0, 0],
      voterNames: [],
      voterIPs: [],
      author: '',
    };
    const inputs = document.getElementsByTagName('INPUT');
    for (let i = 0; i < inputs.length; i += 1) {
      inputs[i].value = '';
    }
    this.forceUpdate();
  }
  onAddOptClick = () => {
    this.newPoll.votes.push(0);
    this.newPoll.options.push('');
    this.forceUpdate();
  }
  handleChange = (e, prop) => {
    if (prop === 'question') {
      this.newPoll.question = e.target.value;
    } else {
      this.newPoll.options[prop] = e.target.value;
    }
  }
  render() {
    const polls = getUserPolls(this.props.polls, this.props.user.name);
    const options = this.newPoll.options.map((o, i) => <input key={i} id={`option${i}`} type="text" placeholder={`Enter Option No. ${i}`} onChange={e => this.handleChange(e, i)} />);
    return (
      <div className="container">
        <form className="createPollForm" action="">
          <label htmlFor="question">Poll question:</label>
          <input id="question" type="text" placeholder="Enter your question" onChange={e => this.handleChange(e, 'question')} />
          <label htmlFor="option0">Options:</label>
          {options}
        </form>
        <div className="buttonWrap">
          <button onClick={this.onAddOptClick}>Add option</button>
          <button className="createPollButton" onClick={this.onCreateClick}>Create the Poll</button>
        </div>
        {polls}
      </div>
    );
  }
}
export default Dashboard;
