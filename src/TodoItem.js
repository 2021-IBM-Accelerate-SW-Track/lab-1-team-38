import React from 'react'

function TodoItem(props) {
    return (
        <div>
            <input type="checkbox" />
            <label class="strikethrough"> {props.item.text} </label>
            <label class="dateAndTime"> {props.item.dateAndTime} </label>
        </div>
    )
}

export default TodoItem