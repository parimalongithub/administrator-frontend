import React, { useEffect, useState } from 'react';

const HR = () => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        fetch('https://6a97e303-6c9f-4dbc-8fd9-caf7e8d8e50c.e1-us-east-azure.choreoapps.dev/Hr')
            .then(response => response.json())
            .then(data => setQueries(data))
            .catch(error => console.error('Error fetching queries:', error));
    }, []);

    return (
        <div className="department-page">
            <h2>HR Queries</h2>
            <div className="query-container">
                {queries.map((query, index) => (
                    <div key={index} className="query-box">
                        <p><strong>ID:</strong> {query.id}</p>
                        <p><strong>Query:</strong> {query.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HR;
