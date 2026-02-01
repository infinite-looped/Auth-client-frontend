import { createContext, useEffect, useState } from "react";


import {
  loginReq,
  refreshReq,
  logoutReq,
  getMeReq,
} from "../../../api/authApi";
import {
  setupAxiosInterceptors,
  setInterceptorToken,
} from "../../../api/axiosInterceptor";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGOUT (defined early so interceptor can use it)
  const logout = async () => {
    try {
      await logoutReq();
    } finally {
      setUser(null);
      setAccessToken(null);
      setInterceptorToken(null);
    }
  };

  // Register interceptors ONCE
  useEffect(() => {
    setupAxiosInterceptors({
      setAccessToken,
      logout,
    });
  }, []);

  // LOGIN
  const login = async (credentials) => {
    const res = await loginReq(credentials);

    setInterceptorToken(res.accessToken);
    setAccessToken(res.accessToken);

    const me = await getMeReq();
    setUser(me.user);
  };

  // REFRESH SESSION
  const refresh = async () => {
    try {
      const res = await refreshReq();

      setInterceptorToken(res.accessToken);
      setAccessToken(res.accessToken);

      const me = await getMeReq();
      setUser(me.user);
    } catch {
      setUser(null);
      setAccessToken(null);
      setInterceptorToken(null);
    } finally {
      setLoading(false);
    }
  };

  // Silent session restore on app load
  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
