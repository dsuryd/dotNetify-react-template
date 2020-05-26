import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import blue from '@material-ui/core/colors/blue';
import auth from '../auth';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: blue[600],
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    maxHeight: 56,
  },
  menuButton: {
    marginLeft: -24,
  },
  morebutton: {
    color: 'white',
  },
  title: {
    flexGrow: 1,
  },
});

export interface IHeaderProps {
  styles: React.CSSProperties;
  onSidebarToggle: (event: React.MouseEvent) => void;
}

export default function Header({ styles, onSidebarToggle }: IHeaderProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles({});

  const handleIconClick = (event: React.MouseEvent) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleMenuClick = () => auth.signOut();

  return (
    <div className={classes.root}>
      <AppBar style={styles} className={classes.appBar}>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' onClick={onSidebarToggle}>
            <MenuIcon />
          </IconButton>
          <h5 className={classes.title} />
          <div>
            <IconButton onClick={handleIconClick} color='inherit'>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClick}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
