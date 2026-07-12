import { useEffect, useState } from "react";

import DateFilter from "../../components/reports/DateFilter";
import ReportSummaryCards from "../../components/reports/ReportSummaryCards";
import TopProductsTable from "../../components/reports/TopProductsTable";
import SalesByDayTable from "../../components/reports/SalesByDayTable";

import { getDashboardReport } from "../../services/reportService";

import "../../styles/reports.css";

function Reports() {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        loadReport();
    }, []);

    async function loadReport(filters = {}) {
        setLoading(true);

        try {
            const data = await getDashboardReport(filters);
            setReport(data);
        } catch (error) {
            console.error(error);
            alert("No fue posible cargar los reportes.");
        } finally {
            setLoading(false);
        }
    }

    function applyFilters() {
        loadReport({
            startDate,
            endDate
        });
    }

    function clearFilters() {
        setStartDate("");
        setEndDate("");
        loadReport();
    }

    return (
        <section className="reports-page">
            <header className="reports-header">
                <div>
                    <h1>Reportes</h1>
                    <p>Consulta ventas estimadas, productos más vendidos y métricas operativas.</p>
                </div>
            </header>

            <DateFilter
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                onApply={applyFilters}
                onClear={clearFilters}
            />

            {loading ? (
                <p>Cargando reportes...</p>
            ) : (
                <>
                    <ReportSummaryCards summary={report?.summary} />

                    <div className="reports-grid">
                        <SalesByDayTable sales={report?.salesByDay || []} />
                        <TopProductsTable products={report?.topProducts || []} />
                    </div>
                </>
            )}
        </section>
    );
}

export default Reports;