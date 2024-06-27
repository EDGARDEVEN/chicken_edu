import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Card, CardContent, Button, Radio, RadioGroup, FormControlLabel, Snackbar, Alert } from '@mui/material';
import './QuizList.css';

function QuizList() {
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState('');
    const [result, setResult] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        axios.get('http://localhost:5000/api/quizzes')
            .then(response => {
                setQuizzes(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleChoiceChange = (event) => {
        setSelectedChoice(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        axios.post('http://localhost:5000/api/submit_quiz', {
            user_id: user.user_id,
            quiz_id: quizzes[currentQuestionIndex].id,
            answer: selectedChoice
        })
        .then(response => {
            setResult(response.data);
            if (response.data.correct) {
                setSnackbarMessage('Yes, That Is Correct!');
                setSnackbarSeverity('success');
            } else {
                setSnackbarMessage('Sorry, that is incorrect. Please try again.');
                setSnackbarSeverity('error');
            }
            setOpenSnackbar(true);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };

    const handleNextQuestion = () => {
        setSelectedChoice('');
        setResult(null);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setOpenSnackbar(false);
    };

    const handlePrevQuestion = () => {
        setSelectedChoice('');
        setResult(null);
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setOpenSnackbar(false);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ marginTop: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Quizzes
                </Typography>
                {quizzes.length > 0 && (
                    <Card className="quiz-card">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {quizzes[currentQuestionIndex].question}
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <RadioGroup value={selectedChoice} onChange={handleChoiceChange}>
                                    {quizzes[currentQuestionIndex].choices.map((choice, index) => (
                                        <FormControlLabel key={index} value={choice} control={<Radio />} label={choice} />
                                    ))}
                                </RadioGroup>
                                {result && (
                                    <Typography variant="body2" color={result.correct ? 'green' : 'red'}>
                                        {result.correct ? 'Correct!' : 'Incorrect.'}
                                    </Typography>
                                )}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                    <Button variant="contained" color="primary" disabled={currentQuestionIndex === 0} onClick={handlePrevQuestion}>
                                        Previous
                                    </Button>
                                    <Button variant="contained" color="secondary" type="submit">
                                        Submit
                                    </Button>
                                    <Button variant="contained" color="primary" disabled={currentQuestionIndex === quizzes.length - 1} onClick={handleNextQuestion}>
                                        Next
                                    </Button>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                )}
            </Box>
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default QuizList;
