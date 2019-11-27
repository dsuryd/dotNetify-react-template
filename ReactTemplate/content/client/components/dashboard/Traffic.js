import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import purple from '@material-ui/core/colors/purple';

const useStyles = makeStyles({
  paper: {
    backgroundColor: purple[500],
    height: 150
  },
  div: {
    height: 95,
    padding: '5px 15px 0 15px'
  },
  header: {
    fontSize: 24,
    color: '#fff',
    backgroundColor: purple[600],
    padding: 10
  }
});

const chartOptions = {
  legend: { display: false },
  scales: { xAxes: [ { display: false } ], yAxes: [ { display: false } ] },
  layout: { padding: { left: 5, right: 5, top: 5, bottom: 5 } },
  maintainAspectRatio: false
};

export default function Traffic(props) {
  const classes = useStyles();

  const data = {
    labels: new Array(props.data.length),
    datasets: [
      {
        data: props.data,
        fill: false,
        backgroundColor: 'white',
        borderColor: '#8884d8',
        borderWidth: 2,
        pointBorderWidth: 2,
        cubicInterpolationMode: 'monotone'
      }
    ]
  };

  return (
    <Card className={classes.paper}>
      <div className={classes.header}>Traffic</div>
      <div className={classes.div}>
        <Line data={data} options={chartOptions} />
      </div>
    </Card>
  );
}

Traffic.propTypes = {
  data: PropTypes.array
};
