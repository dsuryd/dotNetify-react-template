import { useState } from 'react';
import { signIn } from '../auth';
import { Alert, Button, Form, Panel, PasswordField, TextField, VMContext, withTheme } from 'dotnetify-elements';

const outerPanelCss = `
  width: 25rem;
  padding: 3rem; 
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 20px 40px -20px rgba(0,0,0,.5);
`;

const Login = ({ onAuthenticated }) => {
  const [ loginError, setLoginError ] = useState();

  const handleLogin = ({ User, Password }) => {
    setLoginError(null);
    signIn(User, Password)
      .then(_ => {
        onAuthenticated();
      })
      .catch(error => {
        if (error.message == '401') setLoginError('Invalid username and/or password');
        else setLoginError(`Unexpected error: ${error.message}`);
      });
  };

  return (
    <VMContext vm="LoginVM" options={{ appId: 'portal' }}>
      <Panel css={outerPanelCss}>
        <h3>Sign In To Get Started</h3>
        <Form onSubmit={handleLogin}>
          <Panel>
            <TextField id="User" label="Username:" />
            <PasswordField id="Password" label="Password:" />
            <Alert danger>{loginError}</Alert>
            <Button stretch submit enable={true} label="Sign In" css="margin-top: 1rem" />
          </Panel>
        </Form>
      </Panel>
    </VMContext>
  );
};

window.LoginVM = {
  onConnect() {
    return {
      User: 'guest',
      User__validation: [
        {
          Type: 'Required',
          Message: 'Username is required',
          Category: 'Error'
        }
      ],
      Password: '',
      Password__attr: { Placeholder: 'Type dotnetify' },
      Password__validation: [
        {
          Type: 'Required',
          Message: 'Password is required',
          Category: 'Error'
        }
      ]
    };
  }
};

export default withTheme(Login);
