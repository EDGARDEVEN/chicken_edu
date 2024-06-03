import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProgress.css';
import { ProgressBar } from 'react-bootstrap';

function UserProgress() {
    const [progress, setProgress] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.get(`http://localhost:5000/api/user_progress/${user.user_id}`)
            .then(response => {
                setProgress(response.data);
                const points = response.data.reduce((total, item) => total + item.score, 0);
                setTotalPoints(points);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div className="user-progress container mt-5">
            <h2>User Progress</h2>
            <h3>Total Points: {totalPoints}</h3>
            <ProgressBar now={totalPoints} max={100} label={`${totalPoints}%`} />
            <ul className="list-group mt-3">
                {progress.map(item => (
                    <li key={item.quiz_id} className="list-group-item">
                        Quiz {item.quiz_id}: {item.score} points
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserProgress;
