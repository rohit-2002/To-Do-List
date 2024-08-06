// reducer.js

export const initialState = {
    todos: [
        {
            id: '1',
            content: 'Sample Todo 1',
            description: 'This is a sample description.',
            timestamp: new Date().toISOString(),
            isCompleted: false
        },
        {
            id: '2',
            content: 'Sample Todo 2',
            description: 'This is another sample description.',
            timestamp: new Date().toISOString(),
            isCompleted: true
        }
    ],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "INITIALIZE_TODOS":
            return {
                ...state,
                todos: action.payload
            };
        case "ADD_TODO":
            return {
                ...state,
                todos: [action.payload, ...state.todos]
            };
        case "REMOVE_TODO":
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        case "COMPLETE_TODO":
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, isCompleted: !todo.isCompleted } : todo
                )
            };
        case "UPDATE_TODO":
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.todoId
                        ? { ...todo, content: action.payload.newValue }
                        : todo
                )
            };
        default:
            return state;
    }
}

export default reducer;
