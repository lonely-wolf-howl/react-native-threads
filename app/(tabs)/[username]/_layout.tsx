import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useLocalSearchParams, withLayoutContext } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext, User } from "../../../app/_layout";
import SideMenu from "../../../components/SideMenu";

const MaterialTopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);
  const { username } = useLocalSearchParams();
  const [profile, setProfile] = useState<User | null>(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const isLoggedIn = !!user;
  const isOwnProfile = isLoggedIn && user?.id === username?.slice(1);

  useEffect(() => {
    const userId = username?.toString().slice(1);

    if (!userId) {
      setProfile(user ?? null);
      return;
    }

    if (username !== `@${user?.id}`) {
      setProfile(null);
      fetch(`/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setProfile(data.user || null);
        })
        .catch((error) => {
          console.error(error);
          setProfile(null);
        });
    } else {
      setProfile(user ?? null);
    }
  }, [username, user]);

  // const handleToggleEditModal = () => {
  //   setIsEditModalVisible((prev) => !prev);
  // };

  const handleShareProfile = async () => {
    try {
      await Share.share({
        message: `thread://${username}`,
        url: `thread://${username}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
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
      </View>
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: profile?.profileImageUrl }}
            style={styles.profileAvatar}
          />
          <Text
            style={[
              styles.profileName,
              colorScheme === "dark"
                ? styles.profileNameDark
                : styles.profileNameLight,
            ]}
          >
            {profile?.name}
          </Text>
          <Text
            style={[
              { marginBottom: 16 },
              colorScheme === "dark"
                ? styles.profileTextDark
                : styles.profileTextLight,
            ]}
          >
            {profile?.id}
          </Text>
          <Text
            style={[
              colorScheme === "dark"
                ? styles.profileTextDark
                : styles.profileTextLight,
            ]}
          >
            {profile?.description}
          </Text>
        </View>
        <View style={styles.profileActions}>
          {isOwnProfile ? (
            <Pressable
              style={[
                styles.actionButton,
                colorScheme === "dark"
                  ? styles.actionButtonDark
                  : styles.actionButtonLight,
              ]}
              // onPress={handleToggleEditModal}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  colorScheme === "dark"
                    ? styles.actionButtonTextDark
                    : styles.actionButtonTextLight,
                ]}
              >
                Edit profile
              </Text>
            </Pressable>
          ) : (
            <Pressable
              style={[
                styles.actionButton,
                colorScheme === "dark"
                  ? styles.actionButtonDark
                  : styles.actionButtonLight,
              ]}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  colorScheme === "dark"
                    ? styles.actionButtonTextDark
                    : styles.actionButtonTextLight,
                ]}
              >
                Follow
              </Text>
            </Pressable>
          )}
          <Pressable
            style={[
              styles.actionButton,
              colorScheme === "dark"
                ? styles.actionButtonDark
                : styles.actionButtonLight,
            ]}
            onPress={handleShareProfile}
          >
            <Text
              style={[
                styles.actionButtonText,
                colorScheme === "dark"
                  ? styles.actionButtonTextDark
                  : styles.actionButtonTextLight,
              ]}
            >
              Share profile
            </Text>
          </Pressable>
        </View>
      </View>

      {/* {user && (
        <EditProfileModal
          visible={isEditModalVisible}
          onClose={handleToggleEditModal}
          initialProfileData={user}
        />
      )} */}
      <MaterialTopTabs
        screenOptions={{
          lazy: true,
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#101010" : "#fff",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
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
        <MaterialTopTabs.Screen name="index" options={{ title: "Threads" }} />
        <MaterialTopTabs.Screen name="replies" options={{ title: "Replies" }} />
        <MaterialTopTabs.Screen name="reposts" options={{ title: "Reposts" }} />
      </MaterialTopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLight: {
    backgroundColor: "white",
  },
  containerDark: {
    backgroundColor: "#101010",
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  headerLogo: {
    width: 36,
    height: 36,
  },
  menuButton: {
    position: "absolute",
    top: 8,
    left: 16,
  },
  profile: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  profileAvatar: {
    position: "absolute",
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileNameLight: {
    color: "black",
  },
  profileNameDark: {
    color: "white",
  },
  profileTextLight: {
    color: "black",
  },
  profileTextDark: {
    color: "white",
  },
  profileActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  actionButtonLight: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#333",
  },
  actionButtonDark: {
    backgroundColor: "#101010",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  actionButtonTextLight: {
    color: "#000",
  },
  actionButtonTextDark: {
    color: "#fff",
  },
});
