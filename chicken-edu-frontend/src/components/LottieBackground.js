import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../animations/background.json'; // Add your Lottie background animation file here

const LottieBackground = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="lottie-background">
            <Lottie options={defaultOptions} height="100vh" width="100vw" />
        </div>
    );
}

export default LottieBackground;
