// src/services/api.js

const API_BASE_URL = 'http://your-backend-api.com/api/v1'; // <<< IMPORTANT: UPDATE THIS URL LATER

/**
 * Submits the user's self-reported overwhelm score (1-5) to the backend.
 * This is the core function for Feature 5.
 * @param {number} score - The score from 1 (Calm) to 5 (Overwhelmed).
 * @returns {Promise<object>} The response data from the server.
 */
export const submitOverwhelmScore = async (score) => {
  if (score === null || score < 1 || score > 5) {
    throw new Error("Score must be a number between 1 and 5.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/measurement/overwhelm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Placeholder for Auth token - must be handled by your team's auth system
        // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`, 
      },
      body: JSON.stringify({ score }),
    });

    if (!response.ok) {
      // Attempt to read server-side error message
      let message = `API error with status: ${response.status}`;
      try {
        const errorData = await response.json();
        message = errorData.message || message;
      } catch (e) {
        // Ignore if JSON parsing fails
      }
      throw new Error(message);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting overwhelm score:", error);
    throw error;
  }
};