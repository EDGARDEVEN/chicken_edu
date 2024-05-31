import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProgress.css';

function UserProgress() {
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.get(`http://localhost:5000/api/user_progress/${user.user_id}`)
            .then(response => {
                setProgress(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div className="user-progress">
            <h2>User Progress</h2>
            <ul>
                {progress.map(item => (
                    <li key={item.quiz_id}>
                        Quiz {item.quiz_id}: {item.score} points
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserProgress;
