import * as React from "react";
import dotnetify, { dotnetifyVM } from "dotnetify";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import withWidth, { LARGE, SMALL } from "material-ui/utils/withWidth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ThemeDefault from "../styles/theme-default";
import auth from "../auth";

type State = {};
type Props = {
  userAvatar: string;
  userName: string;
  menus: Array<any>;
  width: number;
};
export default class AppLayout extends React.Component<any, any> {
  vm: dotnetifyVM;
  constructor(props) {
    super(props);

    this.vm = dotnetify.react.connect("AppLayout", this, {
      headers: { Authorization: "Bearer " + auth.getAccessToken() },
      exceptionHandler: _ => auth.signOut()
    });
    this.vm.onRouteEnter = (path, template) => (template.Target = "Content");

    this.state = {
      sidebarOpen: props.width === LARGE,
      Menus: []
    };
  }

  componentWillUnmount() {
    this.vm.$destroy();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({ sidebarOpen: nextProps.width === LARGE });
    }
  }

  render() {
    let { sidebarOpen, Menus, UserAvatar, UserName } = this.state;
    let userAvatarUrl = UserAvatar ? UserAvatar : null;

    const paddingLeftSidebar = 236;
    const styles = {
      header: { paddingLeft: sidebarOpen ? paddingLeftSidebar : 0 },
      container: {
        margin: "80px 20px 20px 15px",
        paddingLeft: sidebarOpen && this.props.width !== SMALL ? paddingLeftSidebar : 0
      }
    };

    const handleSidebarToggle = () => this.setState({ sidebarOpen: !this.state.sidebarOpen });

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header styles={styles.header} onSidebarToggle={handleSidebarToggle} />
          <Sidebar vm={this.vm} logoTitle="dotNetify" open={sidebarOpen} userAvatarUrl={userAvatarUrl} menus={Menus} username={UserName} />
          <div id="Content" style={styles.container} />
        </div>
      </MuiThemeProvider>
    );
  }
}

//export default withWidth()(AppLayout);
