// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import * as authApi from '../api/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'admin' | 'employee') => Promise<boolean>;
  sendRegisterOTP: (email: string) => Promise<boolean>;
  verifyRegisterOTP: (email: string, code: string) => Promise<boolean>;
  sendForgotOTP: (email: string) => Promise<boolean>;
  verifyForgotOTP: (email: string, code: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await authApi.getMe();
          setUser(data);
        } catch (err) {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchCurrentUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await authApi.login(email, password);
      setUser(data);
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, role: 'admin' | 'employee'): Promise<boolean> => {
    try {
      const data = await authApi.register(name, email, password, role);
      setUser(data);
      return true;
    } catch (err) {
      console.error('Registration failed:', err);
      return false;
    }
  };

  const sendRegisterOTP = async (email: string): Promise<boolean> => {
    try {
      await authApi.sendRegisterOTP(email);
      return true;
    } catch (err) {
      console.error('Send register OTP failed:', err);
      return false;
    }
  };

  const verifyRegisterOTP = async (email: string, code: string): Promise<boolean> => {
    try {
      await authApi.verifyRegisterOTP(email, code);
      return true;
    } catch (err) {
      console.error('Verify register OTP failed:', err);
      return false;
    }
  };

  const sendForgotOTP = async (email: string): Promise<boolean> => {
    try {
      await authApi.sendForgotOTP(email);
      return true;
    } catch (err) {
      console.error('Send forgot OTP failed:', err);
      return false;
    }
  };

  const verifyForgotOTP = async (email: string, code: string, newPassword: string): Promise<boolean> => {
    try {
      await authApi.verifyForgotOTP(email, code, newPassword);
      return true;
    } catch (err) {
      console.error('Verify forgot OTP failed:', err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      register,
      sendRegisterOTP,
      verifyRegisterOTP,
      sendForgotOTP,
      verifyForgotOTP
    }}>
      {children}
    </AuthContext.Provider>
  );
};
