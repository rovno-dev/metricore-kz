"use client";

import { createContext, useState, useEffect, ReactNode } from 'react';
import { getTokens, clearTokens, refreshToken, setTokens } from '@/lib/api/auth';

interface User {
  id: string;
  email?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (tokens: { access_token: string; refresh_token: string } | { access: string; refresh: string }) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async (token: string) => {
    console.log('[Auth] Fetching user with token:', token ? token.substring(0, 10) + '...' : 'null');
    try {
      const res = await fetch('/api/main/v1/users/me', {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        console.log('[Auth] User fetch successful:', data);
        setUser(data);
      } else {
        console.warn('[Auth] User fetch failed:', res.status, res.statusText);
        // If 401, try to refresh token
        if (res.status === 401) {
          const refreshed = await refreshAccessToken();
          if (!refreshed) {
            logout();
          }
        }
      }
    } catch (e) {
      console.error('[Auth] User fetch error:', e);
    }
  };

  useEffect(() => {
    const { access, refresh } = getTokens();
    if (access && refresh) {
      document.cookie = `access_token=${access}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      fetchUser(access);
    }
    setIsLoading(false);
  }, []);

  const login = async (tokens: { access_token: string; refresh_token: string } | { access: string; refresh: string }) => {
    console.log('[Auth] Login called with tokens:', tokens);
    const access = 'access' in tokens ? tokens.access : tokens.access_token;
    const refresh = 'refresh' in tokens ? tokens.refresh : tokens.refresh_token;
    setTokens(access, refresh);
    document.cookie = `access_token=${access}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    await fetchUser(access);
  };

  const logout = () => {
    console.log('[Auth] Logout');
    clearTokens();
    document.cookie = 'access_token=; path=/; max-age=0; SameSite=Lax';
    setUser(null);
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    const { refresh } = getTokens();
    if (!refresh) {
      console.warn('[Auth] No refresh token available');
      return false;
    }
    try {
      console.log('[Auth] Attempting token refresh');
      const data = await refreshToken(refresh);
      console.log('[Auth] Refresh successful:', data);
      setTokens(data.access_token, refresh);
      document.cookie = `access_token=${data.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      await fetchUser(data.access_token);
      return true;
    } catch (e) {
      console.error('[Auth] Refresh failed:', e);
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
