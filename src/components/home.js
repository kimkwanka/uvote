/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { connect } from 'react-redux';
import Poll from './poll';

@connect(store => ({
  polls: store.polls,
}))
class Home extends React.Component {
  render() {
    const polls = this.props.polls.map((p, i) => <Poll mode="preview" pId={i} key={i} question={p.question} options={p.options} votes={p.votes} author={p.author} />);
    return (
      <div>
        <div className="container">
          <h1 className="pageHeadline">Latest Polls</h1>
          {polls}
        </div>
      </div>
    );
  }
}
export default Home;
