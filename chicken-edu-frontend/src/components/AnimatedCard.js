import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography } from '@mui/material';

function AnimatedCard({ title, body }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            <Card sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {body}
                    </Typography>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default AnimatedCard;
