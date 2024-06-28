import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Button } from '@mui/material';
import Lottie from 'react-lottie';
import animationData from '../animations/loading.json'; // Add your Lottie animation file here
import './ContentList.css';
import AnimatedCard from './AnimatedCard';

function ContentList() {
    const [contents, setContents] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/contents')
            .then(response => {
                setContents(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleNext = () => {
        setIsLoading(true);
        setTimeout(() => {
            setCurrentIndex(currentIndex + 1);
            setIsLoading(false);
        }, 4500); // Adjust the loading time as needed
    };

    const handleBack = () => {
        setIsLoading(true);
        setTimeout(() => {
            setCurrentIndex(currentIndex - 1);
            setIsLoading(false);
        }, 4500); // Adjust the loading time as needed
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Educational Content On Poultry
                </Typography>
                {isLoading ? (
                    <Lottie options={defaultOptions} height={400} width={400} />
                ) : (
                    <>
                        {contents.length > 0 && (
                            <AnimatedCard title={contents[currentIndex].title} body={<span dangerouslySetInnerHTML={{ __html: contents[currentIndex].body }} />} />
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                            <Button variant="contained" color="primary" disabled={currentIndex === 0} onClick={handleBack}>
                                Back
                            </Button>
                            <Button variant="contained" color="primary" disabled={currentIndex === contents.length - 1} onClick={handleNext}>
                                Next
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
}

export default ContentList;
