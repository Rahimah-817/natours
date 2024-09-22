// Using ES Module syntax
import axios from "axios";
import { showAlert } from "./alerts"; // Ensure the path is correct

export const login = async (email, password) => {
  const API_URL =
    process.env.API_URL || "http://127.0.0.1:3000/api/v1/users/login";

  // Input validation
  if (!email || !password) {
    showAlert("error", "Please provide both email and password.");
    return;
  }

  try {
    const res = await axios.post(API_URL, { email, password });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    if (err.response) {
      showAlert("error", err.response.data.message || "An error occurred.");
    } else if (err.request) {
      showAlert("error", "No response from server.");
    } else {
      showAlert("error", "Request failed: " + err.message);
    }
  }
};

export const logout = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:3000/api/v1/users/logout");

    if (res.data.status === "success") {
      location.reload(true);
    }
  } catch (error) {
    showAlert("error", "Error logging out! Try again.");
  }
};
