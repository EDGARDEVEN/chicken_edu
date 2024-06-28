import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField } from '@mui/material';
import Timer from './Timer';
import './TimerPage.css';

function TimerPage() {
    const [timers, setTimers] = useState([]);
    const [title, setTitle] = useState('');
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const addTimer = () => {
        const expiryTimestamp = new Date();
        expiryTimestamp.setSeconds(
            expiryTimestamp.getSeconds() + (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60)
        );
        setTimers([...timers, { title, expiryTimestamp }]);
        setTitle('');
        setDays(0);
        setHours(0);
        setMinutes(0);
    };

    return (
        <Container component="main" maxWidth="md" className="timer-page">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Poultry Keeping Timers
                </Typography>
                <Box className="timer-form">
                    <TextField
                        label="Event Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Days"
                        type="number"
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Hours"
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Minutes"
                        type="number"
                        value={minutes}
                        onChange={(e) => setMinutes(Number(e.target.value))}
                        variant="outlined"
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={addTimer}>
                        Add Timer
                    </Button>
                </Box>
                <Box className="timers-list">
                    {timers.map((timer, index) => (
                        <Timer key={index} title={timer.title} expiryTimestamp={timer.expiryTimestamp} />
                    ))}
                </Box>
            </Box>
        </Container>
    );
}

export default TimerPage;
