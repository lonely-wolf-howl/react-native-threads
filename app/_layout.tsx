import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { createContext, useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  description: string;
  profileImageUrl: string;
  link?: string;
  showInstagramBadge?: boolean;
  isPrivate?: boolean;
}

export const AuthContext = createContext<{
  user?: User | null;
  login?: () => void;
  logout?: () => void;
  updateUser?: (user: User) => void;
}>({});

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: "username",
        password: "password",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        return Promise.all([
          SecureStore.setItem("accessToken", data.accessToken),
          SecureStore.setItem("refreshToken", data.refreshToken),
          AsyncStorage.setItem("user", JSON.stringify(data.user)),
        ]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const logout = () => {
    setUser(null);
    return Promise.all([
      SecureStore.deleteItemAsync("accessToken"),
      SecureStore.deleteItemAsync("refreshToken"),
      AsyncStorage.removeItem("user"),
    ]);
  };

  const updateUser = (user: User) => {
    setUser(user);
    AsyncStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => {
      if (user) {
        setUser(JSON.parse(user));
      }
    });
    // todo: verify access token
  }, []);

  return (
    <AuthContext value={{ user, login, logout, updateUser }}>
      <StatusBar style="auto" animated={true} translucent={false} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "transparentModal",
            animation: "fade",
          }}
        />
      </Stack>
    </AuthContext>
  );
}
