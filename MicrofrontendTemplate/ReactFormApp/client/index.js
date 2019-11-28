import { createWebComponent } from 'dotnetify-elements/web-components/core';
import Form from './components/Form';

const elementName = 'react-form-app';
createWebComponent(Form, elementName);

export default document.createElement(elementName);
