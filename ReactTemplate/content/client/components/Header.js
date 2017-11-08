import React from 'react';
import PropTypes from 'prop-types';
import { RouteLink } from 'dotnetify/dist/dotnetify-react.router';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ViewModule from 'material-ui/svg-icons/action/view-module';
import { white } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import auth from '../auth';

const Header = (props) => {

  const { styles, onSidebarToggle } = props;

  const style = {
    appBar: {
      position: 'fixed',
      top: 0,
      overflow: 'hidden',
      maxHeight: 57
    },
    menuButton: { marginLeft: 10 },
    iconsRightContainer: { marginLeft: 20 }
  };

  const handleSignout = _ => auth.signOut();

  return (
    <div>
      <AppBar
        style={{ ...styles, ...style.appBar }}
        iconElementLeft={
          <IconButton style={style.menuButton} onClick={onSidebarToggle}>
            <Menu color={white} />
          </IconButton>
        }
        iconElementRight={
          <div style={style.iconsRightContainer}>
            <IconMenu color={white}
              iconButtonElement={<IconButton><MoreVertIcon color={white} /></IconButton>}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem
                primaryText="Sign out"
                onClick={handleSignout}
              />
            </IconMenu>
          </div>
        }
      />
    </div>
  );
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;
