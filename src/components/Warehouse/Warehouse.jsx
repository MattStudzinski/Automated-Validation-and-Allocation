import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom"

const Warehouse = () => {

    const { id } = useParams()
    const [data, setData] = useState(null)
    const [groupedData, setGroupedData] = useState({})
    const [activeSection, setActiveSection] = useState("")


    useEffect(() => {

        const fetchWarehouseData = async () => {
            try {
                const response = await fetch(`http://localhost:5002/warehouses/${id}`)
                const result = await response.json()
                result.products.forEach((product) =>
                    console.log("Trend:", product.trend || "No trend")
                );

                if(result.products) {
                    const grouped = result.products.reduce((acc, product) => {
                        const trend = product.trend?.toLowerCase().replace(" ", "_") || "unknown"
                        if (!acc[trend]) acc[trend] = []
                        acc[trend].push(product)
                        return acc
                    }, {})

                    setGroupedData(grouped)
                }
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

    console.log(data)
    console.log("Grouped Data Structure:", groupedData);

    if (!data) {
        return <p>Loading warehouse data...</p>
    }

    const sectionMapping = {
        Redistributed: "redistributed",
        "Maxes Raised": "increasing",
        "Maxes Lowered": "decreasing",
        "Flagged for Removal": "consider_removal",
      };

    return (
        <div className='results'>
            <h1 className='results__title'> Warehouse {data.fileName}</h1>
            <div className='results__sections'>
                {Object.entries(sectionMapping).map(([displayName, key]) => {
                    const items = groupedData[key] || []
                    return (
                    <div key={key} className='results__section'>
                        <div
                            className='results__header'
                            onClick={() => togggleSection(displayName)}
                        >
                            {displayName} <span>{activeSection === displayName ? "▲" : "▼"}</span>
                        </div>
                        {activeSection === displayName && (
                            <ul className='results__list'>
                                {items.map((item) => (
                                    <li key={item._id} className='results__item'>
                                        <stong>{item.itemNumber}</stong>: {item.description} - Suggested Max: {item.suggestedMax}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Warehouse;