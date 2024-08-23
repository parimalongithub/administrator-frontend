import React, { useEffect, useState } from 'react';

const CustomerService = () => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        fetch('https://6a97e303-6c9f-4dbc-8fd9-caf7e8d8e50c.e1-us-east-azure.choreoapps.dev/Customerservice')
            .then(response => response.json())
            .then(data => setQueries(data))
            .catch(error => console.error('Error fetching queries:', error));
    }, []);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'red';
            case 'Medium':
                return 'orange';
            default:
                return 'grey';
        }
    };

    const filteredQueries = queries.filter(query => query.priority && query.priority !== 'None');

    return (
        <div className="department-page">
            <h2>Customer Service Queries</h2>
            <div className="query-container">
                {filteredQueries.map((query, index) => (
                    <div key={index} className="query-box">
                        <div className="query-header">
                            <p><strong>ID:</strong> {query.id}</p>
                            {query.priority && (
                                <span 
                                    className="priority-bubble" 
                                    style={{ backgroundColor: getPriorityColor(query.priority) }}
                                >
                                    {query.priority}
                                </span>
                            )}
                        </div>
                        <p><strong>Date:</strong> {query.createdAt.split('T')[0]}</p>
                        <h4><strong>Query:</strong> {query.query}</h4>
                        <p><strong>Suggestion:</strong> {query.querySolution}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerService;
