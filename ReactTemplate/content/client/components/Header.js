import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import auth from '../auth';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: blue[600],
    position: 'fixed',
    top: 0,
    overflow: 'hidden',
    maxHeight: 56
  },
  menuButton: {
    marginLeft: -24
  },
  title: {
    flexGrow: 1
  }
});

export default function Header(props) {
  const classes = useStyles();
  const { styles, onSidebarToggle } = props;

  return (
    <div className={classes.root}>
      <AppBar style={styles} className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={onSidebarToggle}>
            <MenuIcon />
          </IconButton>
          <h5 className={classes.title} />
          <Button edge="end" color="inherit" onClick={_ => auth.logout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  styles: PropTypes.object,
  onSidebarToggle: PropTypes.func
};
