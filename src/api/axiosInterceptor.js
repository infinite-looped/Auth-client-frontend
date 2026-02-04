import api from "./axiosInstance";
import { refreshReq } from "./authApi";

// Module-scope token (secure in-memory storage)
let authToken = null;

// Prevent duplicate interceptor registration (important in React StrictMode)
let isInterceptorSetup = false;

/**
 * Setup Axios interceptors for auth handling
 * @param {Object} params
 * @param {Function} params.setAccessToken
 * @param {Function} params.logout
 */
export const setupAxiosInterceptors = ({ setAccessToken, logout }) => {
  if (isInterceptorSetup) return;
  isInterceptorSetup = true;

  // REQUEST INTERCEPTOR
  api.interceptors.request.use(
    (config) => {
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // RESPONSE INTERCEPTOR
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Handle expired access token
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/auth/refresh")
      ) {
        originalRequest._retry = true;

        try {
          // Attempt refresh
          const res = await refreshReq();
          const newAccessToken = res.accessToken;

          // Sync token everywhere
          authToken = newAccessToken;
          setAccessToken(newAccessToken);

          // Retry original request
          originalRequest.headers.Authorization =
            `Bearer ${newAccessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed → force logout
          authToken = null;
          await logout();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

/**
 * Sync token into interceptor from AuthContext
 * Call this after login / refresh
 */
export const setInterceptorToken = (token) => {
  authToken = token;
};
