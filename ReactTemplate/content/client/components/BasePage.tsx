import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import globalStyles from '../styles/styles';

export interface IBasePageProps {
  title: string;
  navigation: string;
  children: React.ReactNode;
}

export default function BasePage({ title, navigation, children }: IBasePageProps) {
  return (
    <div>
      <span style={globalStyles.navigation}>{navigation}</span>
      <Paper style={globalStyles.paper}>
        <h3 style={globalStyles.title}>{title}</h3>
        <Divider />
        {children}
        <div style={globalStyles.clear} />
      </Paper>
    </div>
  );
}
