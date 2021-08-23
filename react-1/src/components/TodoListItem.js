import React from 'react'

export default class TodoListItem extends React.Component {
    constructor (props) {
        super(props)
    }

    toggleDone = () => {
        this.props.setDone(this.props.todo.id)
    }

    render () {
        const { isDone, isFavorite, id } = this.props.todo

        return (
            <li className="todo-list__item">
                <div className="todo-panel">
                    <div className={
                        'todo-panel__name ' +
                        (isDone ? 'todo-panel__name_done ' : ' ') +
                        (isFavorite ? 'todo-panel__name_favorite ' : ' ')
                    }>
                        {this.props.children}
                    </div>
                    <div className="todo-panel__tools">
                        <button className="todo-panel__btn" onClick={() => this.props.setDone(id)}>Done</button>
                        <button className="todo-panel__btn" onClick={() => this.props.setFavorite(id)}>Favorite</button>
                        <button className="todo-panel__btn" onClick={() => this.props.removeTodo(id)}>Delete</button>
                    </div>
                </div>
            </li>
        )
    }
}