/* eslint-disable */

const axios = require("axios");
const { showAlert } = require("./alerts");

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
      data: {
        email,
        password,
      },
    });

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

const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/users/logout",
    });

    if ((res.data.status = "success")) location.reload(true);
  } catch (error) {
    showAlert("error", "Error logging out! Try again.");
  }
};

// export const signup = async (email, password) => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: 'http://127.0.0.1:3000/api/v1/users/signup',
//       data: {
//         fullname,
//         email,
//         password
//       }
//     });

//     if (res.data.status === 'success') {
//       showAlert('success', 'Logged in successfully!');
//       window.setTimeout(() => {
//         location.assign('/login');
//       }, 1500);
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };

// export const logout = async () => {
//   try {
//     const res = await axios({
//       method: 'GET',
//       url: 'http://127.0.0.1:3000/api/v1/users/logout'
//     });
//     if ((res.data.status = 'success')) location.reload(true);
//   } catch (err) {
//     console.log(err.response);
//     showAlert('error', 'Error logging out! Try again.');
//   }
// };

module.exports = {
  login,
  logout,
};
