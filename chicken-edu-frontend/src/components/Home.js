import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Lottie from 'react-lottie';
import animationData from '../animations/chicken.json';
import './Home.css';

const theme = createTheme();

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

export default function Home() {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h3" align="center" gutterBottom>
                        Welcome to Poultry Education Gamification System
                    </Typography>
                    <Lottie options={defaultOptions} height={200} width={200} />
                    <Typography variant="h5" align="center" paragraph>
                        This project is designed to educate users about Poultry Keeping through a series of interactive quizzes and activities. Use the navigation links to register, log in, and access educational content about chickens.
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
