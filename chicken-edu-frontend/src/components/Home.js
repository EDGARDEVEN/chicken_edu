import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home container mt-5">
            <div className="jumbotron">
                <h1 className="display-4">Welcome to Chicken Education Gamification System</h1>
                <p className="lead">This project is designed to educate users about chickens through a series of interactive quizzes and activities. Use the navigation links to register, log in, and access educational content about chickens.</p>
                <hr className="my-4" />
                <p>Get started by registering or logging in, and then explore the educational contents!</p>
                <a className="btn btn-primary btn-lg" href="/register" role="button">Register</a>
                <a className="btn btn-secondary btn-lg ml-3" href="/login" role="button">Login</a>
            </div>
        </div>
    );
}

export default Home;
