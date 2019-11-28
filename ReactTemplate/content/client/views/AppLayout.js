import React from 'react';
import PropTypes from 'prop-types';
import dotnetify from 'dotnetify';
import { ThemeProvider } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import defaultTheme from '../styles/theme-default';
import auth from '../auth';

const shouldSidebarOpen = width => width !== 'sm';

class AppLayout extends React.Component {
  constructor(props) {
    super(props);

    this.vm = dotnetify.react.connect('AppLayout', this, {
      headers: { Authorization: 'Bearer ' + auth.getAccessToken() },
      exceptionHandler: _ => auth.signOut()
    });
    this.vm.onRouteEnter = (path, template) => (template.Target = 'Content');

    this.state = {
      sidebarOpen: shouldSidebarOpen(props.width),
      Menus: []
    };
  }

  componentWillUnmount() {
    this.vm.$destroy();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.width !== this.props.width) this.setState({ sidebarOpen: shouldSidebarOpen(this.props.width) });
  }

  render() {
    let { sidebarOpen, Menus, UserAvatar, UserName } = this.state;
    let userAvatarUrl = UserAvatar ? UserAvatar : null;

    const paddingLeftSidebar = 236;
    const styles = {
      header: { paddingLeft: sidebarOpen ? paddingLeftSidebar : 0 },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: sidebarOpen && this.props.width !== 'sm' ? paddingLeftSidebar : 0
      }
    };

    const handleSidebarToggle = () => this.setState({ sidebarOpen: !this.state.sidebarOpen });

    return (
      <ThemeProvider theme={defaultTheme}>
        <div>
          <Header styles={styles.header} onSidebarToggle={handleSidebarToggle} />
          <Sidebar vm={this.vm} logoTitle="dotNetify" open={sidebarOpen} userAvatarUrl={userAvatarUrl} menus={Menus} username={UserName} />
          <div id="Content" style={styles.container} />
        </div>
      </ThemeProvider>
    );
  }
}

AppLayout.propTypes = {
  userAvatar: PropTypes.string,
  userName: PropTypes.string,
  menus: PropTypes.array,
  width: PropTypes.string
};

export default withWidth()(AppLayout);
