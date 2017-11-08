import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import globalStyles from '../styles/styles';

const BasePage = (props) => {
  
  const { title, navigation } = props;

  return (
    <div>
      <span style={globalStyles.navigation}>{navigation}</span>
      <Paper style={globalStyles.paper}>
        <h3 style={globalStyles.title}>{title}</h3>
        <Divider />
        {props.children}
        <div style={globalStyles.clear} />
      </Paper>
    </div>
  );
};

BasePage.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.string,
  children: PropTypes.element
};

export default BasePage;
