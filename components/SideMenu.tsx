import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import {
  Appearance,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../app/_layout";

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isVisible, onClose }) => {
  const { logout } = useContext(AuthContext);
  const colorScheme = useColorScheme();
  const [isAppearanceVisible, setIsAppearanceVisible] = useState(false);

  const showAppearance = () => {
    setIsAppearanceVisible(true);
  };

  const closeAppearance = () => {
    setIsAppearanceVisible(false);
  };

  const handleLogout = () => {
    logout?.();
    onClose();
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible && !isAppearanceVisible}
        onRequestClose={onClose} // Allows closing with back button on Android
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.touchableOverlay}
            activeOpacity={1}
            onPress={onClose}
          />

          <SafeAreaView
            style={[
              styles.menuContainer,
              colorScheme === "dark"
                ? styles.menuContainerDark
                : styles.menuContainerLight,
            ]}
          >
            <View style={styles.menuContent}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={showAppearance}
              >
                <Text
                  style={[
                    styles.menuText,
                    colorScheme === "dark"
                      ? styles.menuTextDark
                      : styles.menuTextLight,
                  ]}
                >
                  Appearance
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#888" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text
                  style={[
                    styles.menuText,
                    colorScheme === "dark"
                      ? styles.menuTextDark
                      : styles.menuTextLight,
                  ]}
                >
                  Insights
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text
                  style={[
                    styles.menuText,
                    colorScheme === "dark"
                      ? styles.menuTextDark
                      : styles.menuTextLight,
                  ]}
                >
                  Settings
                </Text>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity style={styles.menuItem}>
                <Text
                  style={[
                    styles.menuText,
                    colorScheme === "dark"
                      ? styles.menuTextDark
                      : styles.menuTextLight,
                  ]}
                >
                  Report a problem
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Text style={[styles.menuText, styles.logoutText]}>
                  Log out
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
      <Modal
        animationType="none"
        transparent={true}
        visible={isAppearanceVisible}
        onRequestClose={closeAppearance} // Allows closing with back button on Android
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.touchableOverlay}
            activeOpacity={1}
            onPress={closeAppearance}
          />
          <View
            style={[
              styles.appearanceContainer,
              colorScheme === "dark"
                ? styles.appearanceContainerDark
                : styles.appearanceContainerLight,
            ]}
          >
            <View style={styles.appearanceHeader}>
              <Pressable
                onPress={closeAppearance}
                style={styles.appearanceBackButton}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </Pressable>
              <Text
                style={[
                  styles.appearanceText,
                  colorScheme === "dark"
                    ? styles.appearanceTextDark
                    : styles.appearanceTextLight,
                ]}
              >
                Appearance
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                style={[
                  styles.appearanceButton,
                  colorScheme === "dark"
                    ? styles.appearanceButtonDark
                    : {
                        backgroundColor: "#888",
                      },
                ]}
                onPress={() => {
                  Appearance.setColorScheme("light");
                }}
              >
                <Ionicons
                  name="sunny"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </Pressable>
              <Pressable
                style={[
                  styles.appearanceButton,
                  colorScheme === "dark"
                    ? {
                        backgroundColor: "#888",
                      }
                    : styles.appearanceButtonLight,
                ]}
                onPress={() => {
                  Appearance.setColorScheme("dark");
                }}
              >
                <Ionicons
                  name="moon"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </Pressable>
              <Pressable
                style={[
                  styles.appearanceButton,
                  !["dark", "light"].includes(Appearance.getColorScheme() || "")
                    ? {
                        backgroundColor: "#888",
                      }
                    : colorScheme === "dark"
                    ? styles.appearanceButtonDark
                    : styles.appearanceButtonLight,
                ]}
                onPress={() => {
                  Appearance.setColorScheme(undefined);
                }}
              >
                <Text
                  style={[
                    styles.appearanceText,
                    colorScheme === "dark"
                      ? styles.appearanceTextDark
                      : styles.appearanceTextLight,
                  ]}
                >
                  Auto
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  touchableOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  menuContainer: {
    position: "absolute",
    top: 60,
    left: 10,
    width: "75%",
    maxWidth: 320,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    overflow: "hidden",
  },
  menuContainerLight: {
    backgroundColor: "white",
  },
  menuContainerDark: {
    backgroundColor: "#101010",
    borderWidth: 1,
    borderColor: "#202020",
  },
  menuContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 5,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
  },
  menuTextLight: {
    color: "black",
  },
  menuTextDark: {
    color: "white",
  },
  logoutText: {
    color: "#FF3B30",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#D1D1D6",
    marginVertical: 8,
    marginHorizontal: -15,
  },
  appearanceContainer: {
    position: "absolute",
    top: 60,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
  },
  appearanceContainerLight: {
    backgroundColor: "white",
    borderColor: "#ccc",
  },
  appearanceContainerDark: {
    backgroundColor: "#101010",
    borderColor: "#333",
  },
  appearanceHeader: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    padding: 10,
    paddingBottom: 30,
  },
  appearanceBackButton: {
    position: "absolute",
    top: 10,
    left: 0,
  },
  appearanceButton: {
    padding: 10,
    borderRadius: 10,
  },
  appearanceButtonLight: {
    backgroundColor: "white",
  },
  appearanceButtonDark: {
    backgroundColor: "#101010",
  },
  appearanceText: {
    fontSize: 16,
    fontWeight: "500",
  },
  appearanceTextLight: {
    color: "black",
  },
  appearanceTextDark: {
    color: "white",
  },
});

export default SideMenu;
