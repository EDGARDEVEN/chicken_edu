import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ContentList from './components/ContentList';
import QuizList from './components/QuizList';
import UserProgress from './components/UserProgress';
import TimerPage from './components/TimerPage';
import Logout from './components/Logout';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import TimerIcon from '@mui/icons-material/Timer';
import './App.css';
import './styles/global.css';

function App() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Router>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Poultry Education System
                        </Typography>
                        <Link to="/" className="nav-link">
                            <IconButton color="inherit">
                                <HomeIcon />
                            </IconButton>
                            Home
                        </Link>
                        {!user && (
                            <>
                                <Link to="/register" className="nav-link">
                                    <IconButton color="inherit">
                                        <AccountCircleIcon />
                                    </IconButton>
                                    Register
                                </Link>
                                <Link to="/login" className="nav-link">
                                    <IconButton color="inherit">
                                        <LoginIcon />
                                    </IconButton>
                                    Login
                                </Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Link to="/contents" className="nav-link">
                                    <IconButton color="inherit">
                                        <SchoolIcon />
                                    </IconButton>
                                    Contents
                                </Link>
                                <Link to="/quizzes" className="nav-link">
                                    <IconButton color="inherit">
                                        <QuizIcon />
                                    </IconButton>
                                    Quizzes
                                </Link>
                                <Link to="/user_progress" className="nav-link">
                                    <IconButton color="inherit">
                                        <AccountCircleIcon />
                                    </IconButton>
                                    User Progress
                                </Link>
                                <Link to="/timerpage" className="nav-link">
                                    <IconButton color="inherit">
                                        <TimerIcon />
                                    </IconButton>
                                    Reminders
                                </Link>
                                <Logout />
                            </>
                        )}
                    </Toolbar>
                </AppBar>
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/register" render={() => user ? <Redirect to="/" /> : <Register />} />
                        <Route path="/login" render={() => user ? <Redirect to="/" /> : <Login />} />
                        <PrivateRoute path="/contents" component={ContentList} />
                        <PrivateRoute path="/quizzes" component={QuizList} />
                        <PrivateRoute path="/user_progress" component={UserProgress} />
                        <PrivateRoute path="/timerpage" component={TimerPage} /> {/* Add TimerPage route */}
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
