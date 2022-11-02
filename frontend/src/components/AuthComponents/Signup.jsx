import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from './Input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../../services/auth.service';
import { required, validEmail, validUsername, validPassword } from './validators';

const Signup = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [message, setMessage] = useState('');

    const handleChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const handleChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const handleChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage('');
        setIsSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(username, email, password).then(
                (response) => {
                    setMessage(response.data.message);
                    setIsSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setIsSuccessful(false);
                }
            );
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

                <Form onSubmit={handleRegister} ref={form}>
                    {!isSuccessful && (
                        <div>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={username}
                                onChange={handleChangeUsername}
                                validations={[required, validUsername]}
                            />

                            <Input
                                type="text"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={handleChangeEmail}
                                validations={[required, validEmail]}
                            />
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={handleChangePassword}
                                validations={[required, validPassword]}
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={isSuccessful ? 'alert alert-success' : 'alert alert-danger'}
                                role="alert"
                            >
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

export default Signup;
