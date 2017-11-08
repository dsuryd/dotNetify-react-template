import React from 'react';
import { RouteLink } from 'dotnetify/dist/dotnetify-react.router';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { grey400, cyan600, white } from 'material-ui/styles/colors';
import { typography } from 'material-ui/styles';
import Wallpaper from 'material-ui/svg-icons/device/wallpaper';

const RecentActivities = (props) => {

  const styles = {
    subheader: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      backgroundColor: cyan600,
      color: white
    }
  };

  const iconButtonElement = (
    <IconButton
      touch={true}
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={grey400} />
    </IconButton>
  );

  const handleMenuClick = route => props.vm.$routeTo(route);

  return (
    <Paper>
      <List>
        <Subheader style={styles.subheader}>Recent Activities</Subheader>
        {props.data.map((item, idx) =>
          <div key={idx}>
            <ListItem
              leftAvatar={<Avatar icon={<Wallpaper />} />}
              primaryText={item.PersonName}
              secondaryText={item.Status}
              rightIconButton={
                <IconMenu iconButtonElement={iconButtonElement}>
                  <MenuItem onClick={_ => handleMenuClick(item.Route)}>View</MenuItem>
                </IconMenu>
              }
            />
            <Divider inset={true} />
          </div>
        )}
      </List>
    </Paper>
  );
};

RecentActivities.propTypes = {
  data: PropTypes.array
};

export default RecentActivities;
