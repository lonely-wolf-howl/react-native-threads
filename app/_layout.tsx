import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useState } from "react";

export const AuthContext = createContext<{
  user?: object | null;
  login?: () => void;
  logout?: () => void;
}>({});

export default function RootLayout() {
  const [user, setUser] = useState(null);

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

  return (
    <AuthContext value={{ user, login, logout }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </AuthContext>
  );
}
