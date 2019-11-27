"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page1 = (function (_React$Component) {
   _inherits(Page1, _React$Component);

   function Page1(props) {
      _classCallCheck(this, Page1);

      _get(Object.getPrototypeOf(Page1.prototype), "constructor", this).call(this, props);
      this.vm = dotnetify.react.connect("Page1", this);
      this.vm.onRouteEnter = function (path, template) {
         return template.Target = "Page1Panel";
      };
      this.state = dotnetify.react.router.ssrState("Page1") || { Title: "", RoutingState: { Active: "" } };
   }

   _createClass(Page1, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
         ReactDOM.unmountComponentAtNode(this.page1Panel.getDOMNode());
         this.vm.$destroy();
      }
   }, {
      key: "render",
      value: function render() {
         var _this = this;

         var styles = {
            paper: { margin: "30px" },
            panel: { padding: "30px" },
            link: { padding: "10px", color: "white" }
         };
         var activeTab = this.state.RoutingState.Active;
         return React.createElement(
            MuiThemeProvider,
            null,
            React.createElement(
               "div",
               null,
               React.createElement(AppBar, { title: this.state.Title, showMenuIconButton: false }),
               React.createElement(
                  Paper,
                  { style: styles.paper },
                  React.createElement(
                     Tabs,
                     { value: activeTab != "" ? activeTab : "Page1A" },
                     React.createElement(Tab, { label: React.createElement(
                           RouteLink,
                           { vm: this.vm, route: this.state.LinkPage1A, style: styles.link },
                           "Page 1A"
                        ), value: "Page1A" }),
                     React.createElement(Tab, { label: React.createElement(
                           RouteLink,
                           { vm: this.vm, route: this.state.LinkPage1B, style: styles.link },
                           "Page 1B"
                        ), value: "Page1B" })
                  ),
                  React.createElement(RouteTarget, { id: "Page1Panel", style: styles.panel, ref: function (el) {
                        return _this.page1Panel = el;
                     } })
               )
            )
         );
      }
   }]);

   return Page1;
})(React.Component);

var Page1A = (function (_React$Component2) {
   _inherits(Page1A, _React$Component2);

   function Page1A() {
      _classCallCheck(this, Page1A);

      _get(Object.getPrototypeOf(Page1A.prototype), "constructor", this).apply(this, arguments);
   }

   _createClass(Page1A, [{
      key: "render",
      value: function render() {
         return React.createElement(
            "div",
            null,
            React.createElement(
               "h3",
               null,
               "This is the content of Page 1A"
            ),
            React.createElement(
               "p",
               null,
               "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            )
         );
      }
   }]);

   return Page1A;
})(React.Component);

var Page1B = (function (_React$Component3) {
   _inherits(Page1B, _React$Component3);

   function Page1B() {
      _classCallCheck(this, Page1B);

      _get(Object.getPrototypeOf(Page1B.prototype), "constructor", this).apply(this, arguments);
   }

   _createClass(Page1B, [{
      key: "render",
      value: function render() {
         return React.createElement(
            "div",
            null,
            React.createElement(
               "h3",
               null,
               "This is the content of Page 1B"
            ),
            React.createElement(
               "p",
               null,
               "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
            )
         );
      }
   }]);

   return Page1B;
})(React.Component);

if (typeof module !== "undefined") {
   module.exports.Page1 = Page1;
   module.exports.Page1A = Page1A;
   module.exports.Page1B = Page1B;
}

