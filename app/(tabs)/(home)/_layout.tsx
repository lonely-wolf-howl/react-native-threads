import { Slot, usePathname, useRouter } from "expo-router";
import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../_layout";

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/threads-logo.png")}
          style={styles.headerLogo}
        />
        {!isLoggedIn && (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoggedIn && (
        <View style={styles.tabContainer}>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.push(`/`)}>
              <Text
                style={{
                  color: pathname === "/" ? "#007AFF" : "black",
                  fontWeight: "600",
                }}
              >
                For you
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.push(`/following`)}>
              <Text
                style={{
                  color: pathname === "/following" ? "#007AFF" : "black",
                  fontWeight: "600",
                }}
              >
                Following
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  headerLogo: {
    width: 36,
    height: 36,
  },
  loginButton: {
    position: "absolute",
    right: 20,
    top: 0,
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
