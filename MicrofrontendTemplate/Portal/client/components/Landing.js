import { Main, Header, Alert, Panel, Section, withTheme } from 'dotnetify-elements';
import { CompanyLogo } from './App';
import Login from './Login';

const imagePanelCss = `
  position: relative;
  margin-bottom: 6rem;
  img { width: 100vw; height: 400px; }
  a {
    position: relative;
    color: #fff;
    font-size: 8pt;
    float: right;
    margin-top: -1rem;
    padding-right: .5rem;
  }
`;

const Landing = ({ onLoggedIn }) => (
  <Main>
    <Header>
      <CompanyLogo href="https://dotnetify.net" />
    </Header>
    <Section>
      {/* 
      Why using Panel instead pf div? Think of Panels as super-divs: flex by default, automatically 
      add gaps between child elements, support scss-like syntax for nesting styles, and support many
      shorthands to make manipulating layout easier!
       */}
      <Panel>
        <Panel css={imagePanelCss}>
          <div>
            <img src="/landing.jpg" />
            <a href="https://www.freepik.com/free-photos-vectors/background">Background photo created by kjpargeter - www.freepik.com </a>
          </div>
          <Panel horizontal css="position: absolute; top: 2rem">
            <Panel right css="padding: 0 5%">
              <Login onAuthenticated={onLoggedIn} />
            </Panel>
            <Panel css="padding-right: 10%">
              <h3>Welcome to your homepage!</h3>
              <Alert success>
                <h5>Getting Started</h5>
                To sign in, enter username <b>guest</b> with password <b>dotnetify</b>.
              </Alert>
              <Alert>
                <h5>Micro-Frontend Demo</h5>
                This is an SPA that's dynamically composed of smaller, independently deployable apps written in <i>React</i> and <i>Vue</i>;
                each communicates with a cross-platform <i>.NET Core (C#)</i> back-end, using <i>SignalR</i> to facilitate real-time update.
              </Alert>
            </Panel>
          </Panel>
        </Panel>
        <Panel horizontal>
          <Panel right flex="20%">
            <h4>About</h4>
          </Panel>
          <Panel flex="80%" css="padding-right: 10%; > * { padding: 2rem; border-left: 4px solid orange }">
            <div>
              <p>
                <i>DotNetify</i> glues all these together with simple, lightweight, yet powerful abstractions that make developing complex
                web applications a breeze! For documentation, visit{' '}
                <b>
                  <a href="https://dotnetify.net">https://dotnetify.net</a>
                </b>
              </p>
              <p>
                Like this project? Leave a star on{' '}
                <b>
                  <a href="https://github.com/dsuryd/dotNetify">the project's Github page</a>
                </b>
                . Use the issues forum to ask questions, report bugs, or suggest new features.
              </p>
            </div>
          </Panel>
        </Panel>
      </Panel>
    </Section>
  </Main>
);

export default withTheme(Landing);
