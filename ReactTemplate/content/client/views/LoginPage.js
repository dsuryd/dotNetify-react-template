import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../styles/theme-default';
import auth from "../auth";

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: 'guest', password: 'dotnetify' };
  }

  render() {
    let { user, password, error } = this.state;
    const { onAuthenticated } = this.props;

    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto'
      },
      paper: {
        padding: 20,
        overflow: 'auto'
      },
      loginBtn: {
        float: 'right'
      },
      logo: {
        width: 16,
        height: 16,
        borderRadius: 16,
        backgroundColor: '#92d050',
        marginRight: 6,
        display: 'inline-block'
      },
      text: {
        color: '#333',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        verticalAlign: 'text-bottom'
      },
      error: { color: 'red'}
    };

    const handleLogin = _ => {
      this.setState({error: null});
      auth.signIn(user, password)
        .then(_ => onAuthenticated())
        .catch(error => {
          if (error.message == "400")
            this.setState({ error: "Invalid password" });
          else
            this.setState({ error: error.message });
        });
    }

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>
            <Paper style={styles.paper}>
              <div>
                <span style={styles.logo}></span>
                <span style={styles.text}>dotNetify</span>
              </div>
              <form>
                <TextField
                  hintText="User"
                  floatingLabelText="User"
                  fullWidth={true}
                  value={user}
                  onChange={event => this.setState({ user: event.target.value })}                  
                />
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  fullWidth={true}
                  type="password"
                  value={password}
                  onChange={event => this.setState({ password: event.target.value })}                  
                />
                {error ? <div style={styles.error}>{error}</div> : null}
                <div>
                  <span>
                    <RaisedButton label="Login"
                      onClick={handleLogin}
                      primary={true}
                      style={styles.loginBtn} />
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

LoginPage.propTypes = {
  onAuthenticated: PropTypes.func
};

export default LoginPage;
