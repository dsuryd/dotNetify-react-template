"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page2 = (function (_React$Component) {
   _inherits(Page2, _React$Component);

   function Page2(props) {
      var _this = this;

      _classCallCheck(this, Page2);

      _get(Object.getPrototypeOf(Page2.prototype), "constructor", this).call(this, props);
      this.vm = dotnetify.react.connect("Page2", this);
      this.vm.onRouteEnter = function (path, template) {
         template.Target = "Page2Panel";

         // Must dismount existing component on RouteTarget before mounting a new one.
         if (_this.page2Panel && _this.page2PanelHasComponent) {
            ReactDOM.unmountComponentAtNode(_this.page2Panel.getDOMNode());
            _this.setState({ open: false });
         }
         _this.page2PanelHasComponent = true;
      };
      this.vm.onRouteExit = function (path, template) {
         if (template.Id == "Page2Item") _this.setState({ open: true });
      };
      this.state = dotnetify.react.router.ssrState("Page2") || { Title: "" };
      this.state.open = false;
   }

   _createClass(Page2, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
         ReactDOM.unmountComponentAtNode(this.page2Panel.getDOMNode());
         this.vm.$destroy();
      }
   }, {
      key: "render",
      value: function render() {
         var _this2 = this;

         var styles = {
            paper: { margin: "30px", width: "100px", display: "inline-block" },
            panel: { padding: "30px" }
         };
         var showRoutes = function showRoutes(links) {
            if (links != null) return links.map(function (link) {
               return React.createElement(
                  Paper,
                  { key: link.Route.Path, style: styles.paper },
                  React.createElement(
                     RouteLink,
                     { vm: _this2.vm, route: link.Route },
                     React.createElement(
                        MenuItem,
                        null,
                        link.Title
                     )
                  )
               );
            });
         };
         return React.createElement(
            MuiThemeProvider,
            null,
            React.createElement(
               "div",
               null,
               React.createElement(AppBar, { title: this.state.Title, showMenuIconButton: false }),
               React.createElement(
                  "div",
                  { style: { marginRight: "280px" } },
                  showRoutes(this.state.Links)
               ),
               React.createElement(
                  Drawer,
                  { openSecondary: true, open: this.state.open, style: { visibility: this.state.open ? "visible" : "hidden" } },
                  React.createElement(RouteTarget, { id: "Page2Panel", style: styles.panel, ref: function (el) {
                        return _this2.page2Panel = el;
                     } })
               )
            )
         );
      }
   }]);

   return Page2;
})(React.Component);

var Page2Home = function Page2Home(props) {
   return React.createElement("div", null);
};

var Page2Item = (function (_React$Component2) {
   _inherits(Page2Item, _React$Component2);

   function Page2Item(props) {
      _classCallCheck(this, Page2Item);

      _get(Object.getPrototypeOf(Page2Item.prototype), "constructor", this).call(this, props);
      this.vm = dotnetify.react.connect("Page2Item", this);
      this.state = dotnetify.react.router.ssrState("Page2Item") || { Title: "Item" };
   }

   _createClass(Page2Item, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
         this.vm.$destroy();
      }
   }, {
      key: "render",
      value: function render() {
         return React.createElement(
            "div",
            null,
            React.createElement(
               "h3",
               null,
               this.state.Title
            ),
            React.createElement(
               "p",
               { style: { textAlign: "justify" } },
               "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            )
         );
      }
   }]);

   return Page2Item;
})(React.Component);

if (typeof module !== "undefined") {
   module.exports.Page2 = Page2;
   module.exports.Page2Home = Page2Home;
   module.exports.Page2Item = Page2Item;
}

