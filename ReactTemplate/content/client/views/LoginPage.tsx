import * as React from 'react';
import { useState } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import defaultTheme from '../styles/theme-default';
import auth from '../auth';

const useStyles = makeStyles({
  loginContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  paper: {
    padding: 20,
    overflow: 'auto',
  },
  loginBtn: {
    float: 'right',
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 6,
    display: 'inline-block',
  },
  textField: {
    margin: '1rem 0',
  },
  text: {
    color: '#333',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    verticalAlign: 'text-bottom',
  },
  error: { color: 'red' },
});

export interface ILoginPageProps {
  onAuthenticated: () => void;
}

export default function LoginPage({ onAuthenticated }: ILoginPageProps) {
  const [user, setUser] = useState<string>('guest');
  const [password, setPassword] = useState<string>('dotnetify');
  const [error, setError] = useState<string>();

  const handleLogin = () => {
    setError(null);

    auth
      .signIn(user, password)
      .then(() => onAuthenticated())
      .catch(error => setError(error.message === '400' ? 'invalid password' : error.message));
  };

  const classes = useStyles({});

  return (
    <ThemeProvider theme={defaultTheme}>
      <div>
        <div className={classes.loginContainer}>
          <Card className={classes.paper}>
            <div>
              <img src='https://dotnetify.net/content/images/dotnetify-logo-small.png' className={classes.logo} />
              <span className={classes.text}>dotNetify</span>
            </div>
            <form>
              <TextField
                required
                className={classes.textField}
                label='User'
                fullWidth={true}
                value={user}
                onChange={event => setUser(event.target.value)}
              />
              <br />
              <TextField
                required
                className={classes.textField}
                label='Password'
                fullWidth={true}
                type='password'
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
              {error ? <div className={classes.error}>{error}</div> : null}
              <div>
                <span>
                  <Button variant='contained' onClick={handleLogin} color='primary' className={classes.loginBtn}>
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
