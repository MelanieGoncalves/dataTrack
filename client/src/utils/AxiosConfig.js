import axios from 'axios';

const env = process.env.NODE_ENV;

export const app = axios.create({
    baseURL:
        env === 'production'
            ? process.env.PORT //production
            : 'http://localhost:8080/api/', //development
});
