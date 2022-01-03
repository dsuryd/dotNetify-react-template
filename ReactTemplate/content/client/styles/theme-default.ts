import { blue, pink, grey } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";

export const defaultTheme = createTheme({
  palette: {
    primary: blue,
    secondary: pink
  },
  // @ts-ignore
  appBar: {
    height: 57,
    color: blue[600]
  },
  drawer: {
    width: 230,
    color: grey[900]
  },
  raisedButton: {
    primaryColor: blue[600]
  }
});

export default defaultTheme;
