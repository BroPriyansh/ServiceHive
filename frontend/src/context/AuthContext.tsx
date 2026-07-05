import {
  createContext,
  useState,
} from 'react';

import type { ReactNode } from 'react';

import type { User } from '../types';
import {
  clearAuthToken,
  getAuthToken,
  getAuthUser,
  setAuthToken,
  setAuthUser,
} from '../utils/authToken';

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
  const [token, setToken] = useState<string | null>(() => getAuthToken());

  const [user, setUser] = useState<User | null>(() => getAuthUser());

  const login = (
    newToken: string,
    newUser: User
  ) => {
    setAuthToken(newToken);
    setAuthUser(newUser);

    setToken(newToken);

    setUser(newUser);
  };

  const logout = () => {
    clearAuthToken();

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