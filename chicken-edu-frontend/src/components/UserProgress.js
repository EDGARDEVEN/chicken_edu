import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProgress.css';
import { Container, Box, Typography, LinearProgress, Badge, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

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
        <Container className="user-progress" maxWidth="md">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    User Progress
                </Typography>
                <Badge badgeContent={totalPoints} color="primary" showZero>
                    <EmojiEventsIcon fontSize="large" />
                </Badge>
                <Typography variant="h5" gutterBottom>
                    Total Points: {totalPoints}
                </Typography>
                <Box sx={{ width: '100%', marginY: 4 }}>
                    <LinearProgress variant="determinate" value={totalPoints} />
                </Box>
                <List>
                    {progress.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <StarIcon color="secondary" />
                            </ListItemIcon>
                            <ListItemText primary={`Quiz ${item.quiz_id}: ${item.score} points`} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
}

export default UserProgress;
