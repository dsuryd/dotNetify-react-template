import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/core/styles';
import { DefaultTheme } from '../styles/theme-default';
import auth from '../auth';

const Styles = withStyles({
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
    width: 20,
    height: 20,
    marginRight: 6,
    display: 'inline-block'
  },
  textField: {
    margin: '1rem 0'
  },
  text: {
    color: '#333',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    verticalAlign: 'text-bottom'
  },
  error: { color: 'red' }
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: 'guest', password: 'dotnetify' };
  }

  render() {
    let { user, password, error } = this.state;
    const { classes, onAuthenticated } = this.props;

    const handleLogin = _ => {
      this.setState({ error: null });
      auth.signIn(user, password).then(_ => onAuthenticated()).catch(error => {
        if (error.message == '400') this.setState({ error: 'Invalid password' });
        else this.setState({ error: error.message });
      });
    };

    return (
      <ThemeProvider theme={DefaultTheme}>
        <div>
          <div className={classes.loginContainer}>
            <Card className={classes.paper}>
              <div>
                <img src="https://dotnetify.net/content/images/dotnetify-logo-small.png" className={classes.logo} />
                <span className={classes.text}>dotNetify</span>
              </div>
              <form>
                <TextField
                  required
                  className={classes.textField}
                  label="User"
                  fullWidth={true}
                  value={user}
                  onChange={event => this.setState({ user: event.target.value })}
                />
                <br />
                <TextField
                  required
                  className={classes.textField}
                  label="Password"
                  fullWidth={true}
                  type="password"
                  value={password}
                  onChange={event => this.setState({ password: event.target.value })}
                />
                {error ? <div className={classes.error}>{error}</div> : null}
                <div>
                  <span>
                    <Button variant="contained" onClick={handleLogin} color="primary" className={classes.loginBtn}>
                      Login
                    </Button>
                  </span>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

LoginPage.propTypes = {
  onAuthenticated: PropTypes.func
};

export default Styles(LoginPage);
