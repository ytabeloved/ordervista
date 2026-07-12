import api from "../api/api";

export async function getDashboardReport(filters = {}) {
    const params = {};

    if (filters.startDate) {
        params.startDate = filters.startDate;
    }

    if (filters.endDate) {
        params.endDate = filters.endDate;
    }

    const response = await api.get("/reports/dashboard", { params });
    return response.data;
}