import React, { useEffect, useState } from 'react';
import Modal from './model'; 

const Technical = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedQuery, setSelectedQuery] = useState(null);

    useEffect(() => {
        fetch('https://6a97e303-6c9f-4dbc-8fd9-caf7e8d8e50c.e1-us-east-azure.choreoapps.dev/Technical')
            .then(response => response.json())
            .then(data => {
                setQueries(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching queries:', error);
                setError('Failed to load queries. Please try again later.');
                setLoading(false);
            });
    }, []);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'red';
            case 'Medium':
                return 'orange';
            default:
                return 'gray'; 
        }
    };

    const filteredQueries = queries.filter(query => query.priority && query.priority !== 'None');

    const handleQueryClick = (query) => {
        setSelectedQuery(query);
    };

    const handleResolveQuery = (id) => {
        setQueries(prevQueries => prevQueries.filter(query => query.id !== id));
        setSelectedQuery(null); 
    };

    const handleCloseModal = () => {
        setSelectedQuery(null);
    };

    return (
        <div className="department-page">
            {loading ? (
                <p>Loading queries...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <>
                    <h2>Technical Department Queries</h2>
                    <div className="query-container">
                        {filteredQueries.map((query, index) => (
                            <div 
                                key={index} 
                                className="query-box" 
                                onClick={() => handleQueryClick(query)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="query-header">
                                    <p><strong>ID:</strong> {query.id}</p>
                                    {query.priority && query.priority !== 'None' && (
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
                            </div>
                        ))}
                    </div>
                    <Modal
                        query={selectedQuery}
                        onClose={handleCloseModal}
                        onResolve={handleResolveQuery}
                    />
                </>
            )}
        </div>
    );
};

export default Technical;
