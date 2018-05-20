import * as React from "react";
import dotnetify from "dotnetify";
import LoginPage from "./LoginPage";
import AppLayout from "./AppLayout";
import auth from "../auth";
type State = {
  authenticated: boolean;
};
type Props = {
  children: any;
};
export default class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { authenticated: auth.hasAccessToken() };
  }

  render(): JSX.Element {
    const handleAuthenticated = () => this.setState({ authenticated: true });
    return !this.state.authenticated ? <LoginPage onAuthenticated={handleAuthenticated} /> : <AppLayout />;
  }
}
