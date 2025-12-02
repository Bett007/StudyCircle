
// src/App.jsx (BUTTON-TRIGGERED MEASUREMENT HOOKS)

import React, { useState } from 'react';
import OverwhelmSurvey from './components/forms/OverwhelmSurvey';

function App() {
    const [showSurvey, setShowSurvey] = useState(false);

    const handleSurveyComplete = () => {
        setShowSurvey(false);
    };

    return (
        <div className="App" style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            fontFamily: 'Arial, sans-serif',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
        }}>
            <header style={{
                textAlign: 'center',
                marginBottom: '40px'
            }}>
                <h1 style={{
                    margin: 0,
                    color: '#2c3e50',
                    fontSize: '3em',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                }}>StudyCircle Dashboard</h1>
                <p style={{
                    color: '#6c757d',
                    fontSize: '1.2em',
                    margin: 0
                }}>Your Study Management Hub</p>
            </header>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '30px',
                maxWidth: '800px',
                width: '100%'
            }}>

                {/* MAIN DASHBOARD CONTENT */}
                <div style={{
                    backgroundColor: '#ffffff',
                    padding: '40px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                    border: '1px solid #e9ecef',
                    textAlign: 'center',
                    width: '100%'
                }}>
                    <h2 style={{
                        color: '#2c3e50',
                        fontSize: '2em',
                        fontWeight: '600',
                        marginBottom: '20px'
                    }}>Welcome to StudyCircle</h2>
                    <p style={{
                        color: '#6c757d',
                        fontSize: '1.1em',
                        lineHeight: '1.6',
                        marginBottom: '30px'
                    }}>
                        Track your study progress, connect with peers, and manage your academic journey.
                        Use the measurement hooks below to monitor your well-being.
                    </p>

                    {/* MEASUREMENT HOOKS BUTTON */}
                    <button
                        onClick={() => setShowSurvey(true)}
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '15px 30px',
                            fontSize: '1.1em',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'all 0.3s ease',
                            marginBottom: '20px'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#0056b3';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#007bff';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                        }}
                    >
                        🧠 Take Daily Overwhelm Check
                    </button>

                    <p style={{
                        color: '#6c757d',
                        fontSize: '0.9em',
                        margin: 0
                    }}>
                        Quick 10-second assessment to track your study stress levels
                    </p>
                </div>

                {/* PLACEHOLDER FOR OTHER FEATURES */}
                <div style={{
                    backgroundColor: '#ffffff',
                    padding: '30px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                    border: '1px solid #e9ecef',
                    width: '100%'
                }}>
                    <h3 style={{
                        color: '#2c3e50',
                        fontSize: '1.5em',
                        fontWeight: '600',
                        marginBottom: '15px',
                        textAlign: 'center'
                    }}>Coming Soon</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px'
                    }}>
                        <div style={{
                            padding: '20px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            textAlign: 'center',
                            border: '2px dashed #dee2e6'
                        }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>📚 Study Rooms</h4>
                            <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9em' }}>Join virtual study sessions</p>
                        </div>
                        <div style={{
                            padding: '20px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            textAlign: 'center',
                            border: '2px dashed #dee2e6'
                        }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>👥 Peer Matching</h4>
                            <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9em' }}>Find study partners</p>
                        </div>
                        <div style={{
                            padding: '20px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            textAlign: 'center',
                            border: '2px dashed #dee2e6'
                        }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>🚨 SOS Channel</h4>
                            <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9em' }}>Get immediate help</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SURVEY MODAL */}
            {showSurvey && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '30px',
                        maxWidth: '500px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        position: 'relative',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                    }}>
                        <button
                            onClick={() => setShowSurvey(false)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5em',
                                cursor: 'pointer',
                                color: '#6c757d',
                                padding: '5px',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            ×
                        </button>

                        <h3 style={{
                            color: '#2c3e50',
                            fontSize: '1.4em',
                            fontWeight: '600',
                            marginBottom: '20px',
                            textAlign: 'center'
                        }}>
                            Daily Overwhelm Check
                        </h3>

                        <OverwhelmSurvey onComplete={handleSurveyComplete} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
