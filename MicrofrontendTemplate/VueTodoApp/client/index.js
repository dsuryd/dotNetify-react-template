import Vue from 'vue';
import vueCustomElement from 'vue-custom-element';
import TodoList from './components/TodoList.vue';

const elementName = 'vue-todo-app';

Vue.use(vueCustomElement);
Vue.customElement(elementName, TodoList, {
  shadow: false, // Don't use shadow-DOM so global css can affect the inner Vue component.
  destroyTimeout: 1 // Immediately destroy the Vue component when the custom element is detached.
});

export default document.createElement(elementName);
