function StatCard({ title, value, trend, icon }) {
    return (
        <article className="stat-card">
            <div className="stat-card-header">
                <span>{title}</span>
                <span className="stat-icon">{icon}</span>
            </div>

            <div className="stat-value">{value}</div>

            <div className="stat-trend">{trend}</div>
        </article>
    );
}

export default StatCard;