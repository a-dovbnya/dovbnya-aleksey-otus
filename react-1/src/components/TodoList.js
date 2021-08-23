import React from 'react'

export default class TodoList extends React.Component {
    render () {
        return (
            <ul className="todo-list">{this.props.children}</ul>
        )
    }
}