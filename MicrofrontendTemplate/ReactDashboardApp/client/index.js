import { createWebComponent } from 'dotnetify-elements/web-components/core';
import Dashboard from './components/Dashboard';

const elementName = 'react-dashboard-app';
createWebComponent(Dashboard, elementName);

export default document.createElement(elementName);
