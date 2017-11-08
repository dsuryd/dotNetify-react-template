import React from 'react';
import PropTypes from 'prop-types';
import { RouteLink } from 'dotnetify/dist/dotnetify-react.router';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import { spacing, typography } from 'material-ui/styles';
import { white, blue600 } from 'material-ui/styles/colors';

const Sidebar = (props) => {

  let { vm, logoTitle, open, userAvatarUrl, menus } = props;

  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: blue600,
      paddingLeft: 70,
      height: 56,
    },
    menuItem: {
      color: white,
      fontSize: 14
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        backgroundImage: 'url(' + require('../images/material_bg.png') + ')',
        height: 45
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: 15,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
      },
      span: {
        paddingTop: 12,
        display: 'block',
        color: 'white',
        fontWeight: 300,
        textShadow: '1px 1px #444'
      }
    }
  };

  return (
    <Drawer docked={true} open={open}>
      <div style={styles.logo}>{logoTitle}</div>
      <div style={styles.avatar.div}>
        <Avatar src={userAvatarUrl} size={50} style={styles.avatar.icon} />
        <span style={styles.avatar.span}>{props.username}</span>
      </div>
      <div>
        {menus.map((menu, index) =>
          <MenuItem
            key={index}
            style={styles.menuItem}
            primaryText={menu.Title}
            leftIcon={<FontIcon className="material-icons">{menu.Icon}</FontIcon>}
            containerElement={<RouteLink vm={vm} route={menu.Route} />}
          />
        )}
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
  userAvatarUrl: PropTypes.string
};

export default Sidebar;
