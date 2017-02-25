/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { votePoll } from '../actions/pollActions';
import PollChart from './pollchart';

@connect(store => ({
  polls: store.polls,
}))
class Poll extends React.Component {
  handleClick = (e) => {
    this.props.dispatch(votePoll(this.props.pId, e.target.getAttribute('data-id')));
  }
  render() {
    let options = null;
    const deleteButton = (this.props.mode === 'edit') ? <button className="pollDeleteButton" type="button">X</button> : null;
    let author = null;
    if (this.props.mode !== 'preview') {
      options = this.props.options.map((option, i) => (<button key={i} data-id={i} onClick={this.handleClick} className="pollButton" type="button">{option}</button>));
      author = <h5 className="pollAuthor">by {this.props.author}</h5>;
    }
    const innerContent = (
      <div className="poll">
        <h2 className="pollQuestion">{this.props.question}</h2>
        {author}
        <PollChart pid={this.props.pId} options={this.props.options} votes={this.props.votes} />
        {options}
        {deleteButton}
      </div>
    );
    let content = (innerContent);
    if (this.props.mode === 'preview') {
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
