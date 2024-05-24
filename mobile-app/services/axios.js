import axios from 'axios';
import axiosRetry from 'axios-retry';
axios.defaults.withCredentials = true;

const instance = axios.create({
    // baseURL: 'http://192.168.1.91:8080/api/v1',
    baseURL: 'https://serverzaloclone-render.onrender.com/api/v1',
});
instance.interceptors.response.use(
    function (response) {
        return response.data ? response.data : response;
    },
    function (error) {
        let res;
        if (error.response) {
            res = {
                status: error.response.status,
                data: error.response.data,
                statusText: error.response.statusText,
                headers: error.response.headers,
                config: error.config,
            };
            const status = res.status;
        }
        return Promise.reject(res || error);
    },
);


export default instance;
