import { Ionicons } from "@expo/vector-icons";
import { Slot, usePathname, useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SideMenu from "../../../components/SideMenu";
import { AuthContext } from "../../_layout";

export default function Layout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {isLoggedIn && (
          <Pressable
            style={styles.menuButton}
            onPress={() => {
              setIsSideMenuOpen(true);
            }}
          >
            <Ionicons
              name="menu"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
        )}
        <SideMenu
          isVisible={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
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
            <TouchableOpacity onPress={() => router.push(`/activity`)}>
              <Text
                style={{
                  color:
                    pathname === "/activity"
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black",
                  fontWeight: "600",
                }}
              >
                All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.push(`/activity/follows`)}>
              <Text
                style={{
                  color:
                    pathname === "/activity/follows"
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black",
                  fontWeight: "600",
                }}
              >
                Follows
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.push(`/activity/replies`)}>
              <Text
                style={{
                  color:
                    pathname === "/activity/replies"
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black",
                  fontWeight: "600",
                }}
              >
                Replies
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.push(`/activity/mentions`)}>
              <Text
                style={{
                  color:
                    pathname === "/activity/mentions"
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black",
                  fontWeight: "600",
                }}
              >
                Mentions
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.push(`/activity/quotes`)}>
              <Text
                style={{
                  color:
                    pathname === "/activity/quotes"
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black",
                  fontWeight: "600",
                }}
              >
                Quotes
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.push(`/activity/reposts`)}>
              <Text
                style={{
                  color:
                    pathname === "/activity/reposts"
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black",
                  fontWeight: "600",
                }}
              >
                Reposts
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.push(`/activity/verified`)}>
              <Text
                style={{
                  color:
                    pathname === "/activity/verified"
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black",
                  fontWeight: "600",
                }}
              >
                Verified
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
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  tab: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  menuButton: {
    position: "absolute",
    top: 8,
    left: 16,
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
