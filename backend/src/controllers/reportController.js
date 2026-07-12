const reportModel = require("../models/reportModel");

async function getDashboardReport(req, res) {
    try {
        const { startDate, endDate } = req.query;

        const [
            summary,
            metrics,
            salesByDay,
            topProducts,
            ordersByStatus,
            salesByCategory,
            recentOrders
        ] = await Promise.all([
            reportModel.getDashboardSummary(startDate, endDate),
            reportModel.getAdminMetrics(),
            reportModel.getSalesByDay(startDate, endDate),
            reportModel.getTopProducts(startDate, endDate),
            reportModel.getOrdersByStatus(startDate, endDate),
            reportModel.getSalesByCategory(startDate, endDate),
            reportModel.getRecentOrders()
        ]);

        res.json({
            summary,
            metrics,
            salesByDay,
            topProducts,
            ordersByStatus,
            salesByCategory,
            recentOrders
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener reportes"
        });
    }
}

module.exports = {
    getDashboardReport
};