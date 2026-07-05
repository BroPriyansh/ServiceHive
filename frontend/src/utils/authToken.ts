import type { User } from '../types';

const TOKEN_KEY = 'servicehive-token';
const USER_KEY = 'servicehive-user';

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;

  if (typeof window === 'undefined') {
    return;
  }

  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const getAuthToken = () => {
  if (authToken) {
    return authToken;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  const storedToken = localStorage.getItem(TOKEN_KEY);
  authToken = storedToken;
  return authToken;
};

export const setAuthUser = (user: User | null) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
};

export const getAuthUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    return null;
  }
};

export const clearAuthToken = () => {
  authToken = null;

  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
