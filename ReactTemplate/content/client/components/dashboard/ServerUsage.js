import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import pink from '@material-ui/core/colors/pink';
import GlobalStyles from '../../styles/styles';

const useStyles = makeStyles({
  paper: {
    backgroundColor: pink[600],
    height: 150
  },
  div: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '95%',
    height: 85
  },
  header: {
    color: '#fff',
    backgroundColor: pink[500],
    padding: 10
  }
});

const chartOptions = {
  legend: { display: false },
  tooltips: { enabled: false },
  scales: {
    xAxes: [ { ticks: { fontColor: '#fff' }, display: true, gridLines: { display: false } } ],
    yAxes: [ { display: false } ]
  },
  layout: { padding: { bottom: 5 } },
  maintainAspectRatio: false
};

export default function ServerUsage(props) {
  const classes = useStyles();
  const data = {
    labels: props.label,
    datasets: [
      {
        data: props.data,
        backgroundColor: pink[400],
        borderColor: pink[500]
      }
    ]
  };

  return (
    <Card className={classes.paper}>
      <div className={classes.header} style={{ ...GlobalStyles.title }}>
        Server Usage
      </div>
      <div className={classes.div}>
        <Bar data={data} options={chartOptions} />
      </div>
    </Card>
  );
}

ServerUsage.propTypes = {
  data: PropTypes.array
};
