'use strict';

Object.defineProperty(exports, '__esModule', {
   value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dotnetify = require('dotnetify');

var _dotnetify2 = _interopRequireDefault(_dotnetify);

var _dotnetifyDistDotnetifyReactRouter = require('dotnetify/dist/dotnetify-react.router');

var Index = (function (_React$Component) {
   _inherits(Index, _React$Component);

   function Index(props) {
      _classCallCheck(this, Index);

      _get(Object.getPrototypeOf(Index.prototype), 'constructor', this).call(this, props);
      this.vm = _dotnetify2['default'].react.connect("Index", this);
      this.vm.onRouteEnter = function (path, template) {
         template.Target = "ApplicationMonitor";
      };
      this.state = { Links: undefined };
   }

   _createClass(Index, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
         this.vm.$destroy();
      }
   }, {
      key: 'render',
      value: function render() {
         var _this = this;

         if (this.state.Links == null) return _react2['default'].createElement('div', null);
         var apps = this.state.Links.map(function (app) {
            return _react2['default'].createElement(
               _dotnetifyDistDotnetifyReactRouter.RouteLink,
               { vm: _this.vm, route: app.Route, key: app.Title },
               _react2['default'].createElement(
                  'div',
                  { key: "div" + app.Title, className: 'book col-md-3' },
                  _react2['default'].createElement(
                     'strong',
                     null,
                     app.Title
                  )
               )
            );
         });
         return _react2['default'].createElement(
            'div',
            { className: 'row' },
            apps,
            _react2['default'].createElement('div', { id: 'ApplicationMonitor' })
         );
      }
   }]);

   return Index;
})(_react2['default'].Component);

exports['default'] = Index;

var Home = (function (_React$Component2) {
   _inherits(Home, _React$Component2);

   function Home() {
      _classCallCheck(this, Home);

      _get(Object.getPrototypeOf(Home.prototype), 'constructor', this).apply(this, arguments);
   }

   _createClass(Home, [{
      key: 'render',
      value: function render() {
         return _react2['default'].createElement(
            MuiThemeProvider,
            null,
            _react2['default'].createElement(AppBar, { title: 'Home', showMenuIconButton: false })
         );
      }
   }]);

   return Home;
})(_react2['default'].Component);

exports.Home = Home;

