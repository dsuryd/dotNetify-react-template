class Page2 extends React.Component {
   constructor(props) {
      super(props);
      this.vm = dotnetify.react.connect("Page2", this);
      this.vm.onRouteEnter = (path, template) => {
         template.Target = "Page2Panel";

         // Must dismount existing component on RouteTarget before mounting a new one.
         if (this.page2Panel && this.page2PanelHasComponent) {
            ReactDOM.unmountComponentAtNode(this.page2Panel.getDOMNode());
            this.setState({ open: false });
         }
         this.page2PanelHasComponent = true;
      }
      this.vm.onRouteExit = (path, template) => {
         if (template.Id == "Page2Item")
            this.setState({ open: true });
      }
      this.state = dotnetify.react.router.ssrState("Page2") || { Title: "" };
      this.state.open = false;
   }
   componentWillUnmount() {
      ReactDOM.unmountComponentAtNode(this.page2Panel.getDOMNode());
      this.vm.$destroy();
   }
   render() {
      const styles = {
         paper: { margin: "30px", width: "100px", display: "inline-block" },
         panel: { padding: "30px" }
      }
      const showRoutes = links => {
         if (links != null)
            return (
               links.map(link =>
                  <Paper key={link.Route.Path} style={styles.paper}>
                     <RouteLink vm={this.vm} route={link.Route}>
                        <MenuItem>{link.Title}</MenuItem>
                     </RouteLink>
                  </Paper>
               )
            );
      }
      return (
         <MuiThemeProvider>
            <div>
               <AppBar title={this.state.Title} showMenuIconButton={false} />
               <div style={{ marginRight: "280px" }}>
                  {showRoutes(this.state.Links)}
               </div>
               <Drawer openSecondary={true} open={this.state.open} style={{ visibility: this.state.open ? "visible" : "hidden" }}>
                  <RouteTarget id="Page2Panel" style={styles.panel} ref={el => this.page2Panel = el} />
               </Drawer>
            </div>
         </MuiThemeProvider>
      );
   }
}

var Page2Home = function (props) {
   return <div />
}

class Page2Item extends React.Component {
   constructor(props) {
      super(props);
      this.vm = dotnetify.react.connect("Page2Item", this);
      this.state = dotnetify.react.router.ssrState("Page2Item") || { Title: "Item" };
   }
   componentWillUnmount() {
      this.vm.$destroy();
   }
   render() {
      return (
         <div>
            <h3>{this.state.Title}</h3>
            <p style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
         </div>
      );
   }
}

if (typeof module !== "undefined") {
   module.exports.Page2 = Page2;
   module.exports.Page2Home = Page2Home;
   module.exports.Page2Item = Page2Item;
}