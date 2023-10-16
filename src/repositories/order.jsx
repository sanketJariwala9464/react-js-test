import { api } from "../api"

export default {
    create: (data) =>
        api.post("/order-service", data),
    getAll: () =>
        api.get("/order-service"),
    get: (id) =>
        api.get(`/order-service/${id}`),
    update: (data) =>
        api.put(`/order-service`, data),
    delete: (id) =>
        api.delete(`/order-service/${id}`),
}