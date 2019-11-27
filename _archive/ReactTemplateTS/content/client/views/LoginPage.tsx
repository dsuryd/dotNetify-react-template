import * as React from "react";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ThemeDefault from "../styles/theme-default";
import auth from "../auth";

type Props = {
  onAuthenticated(): void;
};
type State = {
  user: string;
  password: string;
  error: any;
};
export default class LoginPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { user: "guest", password: "dotnetify", error: null };
  }

  render() {
    let { user, password, error } = this.state;
    const { onAuthenticated } = this.props;

    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: "auto",
        position: "absolute",
        top: "20%",
        left: 0,
        right: 0,
        margin: "auto"
      },
      paper: {
        padding: 20,
        overflow: "auto"
      },
      loginBtn: {
        float: "right"
      },
      logo: {
        width: 16,
        height: 16,
        borderRadius: 16,
        backgroundColor: "#92d050",
        marginRight: 6,
        display: "inline-block"
      },
      text: {
        color: "#333",
        fontWeight: "bold",
        backgroundColor: "transparent",
        verticalAlign: "text-bottom"
      },
      error: { color: "red" }
    } as any;

    const handleLogin = async () => {
      this.setState({ error: null });
      try {
        await auth.signIn(user, password);
        onAuthenticated();
      } catch (error) {
        if (error.message == "400") this.setState({ error: "Invalid password" });
        else this.setState({ error: error.message });
      }
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>
            <Paper style={styles.paper}>
              <div>
                <span style={styles.logo} />
                <span style={styles.text}>dotNetify</span>
              </div>
              <form>
                <TextField
                  hintText="User"
                  floatingLabelText="User"
                  fullWidth={true}
                  value={user}
                  onChange={event => {
                    const target = event.target as HTMLInputElement;
                    this.setState({ user: target.value });
                  }}
                />
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  fullWidth={true}
                  type="password"
                  value={password}
                  onChange={event => {
                    const target = event.target as HTMLInputElement;
                    this.setState({ password: target.value });
                  }}
                />
                {error ? <div style={styles.error}>{error}</div> : null}
                <div>
                  <span>
                    <RaisedButton label="Login" onClick={handleLogin} primary={true} style={styles.loginBtn} />
                  </span>
                </div>
              </form>
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
