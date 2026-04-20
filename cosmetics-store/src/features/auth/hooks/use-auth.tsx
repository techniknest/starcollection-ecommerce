"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  isVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to refresh the access token
  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const res = await fetch("/api/auth/refresh", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        const newToken = data.accessToken;
        localStorage.setItem("access_token", newToken);
        setAccessToken(newToken);
        return newToken;
      } else {
        // If refresh fails, the user is effectively logged out
        handleLogoutCleanup();
        return null;
      }
    } catch (err) {
      console.error("Token refresh failed", err);
      return null;
    }
  };

  const handleLogoutCleanup = () => {
    localStorage.removeItem("access_token");
    setAccessToken(null);
    setUser(null);
  };

  // Initial Auth Check
  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("access_token");
      
      if (!token) {
        // Even if no local token, try refreshing (maybe user has valid cookie)
        const refreshedToken = await refreshAccessToken();
        if (!refreshedToken) {
           setIsLoading(false);
           return;
        }
      } else {
        setAccessToken(token);
      }

      try {
        // Fetch current user data with existing or newly refreshed token
        const currentToken = localStorage.getItem("access_token");
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${currentToken}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else if (res.status === 401) {
          // Token might be expired, try one last refresh
          const retryToken = await refreshAccessToken();
          if (retryToken) {
             const retryRes = await fetch("/api/auth/me", {
               headers: { Authorization: `Bearer ${retryToken}` },
             });
             if (retryRes.ok) {
               const retryData = await retryRes.json();
               setUser(retryData.user);
             }
          }
        }
      } catch (err) {
        console.error("Failed to fetch current user", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  // Silent Refresh Interval (Every 10 minutes)
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      console.log("AuthProvider: Performing silent token refresh...");
      refreshAccessToken();
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, [user]);

  const login = (token: string, userData: User) => {
    localStorage.setItem("access_token", token);
    setAccessToken(token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout request failed", err);
    }
    handleLogoutCleanup();
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
