import { usePathname, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = false;

  return (
    <SafeAreaView style={styles.container}>
      {!isLoggedIn && (
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/threads-logo.png")}
            style={styles.headerLogo}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
      {isLoggedIn && (
        <View style={styles.tabContainer}>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.replace(`/`)}>
              <Text style={{ color: pathname === "/" ? "#007AFF" : "black" }}>
                For you
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.replace(`/following`)}>
              <Text
                style={{
                  color: pathname === "/following" ? "#007AFF" : "black",
                }}
              >
                Following
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
