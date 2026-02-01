/**
 * Auth API Layer
 * src/api/authApi.js
 */

import api from "./axiosInstance";

/**
 * Login Request
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ accessToken: string }>}
 */
export const loginReq = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

/**
 * Signup Request
 * @param {{ email: string, password: string }} userData
 */
export const signupReq = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

/**
 * Silent Refresh
 * Uses refresh cookie automatically
 */
export const refreshReq = async () => {
  const response = await api.post("/auth/refresh");
  return response.data;
};

/**
 * Logout Request
 */
export const logoutReq = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

/**
 * Get Current User
 */
export const getMeReq = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
