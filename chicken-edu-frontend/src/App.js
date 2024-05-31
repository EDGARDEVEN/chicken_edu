import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ContentList from './components/ContentList';
import QuizList from './components/QuizList';
import UserProgress from './components/UserProgress';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/contents">Contents</Link></li>
                        <li><Link to="/quizzes">Quizzes</Link></li>
                        <li><Link to="/user_progress">Progress</Link></li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/contents" component={ContentList} />
                    <Route path="/quizzes" component={QuizList} />
                    <Route path="/user_progress" component={UserProgress} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
