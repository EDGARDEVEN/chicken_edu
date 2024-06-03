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
            setMessage('Wrong Username or Password!');
        });
    };

    return (
        <div className="form-container container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
}

export default Login;
