import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Card, CardContent } from '@mui/material';
import './ContentList.css';

function ContentList() {
    const [contents, setContents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/contents')
            .then(response => {
                setContents(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ marginTop: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Educational Content On Poultry
                </Typography>
                {contents.map((content, index) => (
                    <Card key={index} className="content-card" sx={{ marginBottom: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {content.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" component="p">
                                <span dangerouslySetInnerHTML={{ __html: content.body }} />
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
}

export default ContentList;
