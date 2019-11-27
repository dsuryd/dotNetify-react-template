import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import cyan from '@material-ui/core/colors/cyan';
import { Wallpaper } from '@material-ui/icons';

const useStyles = makeStyles({
  subheader: {
    fontSize: 24,
    fontWeight: 'lighter',
    backgroundColor: cyan[600],
    color: '#fff'
  }
});

export default function RecentActivities(props) {
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const open = !!anchorEl;

  const classes = useStyles();

  const handleIconClick = event => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMenuClick = route => props.vm.$routeTo(route);

  return (
    <Card>
      <List>
        <ListSubheader className={classes.subheader}>Recent Activities</ListSubheader>
        {props.data.map((item, idx) => (
          <React.Fragment key={idx}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <Wallpaper />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.PersonName} secondary={item.Status} />
              <ListItemSecondaryAction>
                <div>
                  <IconButton onClick={handleIconClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                    <MenuItem onClick={_ => handleMenuClick(item.Route)}>View</MenuItem>
                  </Menu>
                </div>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider inset="true" />
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
}

RecentActivities.propTypes = {
  data: PropTypes.array
};
