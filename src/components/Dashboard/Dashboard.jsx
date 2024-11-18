import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom'
import './Dashboard';


const Dashboard = () => {
    const [warehouses, setWarehouses] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await fetch ('http://localhost:5002/warehouses')
                const data = await response.json()
                setWarehouses(data)
            } catch (error) {
                console.error('Failed to fetch warehouses:', error)
            }
        }
        fetchWarehouses()
    }, [])

    const handleNavigate = (id) => {
        navigate(`/warehouse/${id}`)
    }
    
    return (
        <div className="dashboard">
            <h1 className="dashboard__title">Warehouse Dashboard</h1>
            <div className="dashboard__warehouses">
                {warehouses.map((warehouse) => (
                    <div 
                    key={warehouse._id}
                    className="warehouse"
                    onClick={() => handleNavigate(warehouse._id)}
                    >
                        <h2 className="warehouse__name">{warehouse.fileName}</h2>
                        <span className="warehouse__date">Last Updated: {new Date(warehouse.uploadDate).toLocaleDateString()}</span>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;