/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useContext, useEffect } from "react";
import { login } from "../services/AuthService";
import {
  differenceInSeconds,
  differenceInMinutes,
  fromUnixTime,
  isBefore,
} from "date-fns";
import jwtDecode from "jwt-decode";
import api from "../services/api";
import { useTheme } from "./theme";

interface IAuthContext {
  logged: boolean;
  message: string;
  user: User;
  token: string;
  signIn(email: string, password: string): void;
  signOut(): void;
}
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  avatar_url: string | null;
}
export interface JWT {
  sub: string;
  exp: number;
  iat: number;
  distinguishedName: string;
  [propName: string]: any;
}
const initialUser: User = {
  id: "",
  name: "",
  email: "",
  avatar: "",
  created_at: null,
  updated_at: null,
  avatar_url: "",
};

const STORAGE_KEY = "@TRUE_COMMERCE";
const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState<string>("");
  const { setLoading } = useTheme();

  const [logged, setLogged] = useState<boolean>(() => {
    const isLoggedString = localStorage.getItem(`${STORAGE_KEY}:logged`);
    const isLogged = JSON.parse(isLoggedString || "false");
    return !!isLogged;
  });

  const [token, setToken] = useState<string>(() => {
    const token = localStorage.getItem(`${STORAGE_KEY}:token`);
    return token || "";
  });

  const [user, setUser] = useState<User>(() => {
    const userString = localStorage.getItem(`${STORAGE_KEY}:user`);
    return userString ? JSON.parse(userString || "") : initialUser;
  });

  let checkSessionTimeoutID: number;

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}:logged`, JSON.stringify(logged));
    localStorage.setItem(`${STORAGE_KEY}:token`, token);
    localStorage.setItem(`${STORAGE_KEY}:user`, JSON.stringify(user));
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    if (token) validateToken();
  }, [logged, token, user]);

  const validateToken = async () => {
    const decodedToken: JWT = jwtDecode(token);
    const now = new Date();
    const jwtDate: Date = fromUnixTime(decodedToken.exp);

    if (isBefore(jwtDate, now)) {
      signOut();
    } else {
      const diffSeconds = differenceInSeconds(jwtDate, now);
      const diffMinutes = differenceInMinutes(jwtDate, now);
      clearInterval(checkSessionTimeoutID);
      checkSessionTimeoutID = setTimeout(
        () => validateToken(),
        diffSeconds * 1000
      );
      return { jwtDate, token, diffSeconds, diffMinutes };
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      setMessage("");
      const result = await login(email, password);
      setLogged(true);
      setToken(result.token);
      setUser(result.user);
    } catch (error) {
      console.log(error);
      setMessage("Email e/ou senha inválidos");
      signOut();
    }
    setLoading(false);
  };

  const signOut = () => {
    clearInterval(checkSessionTimeoutID);
    setToken("");
    setLogged(false);
    setUser(initialUser);
  };

  return (
    <AuthContext.Provider
      value={{ logged, message, user, token, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
