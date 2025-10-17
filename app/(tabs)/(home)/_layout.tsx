import { Ionicons } from "@expo/vector-icons";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { useRouter, withLayoutContext } from "expo-router";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SideMenu from "../../../components/SideMenu";
import { AuthContext } from "../../_layout";
import Index from "./index";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorScheme === "dark" ? "#101010" : "#fff",
          paddingTop: insets.top,
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
        <SideMenu
          isVisible={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
      </View>
      {isLoggedIn ? (
        <MaterialTopTabs
          screenOptions={{
            lazy: true,
            lazyPreloadDistance: 1,
            tabBarStyle: {
              backgroundColor: colorScheme === "dark" ? "#101010" : "#fff",
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            tabBarLabelStyle: {
              fontWeight: "600",
              fontSize: 14,
              textTransform: "none",
            },
            tabBarActiveTintColor: "#007AFF",
            tabBarInactiveTintColor: colorScheme === "dark" ? "white" : "black",
            tabBarIndicatorStyle: {
              backgroundColor: "#007AFF",
              height: 2,
            },
            tabBarPressColor: "transparent",
          }}
        >
          <MaterialTopTabs.Screen name="index" options={{ title: "For you" }} />
          <MaterialTopTabs.Screen
            name="following"
            options={{ title: "Following" }}
          />
        </MaterialTopTabs>
      ) : (
        <Index />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
