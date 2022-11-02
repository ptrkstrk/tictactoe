
import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/AuthComponents/Login';
import Signup from './components/AuthComponents/Signup';
import AuthService from './services/auth.service';
import SocketService from './services/socket.service';
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import PageHeader from './components/PageHeader';
import './App.scss';

const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/duel') {
            SocketService.disconnect();
        }
    }, [location]);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setCurrentUser(user);
    }, []);

    const logOut = useCallback(() => {
        AuthService.logout();
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">
                    TicTacToe
                </Link>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link">
                                    Home
                                </Link>
                            </li>
                        </div>
                        <li className="nav-item">
                            <a href="/" className="nav-link" onClick={logOut}>
                                Log out
                            </a>
                        </li>
                        <span className="username">{currentUser.username}</span>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                Log in
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )
                }
            </nav >

            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<PageHeader />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/duel" element={<Game />} />
                </Routes>
            </div>
        </div >
    );
};

export default App;
