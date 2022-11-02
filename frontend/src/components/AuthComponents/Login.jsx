
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';
import Input from './Input';
import AuthService from '../../services/auth.service';
import { required } from './validators';
const Login = () => {
    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState('user'); //todo remove
    const [password, setPassword] = useState('password'); //todo remove
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const handleChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage('');
        setIsLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    navigate('/home');
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setIsLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setIsLoading(false);
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleLogin} ref={form}>
                    <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={handleChangeUsername}
                        validations={[required]}
                    />

                    <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={handleChangePassword}
                        validations={[required]}
                    />

                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={isLoading}>
                            {isLoading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: 'none' }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};

export default Login;
