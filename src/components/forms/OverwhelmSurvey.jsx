// src/components/forms/OverwhelmSurvey.jsx (UPDATED FOR CARD/BOX VIEW)

import React, { useState, useEffect } from 'react';
import { submitOverwhelmScore } from '../../services/api';

const styles = {
    card: {
        // Enhanced box styling with better contrast and readability
        padding: '20px',
        border: '1px solid #e9ecef',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        margin: '0 0 20px 0',
        boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
        minWidth: '250px',
        fontFamily: 'Arial, sans-serif'
    },
    prompt: {
        fontSize: '1.1em',
        marginBottom: '15px',
        fontWeight: '600',
        color: '#2c3e50',
        textAlign: 'center',
        lineHeight: '1.4'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        gap: '5px'
    },
    scoreButton: (selected) => ({
        flex: 1,
        margin: '0',
        padding: '10px 0',
        border: `2px solid ${selected ? '#007bff' : '#dee2e6'}`,
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: selected ? '#e7f3ff' : '#ffffff',
        color: selected ? '#0056b3' : '#495057',
        fontSize: '0.95em',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: selected ? '#d4edff' : '#f8f9fa'
        }
    }),
    submitBtn: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: '600',
        transition: 'background-color 0.2s ease',
        '&:hover': {
            backgroundColor: '#218838'
        },
        '&:disabled': {
            backgroundColor: '#6c757d',
            cursor: 'not-allowed'
        }
    },
    successMessage: {
        color: '#28a745',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '1.1em'
    },
    successText: {
        color: '#6c757d',
        textAlign: 'center',
        fontSize: '0.95em',
        marginTop: '10px'
    }
};

const OverwhelmSurvey = ({ onComplete }) => {
    const [selectedScore, setSelectedScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false); // New state to track if submitted today
    const scores = [1, 2, 3, 4, 5];

    // Check if score has been submitted recently (e.g., in the last 24 hours)
    useEffect(() => {
        const lastSubmitted = sessionStorage.getItem('lastOverwhelmSubmit');
        // Simple check: if a score was submitted in the last 86400000 ms (24 hours)
        if (lastSubmitted && (Date.now() - parseInt(lastSubmitted) < 86400000)) {
            setSubmitted(true);
        }
    }, []);

    const handleSubmit = async () => {
        if (selectedScore === null) return;
        setLoading(true);
        try {
            await submitOverwhelmScore(selectedScore); 
            sessionStorage.setItem('lastOverwhelmSubmit', Date.now()); // Record timestamp
            setSubmitted(true); // Show success view
            if (onComplete) onComplete(); 
        } catch (error) {
            alert(`Error submitting score: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div style={styles.card}>
                <p style={styles.successMessage}>✅ Today's Check Complete!</p>
                <p style={{fontSize: '0.9em', textAlign: 'center'}}>Thanks for contributing to StudyCircle's insights.</p>
            </div>
        );
    }

    return (
        <div style={styles.card}>
            <p style={styles.prompt}>🧠 **Daily Check:** How overwhelmed do you feel right now? (1=Calm, 5=Burnout)</p>
            
            <div style={styles.buttonContainer}>
                {scores.map(score => (
                    <button 
                        key={score} 
                        style={styles.scoreButton(selectedScore === score)} 
                        onClick={() => setSelectedScore(score)}
                    >
                        {score}
                    </button>
                ))}
            </div>
            
            <button 
                onClick={handleSubmit} 
                disabled={loading || selectedScore === null}
                style={styles.submitBtn}
            >
                {loading ? 'Recording...' : 'Record Score'}
            </button>
        </div>
    );
};

export default OverwhelmSurvey;
