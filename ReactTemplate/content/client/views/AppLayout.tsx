import React from 'react';
import dotnetify, { IDotnetifyVM, RouteTarget } from 'dotnetify';
import { ThemeProvider } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import defaultTheme from '../styles/theme-default';
import auth from '../auth';

const shouldSidebarOpen = (width: string) => width !== 'sm';

class AppLayoutModel {
  UserAvatar: string;
  UserName: string;
  Menus: any[] = [];
  sidebarOpen: boolean;
}

export interface IAppLayoutProps {
  width: string;
}

class AppLayout extends React.Component<IAppLayoutProps, AppLayoutModel> {
  vm: IDotnetifyVM;
  state: AppLayoutModel = new AppLayoutModel();

  constructor(props: IAppLayoutProps) {
    super(props);

    this.vm = dotnetify.react.connect('AppLayout', this, {
      headers: { Authorization: 'Bearer ' + auth.getAccessToken() },
      exceptionHandler: _ => auth.signOut(),
      onRouteEnter: (path, template) => {
        template.Target = 'Content';
      }
    });

    this.state.sidebarOpen = shouldSidebarOpen(props.width);
  }

  componentWillUnmount() {
    this.vm.$destroy();
  }

  componentDidUpdate(prevProps: IAppLayoutProps) {
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
          <Sidebar vm={this.vm} logoTitle='dotNetify' open={sidebarOpen} userAvatarUrl={userAvatarUrl} menus={Menus} userName={UserName} />
          <RouteTarget id='Content' style={styles.container} />
        </div>
      </ThemeProvider>
    );
  }
}

export default withWidth()(AppLayout);
