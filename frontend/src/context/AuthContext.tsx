import {
  createContext,
  useState,
} from 'react';

import type { ReactNode } from 'react';

import type { User } from '../types';

interface AuthContextType {
  user: User | null;

  token: string | null;

  login: (
    token: string,
    user: User
  ) => void;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  const [user, setUser] = useState<User | null>(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null
  );

  const login = (
    newToken: string,
    newUser: User
  ) => {
    localStorage.setItem('token', newToken);

    localStorage.setItem(
      'user',
      JSON.stringify(newUser)
    );

    setToken(newToken);

    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('token');

    localStorage.removeItem('user');

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;