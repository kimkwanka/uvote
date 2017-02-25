/* global document, window */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
import React from 'react';
import { connect } from 'react-redux';

 /* For some weird reason, even when checking for (window !== undefined), the server throws an error
 'window is undefined' when trying to use renderGraph() as is in render(). The workaround is to wait
 for componentDidMount() - then you can safely render the chart. */

@connect(store => ({
  user: store.user,
}))
class PollChart extends React.Component {
  // Set flag and do initial render
  componentDidMount() {
    this.didMount = true;
    this.renderChart();
  }
  renderChart() {
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
      if (!this.chart) {
        const Chart = require('chart.js'); // eslint-disable-line
        const ctx = document.getElementById(`ctx${this.props.pId}`);
        Chart.defaults.global.defaultFontFamily = 'Roboto';
        Chart.defaults.global.defaultFontStyle = 'normal';
        Chart.defaults.global.defaultFontSize = 16;
        // eslint-disable-next-line
        this.chart = new Chart(ctx, {
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
      } else {
        this.chart.data.datasets[0].data = data;
        this.chart.update();
      }
    }
  }
  render() {
    if (this.didMount) {
      this.renderChart();
    }
    return (
      <div className="pollChart">
        <canvas id={`ctx${this.props.pId}`} width="200" height="200" />
      </div>
    );
  }
}
export default PollChart;
