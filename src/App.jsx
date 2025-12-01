// src/App.jsx

import React, { useState, useEffect } from 'react';
import OverwhelmSurvey from './components/forms/OverwhelmSurvey'; // <<< Importing Step 2

function App() {
  // State for controlling the visibility of the survey and error messages
  const [showSurvey, setShowSurvey] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Logic: Check if the user has submitted the baseline score for this session/period
  useEffect(() => {
    // We use sessionStorage here as a simple placeholder for checking submission status.
    const hasSubmittedBaseline = sessionStorage.getItem('baselineScoreSubmitted'); 

    if (!hasSubmittedBaseline) {
      // Show the survey modal on initial load if not submitted
      setShowSurvey(true);
    }
    // NOTE: If you later implement a system for checking every week, you'll change this logic!
  }, []);

  const handleSurveyComplete = () => {
    // Fired on successful API submission
    setShowSurvey(false);
    sessionStorage.setItem('baselineScoreSubmitted', 'true'); 
    setApiError(null);
    console.log("Survey successfully recorded. Main features now visible.");
  };

  const handleSurveyError = (errorMessage) => {
      // Fired if the API call fails
      setApiError(`Submission failed: ${errorMessage}. Please try again.`);
      console.error(errorMessage);
  }

  return (
    <div className="App">
      <header style={{ padding: '20px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
        <h1>StudyCircle Dashboard (Feature 5 Integration Test)</h1>
        <p>Your team's features (1-4) will appear here once the survey is completed.</p>
      </header>

      <main style={{ padding: '20px', minHeight: '500px' }}>
        {/* All the main MVP features (Matching, Sprints, Feed) go here */}
        {!showSurvey && (
          <div style={{ border: '1px dashed green', padding: '20px' }}>
            <h2>Main StudyCircle Features (Visible Now)</h2>
            <p>This space will be filled by the components built by your teammates (Features 1-4).</p>
          </div>
        )}
      </main>

      {/* 5. Measurement Hooks: The Overwhelm Survey Renderer */}
      {showSurvey && (
        <OverwhelmSurvey 
          onComplete={handleSurveyComplete} 
          onError={handleSurveyError}
        />
      )}

      {/* Display any API error */}
      {apiError && (
        <div style={{ color: 'white', backgroundColor: 'red', padding: '10px', textAlign: 'center' }}>
            {apiError}
        </div>
      )}
    </div>
  );
}

export default App;