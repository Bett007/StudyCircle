// src/components/forms/OverwhelmSurvey.jsx

import React, { useState } from 'react';
import { submitOverwhelmScore } from '../../services/api'; // <<< Importing Step 1

// Simplified inline styles for demonstration purposes
const styles = {
    modal: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex',
        justifyContent: 'center', alignItems: 'center', zIndex: 1000,
    },
    content: {
        backgroundColor: 'white', padding: '30px', borderRadius: '12px',
        maxWidth: '450px', width: '90%', boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        textAlign: 'center'
    },
    button: (selected) => ({
        flex: 1, margin: '5px', padding: '10px 5px', minWidth: '70px',
        border: `2px solid ${selected ? '#007bff' : '#ccc'}`,
        borderRadius: '8px', cursor: 'pointer', backgroundColor: selected ? '#e9f5ff' : 'white',
        transition: 'all 0.2s', fontSize: '14px'
    }),
    submitBtn: { 
        padding: '10px 25px', backgroundColor: '#28a745', color: 'white', 
        border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '20px' 
    }
};

const OverwhelmSurvey = ({ onComplete, onError }) => {
    const [selectedScore, setSelectedScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const scores = [1, 2, 3, 4, 5];

    const getDescription = (score) => {
        switch(score) {
            case 1: return "Calm";
            case 2: return "Fine";
            case 3: return "Pressure";
            case 4: return "High Load";
            case 5: return "Burnout";
            default: return "";
        }
    };

    const handleSubmit = async () => {
        if (selectedScore === null) return;
        
        setLoading(true);
        try {
            // Call the function from Step 1
            await submitOverwhelmScore(selectedScore); 
            onComplete(); 
        } catch (error) {
            onError(error.message); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.modal}>
            <div style={styles.content}>
                <h3>Self-Reported Overwhelm Check 🧠</h3>
                <p>How overwhelmed or burned out do you feel right now? (1 = Calm, 5 = Burnout)</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                    {scores.map(score => (
                        <div 
                            key={score} 
                            style={styles.button(selectedScore === score)} 
                            onClick={() => setSelectedScore(score)}
                        >
                            <div style={{ fontWeight: 'bold', fontSize: '1.4em' }}>{score}</div>
                            <small>{getDescription(score)}</small>
                        </div>
                    ))}
                </div>

                {selectedScore !== null && (
                    <p style={{ color: '#007bff', fontWeight: 'bold' }}>
                        Selected: {selectedScore} - {getDescription(selectedScore)}
                    </p>
                )}

                <button 
                    onClick={handleSubmit} 
                    disabled={loading || selectedScore === null}
                    style={styles.submitBtn}
                >
                    {loading ? 'Recording...' : 'Record Score & Continue'}
                </button>
            </div>
        </div>
    );
};

export default OverwhelmSurvey;