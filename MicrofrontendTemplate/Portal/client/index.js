import { createWebComponent } from 'dotnetify-elements/web-components/core';
import loader from './loader';
import App from './components/App';

let useApiGateway = process.env.NODE_ENV !== 'development';

loader(
  [
    {
      id: 'react-dashboard-app',
      label: 'React Dashboard',
      routePath: 'dashboard',
      baseUrl: useApiGateway ? 'http://localhost:8080/app1' : 'http://localhost:5060',
      moduleUrl: '/dist/app.js'
    },
    {
      id: 'react-form-app',
      label: 'React Form',
      routePath: 'form',
      baseUrl: useApiGateway ? 'http://localhost:8080/app2' : 'http://localhost:5070',
      moduleUrl: '/dist/app.js'
    },
    {
      id: 'react-todo-app',
      label: 'React Todo',
      routePath: 'react-todo',
      baseUrl: useApiGateway ? 'http://localhost:8080/app3' : 'http://localhost:5010',
      moduleUrl: '/dist/app.js'
    },
    {
      id: 'vue-todo-app',
      label: 'Vue Todo',
      routePath: 'vue-todo',
      baseUrl: useApiGateway ? 'http://localhost:8080/app4' : 'http://localhost:5020',
      moduleUrl: '/dist/app.js'
    }
  ],
  // External dependencies from script tags.
  [ 'dotnetify', 'dotNetifyElements', 'styled' ]
);

createWebComponent(App, 'my-portal');
