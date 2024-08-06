import React from 'react';
import SingleTodo from './SingleTodo';

const TodoList = ({ todos }) => {
    return (
        <ul className="task-list">
            {todos && todos.map(todo => (
                <SingleTodo key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};

export default TodoList;
