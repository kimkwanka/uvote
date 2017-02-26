/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { votePoll, deletePoll } from '../actions/pollActions';
import PollChart from './pollchart';

@connect(store => ({
  user: store.user,
  polls: store.polls,
}))
class Poll extends React.Component {
  onVoteClick = (e) => {
    this.props.dispatch(votePoll(this.props.pId, e.target.getAttribute('data-id'), this.props.user.name, this.props.user.ip));
  }
  onDeleteClick = (e) => {
    e.preventDefault();
    this.props.dispatch(deletePoll(this.props.pId));
  }
  render() {
    let question = this.props.question;
    const maxQLength = 28;
    if (this.props.mode === 'edit' && question.length > maxQLength) {
      question = `${question.substring(0, maxQLength)}...`;
    }
    let options = null;
    const deleteButton = (this.props.mode === 'edit') ? <button onClick={this.onDeleteClick} className="pollDeleteButton" type="button">X</button> : null;
    let author = null;
    if (this.props.mode === 'vote') {
      if (!this.props.alreadyVoted) {
        options = this.props.options.map((option, i) => (<button key={i} data-id={i} onClick={this.onVoteClick} className="pollButton" type="button">{option}</button>));
      } else {
        options = <h4 className="alreadyVotedText">Thanks for your vote.</h4>;
      }
      author = <h5 className="pollAuthor">by {this.props.author}</h5>;
    }
    const innerContent = (
      <div className="poll">
        <h2 className="pollQuestion">{question}</h2>
        {author}
        <PollChart pId={this.props.pId} options={this.props.options} votes={this.props.votes} />
        {options}
        {deleteButton}
      </div>
    );
    let content = (innerContent);
    if (this.props.mode !== 'vote') {
      // Encode to keep question marks intact
      const encodedQ = encodeURIComponent(this.props.question);
      const href = `/poll/${this.props.author}/${encodedQ}`;
      content = (<Link to={href} activeClassName="active">{innerContent}</Link>);
    }
    return (
      <div>{ content }</div>
    );
  }
}
export default Poll;
