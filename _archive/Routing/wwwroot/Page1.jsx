class Page1 extends React.Component {
   constructor(props) {
      super(props);
      this.vm = dotnetify.react.connect("Page1", this);
      this.vm.onRouteEnter = (path, template) => template.Target = "Page1Panel";
      this.state = dotnetify.react.router.ssrState("Page1") || { Title: "", RoutingState: { Active: "" } };
   }
   componentWillUnmount() {
      ReactDOM.unmountComponentAtNode(this.page1Panel.getDOMNode());
      this.vm.$destroy();
   }
   render() {
      const styles = {
         paper: { margin: "30px" },
         panel: { padding: "30px" },
         link: { padding: "10px", color: "white" }
      }
      const activeTab = this.state.RoutingState.Active;
      return (
         <MuiThemeProvider>
            <div>
               <AppBar title={this.state.Title} showMenuIconButton={false} />
               <Paper style={styles.paper}>
                  <Tabs value={activeTab != "" ? activeTab : "Page1A"}>
                     <Tab label={<RouteLink vm={this.vm} route={this.state.LinkPage1A} style={styles.link}>Page 1A</RouteLink>} value="Page1A" />
                     <Tab label={<RouteLink vm={this.vm} route={this.state.LinkPage1B} style={styles.link}>Page 1B</RouteLink>} value="Page1B" />
                  </Tabs>
                  <RouteTarget id="Page1Panel" style={styles.panel} ref={el => this.page1Panel = el} />
               </Paper>
            </div>
         </MuiThemeProvider>
      );
   }
}

class Page1A extends React.Component {
   render() {
      return (
         <div>
            <h3>This is the content of Page 1A</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
         </div>
      );
   }
}

class Page1B extends React.Component {
   render() {
      return (
         <div>
            <h3>This is the content of Page 1B</h3>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
         </div>
      );
   }
}

if (typeof module !== "undefined") {
   module.exports.Page1 = Page1;
   module.exports.Page1A = Page1A;
   module.exports.Page1B = Page1B;
}