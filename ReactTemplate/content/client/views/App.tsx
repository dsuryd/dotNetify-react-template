import * as React from 'react';
import LoginPage from './LoginPage';
import AppLayout from './AppLayout';
import auth from '../auth';

export default function App() {
  const [authenticated, setAuthenticated] = React.useState(auth.hasAccessToken());
  const handleAuthenticated = () => setAuthenticated(true);

  return !authenticated ? <LoginPage onAuthenticated={handleAuthenticated} /> : <AppLayout />;
}
