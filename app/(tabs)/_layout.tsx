import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs, usePathname, useRouter } from "expo-router";
import { useContext, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { AuthContext } from "../_layout";

const AnimatedTabBarButton = ({
  children,
  onPress,
  style,
  ref,
  ...restProps
}: BottomTabBarButtonProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressOut = () => {
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1.2,
        useNativeDriver: true,
        speed: 200,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        speed: 200,
      }),
    ]).start();
  };

  return (
    <Pressable
      {...restProps}
      onPress={onPress}
      onPressOut={handlePressOut}
      style={[styles.tabBarButton, style]}
      android_ripple={{ borderless: false, radius: 0 }}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const toLoginPage = () => {
    router.push("/login");
  };

  return (
    <>
      <Tabs
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarButton: (props) => <AnimatedTabBarButton {...props} />,
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#101010" : "#fff",
            borderTopColor: colorScheme === "dark" ? "#333" : "#e0e0e0",
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "planet" : "planet-outline"}
                color={
                  focused
                    ? "#007AFF"
                    : colorScheme === "dark"
                    ? "white"
                    : "black"
                }
                size={26}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                color={
                  focused
                    ? "#007AFF"
                    : colorScheme === "dark"
                    ? "white"
                    : "black"
                }
                size={26}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              if (isLoggedIn) {
                router.navigate("/modal");
              } else {
                openLoginModal();
              }
            },
          }}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <View
                style={[
                  styles.addButtonContainer,
                  {
                    backgroundColor:
                      colorScheme === "dark" ? "#2C2C2E" : "#E5E5EA",
                  },
                ]}
              >
                <Ionicons
                  name="add"
                  color={
                    focused
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black"
                  }
                  size={26}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="activity"
          listeners={{
            tabPress: (e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                openLoginModal();
              }
            },
          }}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                color={
                  focused
                    ? "#007AFF"
                    : colorScheme === "dark"
                    ? "white"
                    : "black"
                }
                size={26}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="[username]"
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              if (isLoggedIn) {
                router.push(`/@${user.id}`);
              } else {
                openLoginModal();
              }
            },
          }}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => {
              const isMyProfile = user?.id === pathname?.slice(2);
              return (
                <Ionicons
                  name={focused && isMyProfile ? "person" : "person-outline"}
                  color={
                    focused && isMyProfile
                      ? "#007AFF"
                      : colorScheme === "dark"
                      ? "white"
                      : "black"
                  }
                  size={26}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="(post)/[username]/post/[postId]"
          options={{
            tabBarLabel: () => null,
            href: null,
          }}
        />
      </Tabs>
      <Modal
        visible={isLoginModalOpen}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: colorScheme === "dark" ? "#101010" : "white",
              },
            ]}
          >
            <Pressable onPress={toLoginPage}>
              <Text
                style={[
                  styles.modalText,
                  { color: colorScheme === "dark" ? "white" : "black" },
                ]}
              >
                Login Modal
              </Text>
            </Pressable>
            <TouchableOpacity onPress={closeLoginModal}>
              <Ionicons
                name="close"
                size={24}
                color={colorScheme === "dark" ? "white" : "#555"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  tabBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  addButtonContainer: {
    borderRadius: 8,
    width: 46,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 20,
  },
  modalText: {},
});
