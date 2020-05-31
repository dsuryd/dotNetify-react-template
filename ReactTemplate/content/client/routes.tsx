import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import Dashboard from './views/Dashboard';
import FormPage from './views/FormPage';
import TablePage from './views/TablePage';

// Import all the routeable views into the global window variable.
Object.assign(window, {
  Dashboard,
  FormPage,
  TablePage
});

// Hot module replacement.
if (module.hot) {
  const render = (react: any, elemId: string) => {
    ReactDOM.unmountComponentAtNode(document.getElementById(elemId));
    ReactDOM.render(React.createElement(react), document.getElementById(elemId));
  };

  module.hot.accept(['./views/App.tsx'], _ => render(require('views/App').default, 'App'));
  module.hot.accept(['./views/Dashboard.tsx'], _ => render(require('views/Dashboard').default, 'Content'));
  module.hot.accept(['./views/FormPage.tsx'], _ => render(require('views/FormPage').default, 'Content'));
  module.hot.accept(['./views/TablePage.tsx'], _ => render(require('views/TablePage').default, 'Content'));
}

export default App;
