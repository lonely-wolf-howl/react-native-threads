import { Ionicons } from "@expo/vector-icons";
import { Slot, usePathname, useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SideMenu from "../../../components/SideMenu";
import { AuthContext } from "../../_layout";

export default function Layout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: colorScheme === "dark" ? "#101010" : "#fff",
        },
      ]}
    >
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
          style={[
            styles.headerLogo,
            { tintColor: colorScheme === "dark" ? "white" : undefined },
          ]}
        />
        {!isLoggedIn && (
          <TouchableOpacity
            style={[
              styles.loginButton,
              { backgroundColor: colorScheme === "dark" ? "white" : "black" },
            ]}
            onPress={() => router.replace("/login")}
          >
            <Text
              style={[
                styles.loginButtonText,
                { color: colorScheme === "dark" ? "black" : "white" },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoggedIn && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabScrollContainer}
          contentContainerStyle={styles.tabContainer}
        >
          <TouchableOpacity
            onPress={() => router.push(`/activity`)}
            style={[
              styles.tab,
              pathname === "/activity" && styles.tabActive,
              {
                borderColor:
                  pathname === "/activity"
                    ? "#007AFF"
                    : colorScheme === "dark"
                    ? "#333"
                    : "#ddd",
              },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    pathname === "/activity"
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black",
                },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push(`/activity/follows`)}
            style={[
              styles.tab,
              pathname === "/activity/follows" && styles.tabActive,
              {
                borderColor:
                  pathname === "/activity/follows"
                    ? "#007AFF"
                    : colorScheme === "dark"
                    ? "#333"
                    : "#ddd",
              },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    pathname === "/activity/follows"
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black",
                },
              ]}
            >
              Follows
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push(`/activity/replies`)}
            style={[
              styles.tab,
              pathname === "/activity/replies" && styles.tabActive,
              {
                borderColor:
                  pathname === "/activity/replies"
                    ? "#007AFF"
                    : colorScheme === "dark"
                    ? "#333"
                    : "#ddd",
              },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    pathname === "/activity/replies"
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black",
                },
              ]}
            >
              Replies
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push(`/activity/mentions`)}
            style={[
              styles.tab,
              pathname === "/activity/mentions" && styles.tabActive,
              {
                borderColor:
                  pathname === "/activity/mentions"
                    ? "#007AFF"
                    : colorScheme === "dark"
                    ? "#333"
                    : "#ddd",
              },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    pathname === "/activity/mentions"
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black",
                },
              ]}
            >
              Mentions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push(`/activity/quotes`)}
            style={[
              styles.tab,
              pathname === "/activity/quotes" && styles.tabActive,
              {
                borderColor:
                  pathname === "/activity/quotes"
                    ? "#007AFF"
                    : colorScheme === "dark"
                    ? "#333"
                    : "#ddd",
              },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    pathname === "/activity/quotes"
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black",
                },
              ]}
            >
              Quotes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push(`/activity/reposts`)}
            style={[
              styles.tab,
              pathname === "/activity/reposts" && styles.tabActive,
              {
                borderColor:
                  pathname === "/activity/reposts"
                    ? "#007AFF"
                    : colorScheme === "dark"
                    ? "#333"
                    : "#ddd",
              },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    pathname === "/activity/reposts"
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black",
                },
              ]}
            >
              Reposts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push(`/activity/verified`)}
            style={[
              styles.tab,
              pathname === "/activity/verified" && styles.tabActive,
              {
                borderColor:
                  pathname === "/activity/verified"
                    ? "#007AFF"
                    : colorScheme === "dark"
                    ? "#333"
                    : "#ddd",
              },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    pathname === "/activity/verified"
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black",
                },
              ]}
            >
              Verified
            </Text>
          </TouchableOpacity>
        </ScrollView>
        
      )}
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabScrollContainer: {
    flexGrow: 0,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    gap: 8,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 2,
  },
  tabActive: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
  },
  tabText: {
    fontWeight: "600",
    fontSize: 14,
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
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  loginButtonText: {
    fontWeight: "600",
  },
});
