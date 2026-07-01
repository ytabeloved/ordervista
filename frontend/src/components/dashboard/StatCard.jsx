// Tarjeta reutilizable para mostrar indicadores del Dashboard
function StatCard({ title, value, icon }) {

    return (
        <article className="stat-card">

            <div>

                <h3>{title}</h3>

                <h2>{value}</h2>

            </div>

            <div className="stat-card-icon">
                {icon}
            </div>

        </article>
    );

}

export default StatCard;