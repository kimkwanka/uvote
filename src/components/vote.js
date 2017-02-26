/* global window, document */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';
import { addPollOption } from '../actions/pollActions';
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
  user: store.user,
  polls: store.polls,
}))
class Vote extends React.Component {
  constructor() {
    super();
    this.index = -1;
    this.additionalOpt = '';
  }
  /* To prevent the server throwing a 'window undefined error' we have to set pollLink in
  here and force an update to actually show it */
  componentDidMount() {
    this.pollLink = <h6><input readOnly onClick={this.selectAllOnClick} className="linkToPoll" value={window.location.href} /></h6>;
    this.forceUpdate();
  }
  onChange = (e) => {
    this.additionalOpt = e.target.value;
  }
  onAddOptionClick = () => {
    this.props.dispatch(addPollOption(this.index, this.additionalOpt));
    document.getElementById('additionalOpt').value = '';
  }
  selectAllOnClick = (e) => {
    e.target.setSelectionRange(0, e.target.value.length);
  }
  render() {
    this.index = findPoll(
      this.props.polls, this.props.params.username,
      decodeURIComponent(this.props.params.question));

    const p = this.props.polls[this.index];
    const alreadyVoted = p.voterNames.indexOf(this.props.user.name) !== -1
                        || p.voterIPs.indexOf(this.props.user.ip) !== -1;

    const poll = (p !== null) ? <Poll alreadyVoted={alreadyVoted} mode="vote" pId={this.index} question={p.question} options={p.options} votes={p.votes} author={p.author} /> : null;
    const addOpts = (!this.props.user.name) ? null : (
      <div>
        <label htmlFor="additionalOpt">Add a new option:</label>
        <input id="additionalOpt" type="text" placeholder="Enter option" onChange={this.onChange} />
        <div className="buttonWrap">
          <button onClick={this.onAddOptionClick} className="addOptionButton">Add Option</button>
        </div>
      </div>
    );
    return (
      <div className="container">
        {poll}
        {addOpts}
        <h3 className="belowPollText">Share this poll with your friends by copying the link below:</h3>
        {this.pollLink}
      </div>
    );
  }
}
export default Vote;
