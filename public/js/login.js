/* eslint-disable */
const axios = require("axios");
const { showAlert } = require("./alerts");

// Login function to authenticate user
const login = async (email, password) => {
  const API_URL =
    process.env.API_URL || "http://127.0.0.1:3000/api/v1/users/login";

  // Input validation
  if (!email || !password) {
    showAlert("error", "Please provide both email and password.");
    return;
  }

  try {
    const res = await axios({
      method: "POST",
      url: API_URL,
      data: { email, password },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    // Improved error handling
    if (err.response) {
      showAlert("error", err.response.data.message || "An error occurred.");
    } else if (err.request) {
      showAlert("error", "No response from server. Please try again.");
    } else {
      showAlert("error", "Request failed: " + err.message);
    }
  }
};

// Logout function to terminate user session
const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/users/logout",
    });

    // Correct comparison operator for status check
    if (res.data.status === "success") {
      location.reload(true);
    }
  } catch (error) {
    showAlert("error", "Error logging out! Please try again.");
  }
};

// Export functions for use in other modules
module.exports = {
  login,
  logout,
};
