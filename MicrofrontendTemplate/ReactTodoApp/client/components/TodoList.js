import React from 'react';
import dotnetify from 'dotnetify';
import { Alert, Checkbox, Cell, Frame, Panel, TextField, withTheme } from 'dotnetify-elements';

class TodoList extends React.Component {
  constructor() {
    super();
    this.vm = dotnetify.react.connect('TodoList', this, {
      appId: 'react-todo-app',
      exceptionHandler: ex => this.setState({ error: ex })
    });
    this.state = { Todos: [], newTodo: '', editTodoId: 0, editTodo: '', error: null };
  }

  componentDidMount() {
    setTimeout(() => this.todoRef.focus());
  }

  componentWillUnmount() {
    this.vm.$destroy();
  }

  render() {
    const { Todos, ItemsLeft, newTodo, editTodoId, editTodo, error } = this.state;

    // Control the new todo and existing todo input elements.
    const typeTodo = value => this.setState({ newTodo: value });
    const typeEditTodo = value => this.setState({ editTodo: value });

    // Called when focus leaves or Enter keypress on the new todo input.
    const addTodo = (value, { changed }) => {
      if (changed) {
        this.vm.$dispatch({ Add: value });
        setTimeout(() => this.setState({ newTodo: '' }));
      }
    };

    // Called after edit's done / checkbox clicked.
    const updateTodo = todo => {
      this.vm.$dispatch({ Update: todo });
    };

    // Called when existing todo is double-clicked.
    const startEditTodo = id => {
      const todo = this.state.Todos.find(x => x.Id === id);
      this.setState({ editTodoId: id, editTodo: todo.Text });
      setTimeout(() => {
        this.editTodoRef.focus();
        this.editTodoRef.select();
      });
    };

    // Called when focus leaves or Enter keypress on the edited todo input.
    const doneEditTodo = (todo, changed) => {
      this.setState({ editTodoId: 0, editTodo: '' });
      this.todoRef.focus();
      if (changed) updateTodo(todo);
    };

    // Called when the remove icon is clicked.
    const removeTodo = id => this.vm.$dispatch({ Remove: id });

    if (error) return <h4>{error.message}</h4>;

    return (
      <Frame middle css="width: calc(100% - 3rem)">
        <h2>
          <img src="https://www.dotnetify.net/content/images/reactlogo.svg" width="35px" height="35px" />&nbsp;
          <span>Multicast Todo List</span>
        </h2>
        <Panel css="width: 50%; padding-top: 1rem">
          <TextField
            value={newTodo}
            placeholder="What do you want to do?"
            onChange={typeTodo}
            onDone={addTodo}
            onInputRef={ref => (this.todoRef = ref)}
          />
          <div>
            {Todos.map(todo => (
              <Cell key={todo.Id} css=".cell-body { padding: 0 }" tabIndex="0">
                {todo.Id !== editTodoId ? (
                  <Panel horizontal apart middle padding=".5rem">
                    <Panel onDoubleClick={_ => startEditTodo(todo.Id)}>
                      <Checkbox
                        label={todo.Text}
                        value={todo.Done}
                        onChange={val => updateTodo({ ...todo, Done: val })}
                      />
                    </Panel>
                    <i className="material-icons" style={{ cursor: 'pointer' }} onClick={_ => removeTodo(todo.Id)}>
                      cancel
                    </i>
                  </Panel>
                ) : (
                  <TextField
                    css="width: 100%"
                    value={editTodo}
                    onChange={typeEditTodo}
                    onDone={(value, { changed }) => doneEditTodo({ ...todo, Text: value }, changed)}
                    onInputRef={ref => (this.editTodoRef = ref)}
                  />
                )}
              </Cell>
            ))}
          </div>
          <Alert success={ItemsLeft === 0} warning={ItemsLeft > 0}>
            {ItemsLeft} item{ItemsLeft > 1 && 's'} left
          </Alert>
        </Panel>
      </Frame>
    );
  }
}

export default withTheme(TodoList);
