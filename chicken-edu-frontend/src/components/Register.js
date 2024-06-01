import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/register', {
            username,
            email,
            password
        })
        .then(response => {
            setMessage(response.data.message);
        })
        .catch(error => {
            setMessage('There was an error!');
        });
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
