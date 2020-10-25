import React from 'react';
import { RouteLink, IDotnetifyVM } from 'dotnetify';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { grey, blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  drawerPaper: {
    backgroundColor: grey[800]
  },
  logo: {
    cursor: 'pointer',
    fontSize: 22,
    color: 'white',
    lineHeight: `64px`,
    fontWeight: 'lighter',
    backgroundImage: 'url(https://dotnetify.net/content/images/dotnetify-logo-small.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 18,
    backgroundPositionY: 7,
    backgroundColor: blue[800],
    paddingLeft: 70,
    height: 56,
    width: 160
  },
  menuItem: {
    color: grey[200],
    fontSize: 14,
    width: '100%'
  },
  itemIcon: {
    color: grey[400]
  },
  avatarBox: {
    padding: '15px 0 20px 15px',
    backgroundImage: 'url(' + require('../images/material_bg.png') + ')',
    height: 45
  },
  avatarIcon: {
    float: 'left',
    display: 'block',
    marginRight: 15,
    boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
  },
  avatarName: {
    paddingTop: 10,
    display: 'block',
    color: 'black',
    fontSize: '24px',
    fontWeight: 600
  }
});

export interface ISidebarProps {
  vm: IDotnetifyVM;
  logoTitle: string;
  open: boolean;
  userName: string;
  userAvatarUrl: string;
  menus: any[];
}

export default function Sidebar({ vm, logoTitle, open, userName, userAvatarUrl, menus }: ISidebarProps) {
  const classes = useStyles({});
  const drawerClasses = {paper: classes.drawerPaper}

  return (
    <Drawer
      variant='persistent'
      open={open}
      classes={drawerClasses}
    >
      <div className={classes.logo}>{logoTitle}</div>
      <div className={classes.avatarBox}>
        <Avatar src={userAvatarUrl} className={classes.avatarIcon} />
        <span className={classes.avatarName}>{userName}</span>
      </div>
      <List>
        {menus.map((menu, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <Icon className={classes.itemIcon}>{menu.Icon}</Icon>
            </ListItemIcon>
            <RouteLink vm={vm} route={menu.Route} className={classes.menuItem}>
              <ListItemText primary={menu.Title} />
            </RouteLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
