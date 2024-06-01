import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ContentList from './components/ContentList';
import QuizList from './components/QuizList';
import UserProgress from './components/UserProgress';
import Logout from './components/Logout';
import './App.css';
import './styles/global.css';

function App() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        {!user && <li><Link to="/register">Register</Link></li>}
                        {!user && <li><Link to="/login">Login</Link></li>}
                        {user && <li><Link to="/contents">Contents</Link></li>}
                        {user && <li><Link to="/quizzes">Quizzes</Link></li>}
                        {user && <li><Link to="/user_progress">Progress</Link></li>}
                        {user && <li><Logout /></li>}
                    </ul>
                </nav>
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/register" render={() => user ? <Redirect to="/" /> : <Register />} />
                        <Route path="/login" render={() => user ? <Redirect to="/" /> : <Login />} />
                        <PrivateRoute path="/contents" component={ContentList} />
                        <PrivateRoute path="/quizzes" component={QuizList} />
                        <PrivateRoute path="/user_progress" component={UserProgress} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

function PrivateRoute({ component: Component, ...rest }) {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <Route
            {...rest}
            render={props =>
                user ? (
                    <Component {...props} />
                ) : (
                    alert('You must log in first!'),
                    <Redirect to="/login" />
                )
            }
        />
    );
}

export default App;
