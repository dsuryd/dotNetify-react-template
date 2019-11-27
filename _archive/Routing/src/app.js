module.exports = {
   React: require('react'),
   ReactDOM: require('react-dom'),
   dotnetify: require('dotnetify'),
   RouteLink: require('dotnetify/dist/dotnetify-react.router').RouteLink,
   RouteTarget: require('dotnetify/dist/dotnetify-react.router').RouteTarget,

   MuiThemeProvider: require('material-ui/styles/MuiThemeProvider').default,
   AppBar: require('material-ui/AppBar').default,
   Drawer: require('material-ui/Drawer').default,
   MenuItem: require('material-ui/MenuItem').default,
   Paper: require('material-ui/Paper').default,
   Tabs: require('material-ui/Tabs').Tabs,
   Tab: require('material-ui/Tabs').Tab,

   Index: require('./Index.jsx').default,
   Home: require('./Index.jsx').Home
}

// Export the library modules into global scope for the components that will be loaded on-demand by the router.
Object.assign(window, module.exports);