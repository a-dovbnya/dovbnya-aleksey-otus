import React from 'react'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import TodoListItem from './TodoListItem'
import TodoFilter from './TodoFilter'


class Todo extends React.Component {
  state = {
    cnt: 1,
    todos: [],
    filter: 'all'
  }

  addTodo = (val) => {
    if (!val) {
      return
    }
    const todo = {
      id: this.state.cnt,
      name: val,
      isDone: false,
      isFavorite: false
    }
    this.setState({
      todos: [...this.state.todos, todo],
      cnt: this.state.cnt + 1
    })
  }

  onSetDone = (id) => {
    const todos = [...this.state.todos.map(el => {
      if (el.id === id) {
        el.isDone = !el.isDone
      }
      return el
    })]

    this.setState({todos: todos})
  }

  onSetFavorite = (id) => {
    const todos = [...this.state.todos.map(el => {
      if (el.id === id) {
        el.isFavorite = !el.isFavorite
      }
      return el
    })]

    this.setState({todos: todos})
  }

  onDelete = (id) => {
    const todos = [...this.state.todos.filter(el => el.id !== id)]

    this.setState({todos: todos})
  }

  onSetFilter = (filter) => {
    this.setState({filter: filter})
  }

  filteredTodos = () => {
    if (this.state.filter === 'favorite') {
      return this.state.todos.filter(todo => todo.isFavorite)
    }

    if (this.state.filter === 'done') {
      return this.state.todos.filter(todo => todo.isDone)
    }

    return this.state.todos
  }

  render () {
    const todos = this.filteredTodos()

    return (
      <div className="todo">
        <h3>Some ToDoSHKA</h3>
        <AddTodo onChange={this.addTodo} />

        <TodoList>
          { todos.length > 0 ?
            todos.map(todo => 
              <TodoListItem
                key={todo.id.toString()}
                todo={todo}
                setDone={this.onSetDone}
                setFavorite={this.onSetFavorite}
                removeTodo={this.onDelete}
              >
                  {todo.id} - {todo.name}
              </TodoListItem>
            )
            :
            <p className="empty">'Not Todo'</p>
          }
        </TodoList>

        {this.state.todos.length > 0 && <TodoFilter filter={this.state.filter} setFilter={this.onSetFilter} />}
      </div>
    )
  }
}

export default Todo;
