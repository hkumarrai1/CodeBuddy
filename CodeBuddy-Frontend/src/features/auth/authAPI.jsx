// src/features/auth/authAPI.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (userData) => {
  console.log("Payload sent to backend:", userData);
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    // Extract backend message safely
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    // Extract backend message safely
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
