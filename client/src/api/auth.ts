// api/auth.ts
'use client';
import axios from './axios';
import type { User } from '../types';

export const login = async (email: string, password: string): Promise<User> => {
  const { data } = await axios.post('/auth/login', { email, password });
  localStorage.setItem('token', data.token);
  return data;
};

// Registration step 1: send OTP
export const sendRegisterOTP = async (email: string) => {
  const { data } = await axios.post('/otp/register/send-otp', { email });
  return data;
};

// Registration step 2: verify OTP
export const verifyRegisterOTP = async (email: string, code: string) => {
  const { data } = await axios.post('/otp/register/verify-otp', { email, code });
  return data;
};

// Registration step 3: complete registration
export const register = async (
  name: string,
  email: string,
  password: string,
  role: 'admin' | 'employee'
): Promise<User> => {
  const { data } = await axios.post('/auth/register', { name, email, password, role });
  localStorage.setItem('token', data.token);
  return data;
};

// Forgot password flows
export const sendForgotOTP = async (email: string) => {
  const { data } = await axios.post('/otp/forgot/send-otp', { email });
  return data;
};

export const verifyForgotOTP = async (email: string, code: string, newPassword: string) => {
  const { data } = await axios.post('/otp/forgot/verify-otp', { email, code, newPassword });
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await axios.get('/auth/me');
  return data;
};
