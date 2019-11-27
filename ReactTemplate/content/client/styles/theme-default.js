import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue600, grey900 } from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {},
  appBar: {
    height: 57,
    color: blue600
  },
  drawer: {
    width: 230,
    color: grey900
  },
  raisedButton: {
    primaryColor: blue600
  }
});

export default themeDefault;

// import { blue, grey } from '@material-ui/core/colors';
// import { createMuiTheme } from '@material-ui/core/styles';

// const themeDefault = createMuiTheme({
//   palette: {},
//   appBar: {
//     height: 57,
//     color: blue[600]
//   },
//   drawer: {
//     width: 230,
//     color: grey[900]
//   },
//   raisedButton: {
//     primaryColor: blue[600]
//   }
// });

// export default themeDefault;
