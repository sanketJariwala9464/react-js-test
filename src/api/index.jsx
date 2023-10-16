import { httpClient } from "./http";

export const api = {
    get: (url, config) =>
        httpClient.get(url, config),
    post: (url, data, config) =>
        httpClient.post(url, data, config),
    put: (url, data, config) =>
        httpClient.put(url, data, config),
    delete: (url, config) =>
        httpClient.delete(url, config),
};
