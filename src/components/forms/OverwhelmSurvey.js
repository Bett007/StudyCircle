// src/components/forms/OverwhelmSurvey.jsx (UPDATED FOR CARD/BOX VIEW)

import React, { useState } from 'react';
import { submitOverwhelmScore } from '../../services/api';

const styles = {
    card: {
        // This is the box styling: fixed size, visible border/shadow
        padding: '15px', border: '1px solid #ddd', borderRadius: '8px',
        backgroundColor: '#f9f9f9', margin: '0 0 20px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        minWidth: '250px' // Ensure it looks like a box
    },
    prompt: {
        fontSize: '1em', marginBottom: '10px', fontWeight: '500'
    },
    buttonContainer: {
        display: 'flex', justifyContent: 'space-between', marginBottom: '15px'
    },
    scoreButton: (selected) => ({
        flex: 1, margin: '2px', padding: '8px 0', 
        border: `2px solid ${selected ? '#007bff' : '#ccc'}`,
        borderRadius: '4px', cursor: 'pointer', backgroundColor: selected ? '#e9f5ff' : 'white',
        fontSize: '0.9em'
    }),
    submitBtn: { 
        width: '100%', padding: '8px', backgroundColor: '#28a745', color: 'white', 
        border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em'
    },
    successMessage: {
        color: 'green', fontWeight: 'bold', textAlign: 'center'
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
