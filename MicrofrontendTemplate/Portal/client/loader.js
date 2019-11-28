import dotnetify from 'dotnetify';
import { getAccessToken } from './auth';
import { updatePortal } from './components/Portal';

//dotnetify.debug = true;

export default (apps, externalDeps) => {
  // Intercept initial view model connection to override which hub server it should connect with.
  // ***IMPORTANT***: Each app module would need to set the 'appId' option on its VM connect.
  //                  For example: dotnetify.react.connect("MyVM", { appId: 'my-app' })
  dotnetify.connectHandler = vmConnectArgs => {
    const appId = vmConnectArgs.options && vmConnectArgs.options.appId;
    if (!appId) {
      console.error(`'${vmConnectArgs.vmId}' needs 'appId' option to participate in the Portal.`);
      return;
    }

    const app = apps.find(x => x.id === appId);
    if (app) {
      app.hub = app.hub || dotnetify.createHub(app.baseUrl);
      return {
        ...vmConnectArgs,
        hub: app.hub,
        options: { ...vmConnectArgs.options, headers: { Authorization: 'Bearer ' + getAccessToken() } }
      };
    }
  };

  // Register the external dependencies from the script tags to SystemJS.
  externalDeps.forEach(x => SystemJS.set(x, SystemJS.newModule({ ...window[x] })));

  // Use SystemJS to import the app modules.
  function importApp(app) {
    const appUrl = app.baseUrl + app.moduleUrl;
    return SystemJS.import(appUrl)
      .then(module => {
        if (module.default) updatePortal({ ...app, rootComponent: module.default });
      })
      .catch(err => {
        SystemJS.delete(appUrl);
        console.error(`${err}. Retrying in 5 seconds...`);
        setTimeout(() => importApp(app), 5000);
      });
  }

  apps.map(app => importApp(app));
};
