/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class Poll extends React.Component {
  render() {
    return (
      <div className="poll">
        <button className="pollDeleteButton" type="button">X</button>
        <h3 className="pollQuestion">{this.props.pq}</h3>
        <button className="pollButton" type="button">Oh, yeah!!</button>
        <button className="pollButton" type="button">Hells, no :((</button>
        <button className="pollButton" type="button">Maybe if he shaved</button>
      </div>
    );
  }
}
export default Poll;
