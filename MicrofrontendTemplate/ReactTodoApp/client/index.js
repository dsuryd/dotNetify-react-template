import { createWebComponent } from 'dotnetify-elements/web-components/core';
import TodoList from './components/TodoList';

const elementName = 'react-todo-app';
createWebComponent(TodoList, elementName);

export default document.createElement(elementName);
