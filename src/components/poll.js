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
    /* A poll can be in 3 different modes depending on where it is shown:
      1. preview - on the polls overview
      2. edit - on user's dashboard
      3. vote - when on that poll's voting page
    */
    const maxQLength = 28;

    let content = null;
    let question = <h2 className="pollQuestion">{this.props.question}</h2>;
    let options = null;
    let author = null;
    let deleteButton = null;

    const encodedQ = encodeURIComponent(this.props.question);
    const href = `/poll/${this.props.author}/${encodedQ}`;

    if (this.props.mode === 'edit') {
      // Shorten the question for the 2 column style in edit mode
      if (this.props.question.length > maxQLength) {
        question = <h2 className="pollQuestion">{`${this.props.question.substring(0, maxQLength)}...`}</h2>;
      }
      deleteButton = <button onClick={this.onDeleteClick} className="pollDeleteButton" type="button">X</button>;
    } else if (this.props.mode === 'vote') {
      // Show voting buttons depending on whether the user already voted
      if (!this.props.alreadyVoted) {
        options = this.props.options.map((option, i) => (<button key={i} data-id={i} onClick={this.onVoteClick} className="pollButton" type="button">{option}</button>));
      } else {
        options = <h4 className="alreadyVotedText">Thanks for your vote.</h4>;
      }
      author = <h5 className="pollAuthor">by {this.props.author}</h5>;
    }
    const innerContent = (
      <div className="poll">
        {question}
        {author}
        <PollChart pId={this.props.pId} options={this.props.options} votes={this.props.votes} />
        {options}
        {deleteButton}
      </div>
    );
    // Make the whole poll a link to its voting page, when not in vote mode
    if (this.props.mode === 'vote') {
      content = innerContent;
    } else {
      content = (<Link to={href} activeClassName="active">{innerContent}</Link>);
    }

    return (
      content
    );
  }
}
export default Poll;
