import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Memory, SimCard, NetworkWifi } from '@material-ui/icons';
import cyan from '@material-ui/core/colors/cyan';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import globalStyles from '../../styles/styles';

const useStyles = makeStyles({
  card: {
    minHeight: 344,
    padding: 10,
    paddingBottom: 0
  },
  legend: {
    paddingTop: 60
  },
  legendText: {
    fontSize: '12px'
  },
  pieChartArea: {
    height: 290,
    textAlign: 'center'
  }
});

const labelStyles = [
  { color: cyan[600], icon: <Memory /> },
  { color: pink[600], icon: <SimCard /> },
  { color: purple[600], icon: <NetworkWifi /> }
];

const chartOptions = {
  legend: { display: false },
  layout: { padding: { left: 0, right: 10, top: 20, bottom: 10 } },
  maintainAspectRatio: false
};

export interface IUtilizationProps {
  labels: string[];
  data: number[];
}

export default function Utilization(props: IUtilizationProps) {
  const classes = useStyles({});
  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: [cyan[600], pink[600], purple[600]]
      }
    ]
  };

  const avatarStyle = (idx: number) => ({ backgroundColor: labelStyles[idx].color })

  return (
    <Card className={classes.card}>
      <span style={globalStyles.title}>Utilization</span>
      <div className='row'>
        <div className='col-xs-12 col-sm-8 col-md-8 col-lg-8'>
          <div className={classes.pieChartArea}>
            <Doughnut data={data} options={chartOptions} />
          </div>
        </div>
        <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
          <div className={classes.legend}>
            <List>
              {props.labels.map((item, idx) => (
                <ListItem key={item} alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar style={avatarStyle(idx)}>{labelStyles[idx].icon}</Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    <span className={classes.legendText}>{item}</span>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>
    </Card>
  );
}
