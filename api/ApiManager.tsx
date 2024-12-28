// api/ApiManager.tsx

import axios from 'axios'

const ApiManager = axios.create({
    baseURL: 'https://reqres.in/api',
    responseType: 'json',
});

export default ApiManager;