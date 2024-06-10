import React from 'react';
import { Container, Box, Typography, Button, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './Home.css';

const theme = createTheme();

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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h3" align="center" gutterBottom>
                        Welcome to Chicken Education Gamification System
                    </Typography>
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
                </Box>
            </Container>
        </ThemeProvider>
    );
}