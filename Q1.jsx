import React, { useReducer, useState } from 'react';
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false }
      ];
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};
const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState('');
  const handleAdd = () => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: text });
      setText('');
    }
  };
  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.length - completedCount;
  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Todo List</h2>
      <input
        type="text"
        value={text}
        placeholder="Enter todo..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
            </button>
          </li>
        ))}
      </ul>
      <div>
        <strong>Completed:</strong> {completedCount} <br />
        <strong>Pending:</strong> {pendingCount}
      </div>
    </div>
  );
};
export default TodoApp;
