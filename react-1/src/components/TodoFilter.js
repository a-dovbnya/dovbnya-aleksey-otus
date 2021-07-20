import React from 'react'

export default class TodoFilter extends React.Component {
    render () {
        const buttons = [
            {
                id: 'all',
                text: 'All'
            },
            {
                id: 'favorite',
                text: 'Favorite'
            },
            {
                id: 'done',
                text: 'Complete'
            }
        ]
        return (
            <div className="filter">
                Show:
                {buttons.map(button => 
                    (<button
                        className="filter__btn"
                        disabled={button.id === this.props.filter}
                        key={button.id}
                        onClick={() => this.props.setFilter(button.id)}
                    >{button.text}</button>)
                )}
            </div>
        )
    }
}