import axios from 'axios';

const env = process.env.NODE_ENV;

export const app = axios.create({
    baseURL:
        env === 'production'
            ? 'https://data-track-app.herokuapp.com/' //production
            : 'http://localhost:8080/', //development
});
