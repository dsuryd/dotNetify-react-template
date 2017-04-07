import React from 'react';
import dotnetify from 'dotnetify';
import { Bar } from 'react-chartjs';

export default class LiveChart extends React.Component {
   constructor(props) {
      super(props);
      dotnetify.react.connect("LiveChart", this);
      this.state = {};

      this.chartData = {
         labels: Array(10).fill(""),
         datasets: [{
            data: Array(10),
            fillColor: 'rgba(75, 192, 192, 0.2)',
            strokeColor: 'rgba(75, 192, 192, 1)'
         }]
      };
      this.chartOptions = { responsive: true, scaleOverride: true, scaleSteps: 5, scaleStepWidth: 10 };
      this.updateChart = value => {
            this.chartData.datasets[0].data.shift();
            this.chartData.datasets[0].data.push(value);
      };
   }

   render() {
      return (
         <Bar data={this.chartData} options={this.chartOptions}>
            {this.updateChart(this.state.NextValue)}
         </Bar>
      );
   }
}