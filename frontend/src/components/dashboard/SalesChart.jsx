import SalesBarChart from "../charts/SalesBarChart";

function SalesChart(){

    return(

        <section className="dashboard-card">

            <h3>Ventas Semanales</h3>

            <div className="chart-placeholder">

                <SalesBarChart/>

            </div>

        </section>

    );

}

export default SalesChart;