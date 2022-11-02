import axios from 'axios';

export default axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api` || 'http://localhost:8080/api'
});
