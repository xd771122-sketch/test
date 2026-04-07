import React, { useState, useEffect } from 'react';

const App = () => {
    const [task, setTask] = useState('');
    const [time, setTime] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTodo = { task, time };
        setTodos([...todos, newTodo].sort((a, b) => a.time.localeCompare(b.time)));
        setTask('');
        setTime('');
    };

    const handleDelete = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <div className='desk'>
            <div className='notebook'>
                <h1>{new Date().toLocaleDateString()}</h1>
                <div className='notebook-content'>
                    <div className='notebook-header'>Tasks</div>
                    <div className='notebook-tasks'>
                        <ul className='task-list'>
                            {todos.map((todo, index) => (
                                <li key={index} className='task-item'>
                                    <span className='task-time'>{todo.time}</span>
                                    <span className='task-text'>{todo.task}</span>
                                    <button onClick={() => handleDelete(index)} className='delete-btn'>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <form onSubmit={handleSubmit} className='notebook-form'>
                        <input type='text' placeholder='Time' value={time} onChange={(e) => setTime(e.target.value)} className='input-time' />
                        <input type='text' placeholder='Task' value={task} onChange={(e) => setTask(e.target.value)} className='input-task' />
                        <button type='submit' className='submit-btn'>Add Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default App;