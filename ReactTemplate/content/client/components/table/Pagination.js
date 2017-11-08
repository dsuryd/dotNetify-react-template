import React from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

const Pagination = (props) => {

  const styles = {
    paper: {
      display: 'inline',
      padding: '.5em 0'
    },
    button: { minWidth: '1em'}
  };

  const pageButtons = props.pages.map(page =>
    <Paper key={page} style={styles.paper}>
      <FlatButton style={styles.button}
        label={page}
        disabled={props.select == page}
        onClick={() => props.onSelect(page)} />
    </Paper>
  );

  return (
    <div style={props.style}>{pageButtons}</div>
  );
}

export default Pagination;