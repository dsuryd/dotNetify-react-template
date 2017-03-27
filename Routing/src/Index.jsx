import React from 'react';
import dotnetify from 'dotnetify';
import { RouteLink, RouteTarget } from 'dotnetify/dist/dotnetify-react.router'

export default class Index extends React.Component {
   constructor(props) {
      super(props);
      this.vm = dotnetify.react.connect("Index", this);
      this.vm.onRouteEnter = (path, template) => template.Target = "Panel";

      this.state = dotnetify.react.router.ssrState("Index") || { Links: []};
    }
   componentWillUnmount() {
      this.vm.$destroy();
   }
   render() {
      console.log(this.state.Links);
      const links = this.state.Links.map((link, idx) => 
         <MenuItem key={idx}><RouteLink vm={this.vm} route={link.Route}>{link.Title}</RouteLink></MenuItem>
         );
      return (
         <MuiThemeProvider>
            <div>
               <Drawer open={true}>
                  {links}
               </Drawer>
               <RouteTarget id="Panel" style={{ paddingLeft: "256px" }} />
            </div>
         </MuiThemeProvider>
      );
   }
}

export class Home extends React.Component {
   render() {
      return (
         <MuiThemeProvider>
            <AppBar title="Home" showMenuIconButton={false} />
         </MuiThemeProvider>
      );
   }
}