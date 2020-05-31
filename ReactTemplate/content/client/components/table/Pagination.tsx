import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  paper: {
    display: 'inline',
    padding: '.5em 0',
    borderRadius: 0
  },
  button: { minWidth: '2.5em' }
});

export interface IPaginationProps {
  pages: number[];
  select: number;
  style: React.CSSProperties;
  onSelect: (page: any) => void;
}

export default function Pagination(props: IPaginationProps) {
  const classes = useStyles({});
  const pageButtons = props.pages.map(page => (
    <Paper key={page} className={classes.paper}>
      <Button variant='text' className={classes.button} disabled={props.select == page} onClick={() => props.onSelect(page)}>
        {page}
      </Button>
    </Paper>
  ));

  return <div style={props.style}>{pageButtons}</div>;
}
