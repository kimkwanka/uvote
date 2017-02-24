/* global document, window */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { votePoll } from '../actions/pollActions';

@connect(store => ({
  polls: store.polls,
}))
class Poll extends React.Component {
  componentDidMount() {
    this.didMount = true;
    this.renderGraph();
  }
  handleClick = (e) => {
    this.props.dispatch(votePoll(this.props.pId, e.target.getAttribute('data-id')));
  }
  renderGraph() {
    if (window !== undefined) {
      const labels = this.props.options;
      const data = this.props.votes;

      const col = [
        '255, 99, 132',
        '54, 162, 235',
        '255, 206, 86',
      ];
      const backgroundColor = [];
      const borderColor = [];
      labels.forEach((el, i) => {
        const tmp = col[i % 3];
        backgroundColor.push(`rgba(${tmp}, 0.2)`);
        borderColor.push(`rgba(${tmp}, 1.0)`);
      });

      const Chart = require('chart.js'); // eslint-disable-line
      const ctx = document.getElementById(`ctx${this.props.pId}`);
      Chart.defaults.global.defaultFontFamily = 'Roboto';
      Chart.defaults.global.defaultFontStyle = 'normal';
      Chart.defaults.global.defaultFontSize = 16;
      // eslint-disable-next-line
      const chart = new Chart(ctx, { 
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: '# of Votes',
            data,
            backgroundColor,
            borderColor,
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
        },
      });
    }
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
        <div className="pollGraph">
          <canvas id={`ctx${this.props.pId}`} width="200" height="200" />
        </div>
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

    if (this.didMount) {
      this.renderGraph();
    }

    return (
      <div>{ content }</div>
    );
  }
}
export default Poll;
