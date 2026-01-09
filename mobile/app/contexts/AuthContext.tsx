import * as SecureStore from "expo-secure-store";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../utils/api";

export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
  is_active: boolean;
  is_staff: boolean;
  profile_pic_id: string | null;
  profile_pic_url: string | null;
  code: string;
  twofa_enabled: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
  setTokens: (tokens: { access: string; refresh: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("access_token");
      const storedUser = await SecureStore.getItemAsync("user");
      if (token && storedUser) setUser(JSON.parse(storedUser));
    })();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await api.post("/api/users/login/", { username, password });
    const { access, refresh } = response.data;
    await setTokens({ access, refresh });

    const userResponse = await api.get("/api/users/", {
      headers: { Authorization: `Bearer ${access}` },
    });

    const u = {
      ...userResponse.data.user,
      twofa_enabled: userResponse.data.user.profile.twofa_enabled,
      profile_pic_id: userResponse.data.user.profile.profile_pic_id,
      profile_pic_url: userResponse.data.user.profile.profile_pic_url,
    };

    setUser(u);
    await SecureStore.setItemAsync("user", JSON.stringify(u));
  };

  const logout = async () => {
    setUser(null);
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    await SecureStore.deleteItemAsync("user");
  };

  const getAccessToken = async () => {
    return await SecureStore.getItemAsync("access_token");
  };

  const setTokens = async ({ access, refresh }: { access: string; refresh: string }) => {
    await SecureStore.setItemAsync("access_token", access);
    await SecureStore.setItemAsync("refresh_token", refresh);
  };

  return <AuthContext.Provider value={{ user, login, logout, getAccessToken, setTokens }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
