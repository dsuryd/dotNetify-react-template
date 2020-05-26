import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import pink from '@material-ui/core/colors/pink';
import globalStyles from '../../styles/styles';

const useStyles = makeStyles({
  card: {
    backgroundColor: pink[600],
    height: 150,
  },
  header: {
    color: 'white',
    backgroundColor: pink[500],
    padding: 10,
  },
  body: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '95%',
    height: 85,
  },
});

const chartOptions = {
  legend: { display: false },
  tooltips: { enabled: false },
  scales: {
    xAxes: [{ ticks: { fontColor: 'white' }, display: true, gridLines: { display: false } }],
    yAxes: [{ display: false }],
  },
  layout: { padding: { bottom: 5 } },
  maintainAspectRatio: false,
};

export interface IServerUsageProps {
  labels: string[];
  data: number[];
}

export default function ServerUsage(props: IServerUsageProps) {
  const classes = useStyles({});
  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: pink[400],
        borderColor: pink[500],
      },
    ],
  };

  return (
    <Card className={classes.card}>
      <div className={classes.header} style={{ ...globalStyles.title }}>
        Server Usage
      </div>
      <div className={classes.body}>
        <Bar data={data} options={chartOptions} />
      </div>
    </Card>
  );
}
