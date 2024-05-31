import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/login', {
            username,
            password
        })
        .then(response => {
            console.log(response.data);
            if (response.data.message === 'Login successful') {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
