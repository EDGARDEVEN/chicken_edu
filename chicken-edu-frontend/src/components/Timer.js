import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { Box, Typography } from '@mui/material';
import Lottie from 'react-lottie';
import alertAnimation from '../animations/alert.json'; // Add your Lottie alert animation file here
import './Timer.css';

function Timer({ expiryTimestamp, title }) {
    const [showAlert, setShowAlert] = useState(false);

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => {
            console.warn('Timer expired');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000); // Show alert for 5 seconds
        }
    });

    const alertOptions = {
        loop: true,
        autoplay: true,
        animationData: alertAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Box className="timer-container">
            {showAlert && <Lottie options={alertOptions} height={100} width={100} />}
            <Typography variant="h5" component="div">
                {title}
            </Typography>
            <div className="time-display">
                <span>{days}</span> days
                <span>{hours}</span> hours
                <span>{minutes}</span> minutes
                <span>{seconds}</span> seconds
            </div>
            <div className="timer-controls">
                {!isRunning ? <button onClick={start}>Start</button> : <button onClick={pause}>Pause</button>}
                <button onClick={resume}>Resume</button>
                <button onClick={() => {
                    const time = new Date();
                    time.setSeconds(time.getSeconds() + (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
                    restart(time)
                }}>Restart</button>
            </div>
        </Box>
    );
}

export default Timer;
