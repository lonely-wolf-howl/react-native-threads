import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
  const insets = useSafeAreaInsets();
  const isLoggedIn = false;

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  const onLogin = () => {
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
        return Promise.all([
          SecureStore.setItem("accessToken", data.accessToken),
          SecureStore.setItem("refreshToken", data.refreshToken),
          AsyncStorage.setItem("user", JSON.stringify(data.user)),
        ]);
      })
      .then(() => {
        router.push("/(tabs)");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <View style={{ paddingTop: insets.top }}>
      <Pressable onPress={() => router.back()}>
        <Text>Back</Text>
      </Pressable>
      <Pressable style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 14,
    width: 100,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
  },
});
