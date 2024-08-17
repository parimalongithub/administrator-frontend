import React, { useEffect, useState } from 'react';

const Miscellaneous = () => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        fetch('https://6a97e303-6c9f-4dbc-8fd9-caf7e8d8e50c.e1-us-east-azure.choreoapps.dev/miscellaneous')
            .then(response => response.json())
            .then(data => setQueries(data))
            .catch(error => console.error('Error fetching queries:', error));
    }, []);

    // Filter out queries with priority 'None'
    const filteredQueries = queries.filter(query => query.priority && query.priority !== 'None');

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'red';
            case 'Medium':
                return 'orange';
            default:
                return 'gray'; // Default color for undefined or invalid priorities
        }
    };

    return (
        <div className="department-page">
            <h2>Miscellaneous Queries</h2>
            <div className="query-container">
                {filteredQueries.map((query, index) => (
                    <div key={index} className="query-box">
                        <p><strong>ID:</strong> {query.id}</p>
                        <p><strong>Query:</strong> {query.text}</p>
                        {query.priority && query.priority !== 'None' && (
                            <span 
                                className="priority-bubble" 
                                style={{ backgroundColor: getPriorityColor(query.priority) }}
                            >
                                {query.priority}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Miscellaneous;
