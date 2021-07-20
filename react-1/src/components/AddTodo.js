import React from 'react'

class AddTodo extends React.Component {
  constructor (props) {
    super(props)
    this.todoArea = React.createRef()
  }

  onSubmitHandler = (e) => {
    e.preventDefault()
    this.props.onChange(this.todoArea.current.value)
    this.todoArea.current.value = ''
  }

  render () {
    return (
      <div className="add-todo">
        <form action="/" onSubmit={this.onSubmitHandler}>
          <div className="add-todo-form">
            <input type="text" ref={this.todoArea} className="add-todo-form__area" />
            <button className="add-todo-form__btn">add</button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddTodo;
