import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom"

const Warehouse = () => {

    const { id } = useParams()
    const [data, setData] = useState(null)
    const [activeSection, setActiveSection] = useState("")


    useEffect(() => {

        const fetchWarehouseData = async () => {
            try {
                const response = await fetch(`http://localhost:5002/warehouses/${id}`)
                const result = await response.json()
                setData(result)
            } catch (error) {
                console.error("Error fetching warehouse data:", error)
            }
        }
        fetchWarehouseData()
    }, [id])

    const togggleSection = (section) => {
        setActiveSection(activeSection === section ? "" : section)
    }

    if (!data) {
        return <p>Loading warehouse data...</p>
    }
    return (
        <div className='results'>
            <h1 className='results__title'> Warehouse {data.name}</h1>
            <div className='results__sections'>
                {["Redistributed", "Maxes Raised", "Maxes Lowered", "Flagged for Removal"].map((section) => (
                    <div key={section} className='results__section'>
                        <div
                            className='results__header'
                            onClick={() => togggleSection(section)}
                        >
                            {section} <span>{activeSection === section ? "▲" : "▼"}</span>
                        </div>
                        {activeSection === section && (
                            <ul className='results__list'>
                                {data[section.toLocaleLowerCase().replace(" ", "_")].map((item) => {
                                    <li key={item.itemNumber} className='results__item'>
                                        <stong>{item.itemNumber}</stong>: {item.Description} - Current Max: {item.maxThreshold}
                                    </li>
                                })}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Warehouse;