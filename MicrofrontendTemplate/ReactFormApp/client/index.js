import { createWebComponent } from 'dotnetify-elements/web-components/Core';
import Form from './components/Form';

const elementName = 'react-form-app';
createWebComponent(Form, elementName);

export default document.createElement(elementName);
