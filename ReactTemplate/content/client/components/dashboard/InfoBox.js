import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  content: {
    padding: '5px 10px',
    marginLeft: 90,
    height: 80
  },
  number: {
    display: 'block',
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 10,
    color: '#333'
  },
  text: {
    fontSize: 18,
    fontWeight: 'lighter',
    color: '#666'
  },
  iconSpan: {
    float: 'left',
    height: 90,
    width: 90,
    textAlign: 'center',
    backgroundColor: props => props.color
  },
  icon: {
    color: '#fff',
    height: 48,
    width: 48,
    marginTop: 20,
    maxWidth: '100%'
  }
});

export default function InfoBox({ title, value, Icon, ...props }) {
  const classes = useStyles(props);
  return (
    <Card>
      <span className={classes.iconSpan}>
        <Icon className={classes.icon} />
      </span>

      <div className={classes.content}>
        <span className={classes.text}>{title}</span>
        <span className={classes.number}>{value}</span>
      </div>
    </Card>
  );
}

InfoBox.propTypes = {
  Icon: PropTypes.any,
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.any
};
