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

  // Mock API response for development
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Score submitted successfully" });
    }, 500); // Simulate network delay
  });
};
