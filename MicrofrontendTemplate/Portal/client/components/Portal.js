import {
  Main,
  Header,
  Nav,
  NavDrawerButton,
  NavMenu,
  NavMenuTarget,
  Button,
  Panel,
  Section,
  VMContext,
  withTheme
} from 'dotnetify-elements';
import { CompanyLogo } from './App';
import { signOut } from '../auth';

const Portal = _ => (
  <VMContext vm="PortalVM" options={{ appId: 'portal-app' }}>
    <Main>
      <Header>
        <NavDrawerButton css="margin-left: .5rem" />
        <CompanyLogo href="https://dotnetify.net" />
      </Header>
      <Nav>
        <Panel>
          <NavMenu id="NavMenu" />
          <Panel flex bottom padding="1rem">
            <Button stretch label="Logout" onClick={_ => signOut()} />
          </Panel>
        </Panel>
      </Nav>
      <Section>
        <NavMenuTarget />
      </Section>
    </Main>
  </VMContext>
);

window.PortalVM = new class {
  apps = [];
  initialState = { NavMenu: [] };

  onConnect() {
    return this.initialState;
  }

  addApp(newApp) {
    if (this.apps.find(x => x.id === newApp.id)) return;

    this.apps.push(newApp);

    // Set the root component to global window variable to be discovered by dotNetify routing.
    // Note that the component can be React component, Vue component, or web component.
    window[newApp.id] = newApp.rootComponent;

    const homeTemplate = this.apps.length > 0 ? { Id: 'Home', UrlPattern: '', ViewUrl: this.apps[0].id } : {};
    const templates = this.apps.map(app => ({ Id: app.id, UrlPattern: app.routePath, ViewUrl: app.id }));
    const NavMenu = this.apps.map(app => ({ Route: { TemplateId: app.id, Path: app.routePath }, Label: app.label }));
    const state = {
      RoutingState: {
        Templates: [ homeTemplate, ...templates ],
        Root: '/'
      },
      NavMenu
    };

    if (this.$pushUpdate) this.$pushUpdate(state);
    else this.initialState = state;
  }
}();

export function updatePortal(app) {
  window.PortalVM.addApp(app);
}
export default withTheme(Portal);
