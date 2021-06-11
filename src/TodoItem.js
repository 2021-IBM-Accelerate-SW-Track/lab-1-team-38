import React from 'react'

function TodoItem(props) {
    return (
        <div>
            <input type="checkbox" />
            <label class="strikethrough"> {props.item.text} </label>
        </div>
    )
}

export default TodoItem