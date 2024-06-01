import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';
import { useHistory } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/login', {
            username,
            password
        })
        .then(response => {
            setMessage(response.data.message);
            if (response.data.message === 'Login successful') {
                localStorage.setItem('user', JSON.stringify(response.data));
                history.push('/');
            }
        })
        .catch(error => {
            setMessage('There was an error!');
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
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
