/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';
import Poll from './poll';

const findPoll = (polls, username, question) => {
  let index = -1;
  if (polls !== []) {
    polls.forEach((p, i) => {
      if (p.question === question && p.author === username) {
        index = i;
      }
    });
  }
  return index;
};

@connect(store => ({
  polls: store.polls,
}))
class Vote extends React.Component {
  constructor() {
    super();
    this.index = -1;
  }
  render() {
    this.index = findPoll(
      this.props.polls, this.props.params.username,
      decodeURIComponent(this.props.params.question));
    const p = this.props.polls[this.index];
    const poll = (p !== null) ? <Poll mode="vote" pId={this.index} question={p.question} options={p.options} votes={p.votes} author={p.author} /> : null;
    return (
      <div className="container">
        <h1 className="pageHeadline">Vote</h1>
        {poll}
      </div>
    );
  }
}
export default Vote;
