import * as React from 'react';
import dotnetify, { IDotnetifyVM } from 'dotnetify';
import { ThemeProvider } from '@material-ui/core/styles';
import { CloudDownload, CloudUpload, NetworkCheck, Face } from '@material-ui/icons';
import cyan from '@material-ui/core/colors/cyan';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import orange from '@material-ui/core/colors/orange';
import InfoBox from '../components/dashboard/InfoBox';
import Traffic from '../components/dashboard/Traffic';
import ServerUsage from '../components/dashboard/ServerUsage';
import Utilization from '../components/dashboard/Utilization';
import RecentActivities, { ActivityModel } from '../components/dashboard/RecentActivities';
import globalStyles from '../styles/styles';
import defaultTheme from '../styles/theme-default';
import auth from '../auth';

class DashboardModel {
  Download: string;
  Upload: string;
  Latency: string;
  Users: number;
  Traffic: number[] = [];
  ServerUsage: number[] = [];
  ServerUsageLabel: string[] = [];
  Utilization: number[] = [];
  UtilizationLabel: string[] = [];
  RecentActivities: ActivityModel[] = [];
}

export default class Dashboard extends React.Component<any, DashboardModel> {
  vm: IDotnetifyVM;
  state: DashboardModel = new DashboardModel();
  dispatch: (state: DashboardModel) => void;

  constructor(props: any) {
    super(props);
    this.vm = dotnetify.react.connect('Dashboard', this, {
      exceptionHandler: ex => {
        alert(ex.message);
        auth.signOut();
      },
    });
    this.dispatch = state => this.vm.$dispatch(state);
  }

  componentWillUnmount() {
    this.vm.$destroy();
  }

  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <div>
          <h3 style={globalStyles.navigation}>Application / Dashboard</h3>

          <div className='row'>
            <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 '>
              <InfoBox icon={CloudDownload} color={pink[600]} title='Download' value={this.state.Download} />
            </div>

            <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 '>
              <InfoBox icon={CloudUpload} color={cyan[600]} title='Upload' value={this.state.Upload} />
            </div>

            <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 '>
              <InfoBox icon={NetworkCheck} color={purple[600]} title='Latency' value={this.state.Latency} />
            </div>

            <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 '>
              <InfoBox icon={Face} color={orange[600]} title='Users' value={this.state.Users} />
            </div>
          </div>

          <div className='row'>
            <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15'>
              <Traffic data={this.state.Traffic} />
            </div>

            <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15'>
              <ServerUsage data={this.state.ServerUsage} labels={this.state.ServerUsageLabel} />
            </div>
          </div>

          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 '>
              <RecentActivities vm={this.vm} data={this.state.RecentActivities} />
            </div>

            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 '>
              <Utilization data={this.state.Utilization} labels={this.state.UtilizationLabel} />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
