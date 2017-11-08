import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import Paper from 'material-ui/Paper';
import { white, pink600, pink500, pink400 } from 'material-ui/styles/colors';
import GlobalStyles from '../../styles/styles';

const ServerUsage = (props) => {

  const styles = {
    paper: {
      backgroundColor: pink600,
      height: 150
    },
    div: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '95%',
      height: 85
    },
    header: {
      color: white,
      backgroundColor: pink500,
      padding: 10
    }
  };

  const data = {
    labels: props.label,
    datasets: [
      {
        data: props.data,        
        backgroundColor: pink400,
        borderColor: pink500
      }
    ]
  };

  const options = {
    legend: { display: false },
    scales: { xAxes: [{ ticks: { fontColor: white }, display: true, gridLines: { display: false } }], yAxes: [{ display: false }] },
    layout: { padding: { bottom: 5 } },
    maintainAspectRatio: false
  }

  return (
    <Paper style={styles.paper}>
      <div style={{ ...GlobalStyles.title, ...styles.header }}>Server Usage</div>
      <div style={styles.div}>
        <Bar data={data} options={options} />
      </div>
    </Paper>
  );
};

ServerUsage.propTypes = {
  data: PropTypes.array
};

export default ServerUsage;
