import React from 'react';
import dotnetify from 'dotnetify';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DownloadIcon from 'material-ui/svg-icons/file/cloud-download';
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload';
import LatencyIcon from 'material-ui/svg-icons/notification/network-check';
import UserIcon from 'material-ui/svg-icons/action/face';
import { cyan600, pink600, purple600, orange600 } from 'material-ui/styles/colors';
import InfoBox from '../components/dashboard/InfoBox';
import Traffic from '../components/dashboard/Traffic';
import ServerUsage from '../components/dashboard/ServerUsage';
import Utilization from '../components/dashboard/Utilization';
import RecentActivities from '../components/dashboard/RecentActivities';
import globalStyles from '../styles/styles';
import ThemeDefault from '../styles/theme-default';
import auth from '../auth';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.vm = dotnetify.react.connect("Dashboard", this, {
      exceptionHandler: ex => {
         alert(ex.message);
         auth.signOut();
      }
    });
    this.dispatch = state => this.vm.$dispatch(state);

    this.state = {
      Traffic: [],
      ServerUsage: [],
      ServerUsageLabel: [],
      Utilization: [],
      UtilizationLabel: [],
      RecentActivities: []
    };
  }

  componentWillUnmount() {
    this.vm.$destroy();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <h3 style={globalStyles.navigation}>Application / Dashboard</h3>

          <div className="row">

            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
              <InfoBox Icon={DownloadIcon}
                color={pink600}
                title="Download"
                value={this.state.Download}
              />
            </div>


            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
              <InfoBox Icon={UploadIcon}
                color={cyan600}
                title="Upload"
                value={this.state.Upload}
              />
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
              <InfoBox Icon={LatencyIcon}
                color={purple600}
                title="Latency"
                value={this.state.Latency}
              />
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
              <InfoBox Icon={UserIcon}
                color={orange600}
                title="Users"
                value={this.state.Users}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
              <Traffic data={this.state.Traffic} />
            </div>

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15">
              <ServerUsage data={this.state.ServerUsage} label={this.state.ServerUsageLabel} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
              <RecentActivities vm={this.vm} data={this.state.RecentActivities} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
              <Utilization data={this.state.Utilization} label={this.state.UtilizationLabel} />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Dashboard;
