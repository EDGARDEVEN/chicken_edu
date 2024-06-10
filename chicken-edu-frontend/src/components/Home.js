import React from 'react';
import { Container, Box, Typography, Button, Card, CardMedia } from '@mui/material';
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
                        Welcome to Chicken Education Gamification System
                    </Typography>
                    <Lottie options={defaultOptions} height={200} width={200} />
                    <Typography variant="h5" align="center" paragraph>
                        This project is designed to educate users about chickens through a series of interactive quizzes and activities. Use the navigation links to register, log in, and access educational content about chickens.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            href="/register"
                            sx={{ mx: 1 }}
                        >
                            Register
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            href="/login"
                            sx={{ mx: 1 }}
                        >
                            Login
                        </Button>
                    </Box>
                    <Card sx={{ mt: 4 }}>
                        <CardMedia
                            component="img"
                            height="300"
                            image="https://img.freepik.com/free-vector/white-chicken-skateboard-cartoon-character_1308-89314.jpg?t=st=1718021315~exp=1718024915~hmac=07c1df7a5e8d4b4e2e20929b2222678d4d6811b2db8fdc150a5cb67c69cd23b0&w=740"  // Replace with a valid image URL
                            alt="Chicken"
                        />
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
