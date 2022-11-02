import http from '../http-common';

const register = (username, email, password) => {
    return http.post('/auth/signup', {
        username,
        email,
        password,
    });
};


const login = (username, password) => {
    return http
        .post('/auth/signin', {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                sessionStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    sessionStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem('user'));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
