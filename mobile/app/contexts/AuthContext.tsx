import * as SecureStore from "expo-secure-store";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Profile = {
  twofa_enabled: boolean;
  profile_pic_id: string | null;
  profile_pic_url: string | null;
};

export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
  is_active: boolean;
  code: string;
  profile: Profile;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (apiResponse: any) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore user and tokens on app start
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error restoring user:", err);
      } finally {
        setLoading(false);
      }
    };
    restoreUser();
  }, []);

  const login = async (apiResponse: any) => {
    try {
      const { user: apiUser, access, refresh } = apiResponse;

      const normalizedUser: User = {
        id: apiUser.id,
        username: apiUser.username,
        first_name: apiUser.first_name,
        last_name: apiUser.last_name,
        email: apiUser.email,
        date_joined: apiUser.date_joined,
        is_active: apiUser.is_active,
        code: apiUser.code,
        profile: {
          twofa_enabled: apiUser.profile.twofa_enabled,
          profile_pic_id: apiUser.profile.profile_pic_id,
          profile_pic_url: apiUser.profile.profile_pic_url,
        },
      };

      setUser(normalizedUser);

      // Save user and tokens in secure storage
      await SecureStore.setItemAsync("user", JSON.stringify(normalizedUser));
      await SecureStore.setItemAsync("accessToken", access);
      await SecureStore.setItemAsync("refreshToken", refresh);
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const logout = async () => {
    setUser(null);
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
  };

  const getAccessToken = async () => {
    return await SecureStore.getItemAsync("accessToken");
  };

  return <AuthContext.Provider value={{ user, loading, login, logout, getAccessToken }}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
