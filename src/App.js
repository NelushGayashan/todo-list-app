// App.js
import React, { useState } from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [editDate, setEditDate] = useState(new Date());

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleDateChange = (date) => {
    if (date > new Date()) {
      setDate(date);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTodos([...todos, { task, date, completed: false }]);
    setTask('');
    setDate(new Date());
  };

  const handleCheckboxChange = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDelete = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].task);
    setEditDate(new Date(todos[index].date));
  };

  const handleEditChange = (e, type) => {
    if (type === 'task') {
      setEditValue(e.target.value);
    } else if (type === 'date') {
      setEditDate(e);
    }
  };

  const handleEditSubmit = (index) => {
    const newTodos = [...todos];
    newTodos[index].task = editValue;
    newTodos[index].date = new Date(editDate); // Convert to Date object
    setTodos(newTodos);
    setEditIndex(null);
    setEditValue('');
    setEditDate(new Date());
  };


  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="task" className="label">Task:</label>
          <input
            type="text"
            id="task"
            value={task}
            onChange={handleChange}
            placeholder="Enter a new to-do item"
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date" className="label">Date:</label>
          <DatePicker
            id="date"
            selected={date}
            onChange={handleDateChange}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            className="input"
            required
          />
        </div>
        <button type="submit" className="button">Add</button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editIndex === index ? (
              <form onSubmit={() => handleEditSubmit(index)}>
                <div className="form-group">
                <label htmlFor="task" className="label">Task:</label>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => handleEditChange(e, 'task')}
                />
                </div>
                <div className="form-group">
                <label htmlFor="date" className="label">Date:</label>
                <DatePicker
                  selected={editDate}
                  onChange={(date) => handleEditChange(date, 'date')}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                />
                </div>
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span
                  className={todo.completed ? 'completed' : ''}
                  onClick={() => handleEdit(index)}
                >
                  {todo.task} - {todo.date.toLocaleDateString()}
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleDelete}>Delete Completed</button>
    </div>
  );
}

export default TodoApp;
