import axios from "axios";

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_APP_URL + '/api',
});
