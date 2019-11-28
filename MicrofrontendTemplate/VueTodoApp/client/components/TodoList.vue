<template>
  <h4 v-if="error">{{error.message}}</h4>
  <d-frame v-else middle="true" css="width: calc(100% - 3rem)">
    <h2>
      <img src="https://www.dotnetify.net/content/images/vuelogo.png" width="45px" height="45px" />
      <span>Multicast Todo List</span>
    </h2>

    <d-panel css="width: 50%; padding-top: 1rem">
      <d-text-field
        placeholder="What do you want to do?"
        @onDone="addTodo"
        @onInputRef="setTodoRef($event)"
      />
      <div>
        <d-panel
          v-for="todo in Todos"
          :key="todo.Id"
          css="padding: 0; border: 1px solid #ddd"
          tabindex="0"
        >
          <d-panel
            v-if="todo.Id !== editTodoId"
            horizontal="true"
            apart="true"
            middle="true"
            padding=".5rem"
          >
            <d-panel @dblclick="startEditTodo(todo)">
              <d-checkbox :label="todo.Text" :value="todo.Done" @click="toggleTodo($event, todo)" />
            </d-panel>
            <i class="material-icons" style="cursor: pointer" @click="removeTodo(todo.Id)">cancel</i>
          </d-panel>
          <d-text-field
            v-else
            @onDone="doneEditTodo($event, todo)"
            @onInputRef="setEditTodoRef($event, todo)"
            css="width: 100%"
          />
        </d-panel>
      </div>
      <d-alert :success="noItemLeft" :warning="hasItems" :text="itemsLeft" css="p { margin: 0 }"></d-alert>
    </d-panel>
  </d-frame>
</template>

<script>
import dotnetify from 'dotnetify/vue';

export default {
  created() {
    this.vm = dotnetify.vue.connect("TodoList", this, { appId: 'vue-todo-app', exceptionHandler: ex => this.error = ex });
  },
  destroyed() {
    this.vm.$destroy();
  },
  data() {
    return {
      Todos: [],
      ItemsLeft: 0,
      editTodoId: 0,
      error: null
    }
  },
  computed: {
    hasItems() { return `${this.ItemsLeft > 0}` },
    noItemLeft() { return `${this.ItemsLeft === 0}` },
    itemsLeft() { return `${this.ItemsLeft} item${this.ItemsLeft > 1 ? 's' : ''} left` }
  },
  methods: {
    // Called when focus leaves or Enter keypress on the new todo input.
    addTodo(e) {
      const [value, { changed }] = e.detail;
      if (changed) {
        this.vm.$dispatch({ Add: value });

        setTimeout(() => {
          this.todoRef.value = '';
          this.todoRef.focus();
        })
      }
    },

    // Called when existing todo is double-clicked.
    startEditTodo(todo) {
      this.editTodoId = todo.Id
    },

    // Called when focus leaves or Enter keypress on the edited todo input.
    doneEditTodo(e, todo) {
      const [value, { changed }] = e.detail;
      if (changed && todo.Text !== value) {
        todo.Text = value;
        this.updateTodo(todo);
      }
      this.editTodoId = 0;
      this.todoRef.focus();
    },

    toggleTodo(e, todo) {
      e.preventDefault();
      todo.Done = !todo.Done;
      this.updateTodo(todo);
    },

    // Called after edit's done / checkbox clicked.
    updateTodo(todo) {
      this.vm.$dispatch({ Update: { Id: todo.Id, Text: todo.Text, Done: todo.Done } });
    },

    // Called when the remove icon is clicked.
    removeTodo(id) {
      this.vm.$dispatch({ Remove: id });
    },

    // Called when the todo input element ref is received.
    setTodoRef(e) {
      const [ref] = e.detail;
      if (this.todoRef !== ref) {
        this.todoRef = ref;
        this.todoRef.focus();
      }
    },

    // Called when the edit todo input element ref is received.
    setEditTodoRef(e, todo) {
      const [ref] = e.detail;
      if (this.editTodoRef !== ref) {
        this.editTodoRef = ref;
        this.editTodoRef.value = todo.Text;
        this.editTodoRef.focus();
        this.editTodoRef.select();
      }
    }
  }
}
</script>