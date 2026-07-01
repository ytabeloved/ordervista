import CategoryPieChart from "../charts/CategoryPieChart";

function CategoriesChart(){

    return(

        <section className="dashboard-card">

            <h3>Ventas por Categoría</h3>

            <div className="chart-placeholder">

                <CategoryPieChart/>

            </div>

        </section>

    );

}

export default CategoriesChart;