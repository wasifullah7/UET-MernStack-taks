import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthResponse, LoginData, RegisterData, User } from '../types/auth';

interface AuthContextProps {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Use a relative URL in production (Vercel) and the full URL in development
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:8080/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(`${API_URL}/user/profile`, config);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      localStorage.removeItem('token');
      setToken(null);
      setIsAuthenticated(false);
      setError('Authentication error');
    }
    setLoading(false);
  };

  const login = async (data: LoginData) => {
    try {
      setLoading(true);
      const res = await axios.post<AuthResponse>(`${API_URL}/auth/login`, data);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setError('Invalid credentials');
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
    }
    setLoading(false);
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      console.log('Sending registration request with data:', data);
      const response = await axios.post(`${API_URL}/auth/register`, data);
      console.log('Registration response:', response.data);
      setError(null);
      // Login the user after successful registration
      await login({ email: data.email, password: data.password });
    } catch (err: any) {
      console.error('Registration error:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.error || 'Registration failed');
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 