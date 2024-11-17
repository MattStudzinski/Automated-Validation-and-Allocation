import React from "react";


const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1 className="dashboard__title">Warehouse Dashboard</h1>
            <div className="dashboard__warehouses">
                <div className="warehouse">
                    <span className="warehouse__name">Warehouse 1</span>
                    <span className="warehouse__status">Flagged</span>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;