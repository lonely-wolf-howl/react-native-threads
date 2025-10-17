import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostComponent from "../../../../../components/Post";
import SideMenu from "../../../../../components/SideMenu";

export default function PostScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <View
        style={[
          styles.header,
          colorScheme === "dark" ? styles.headerDark : styles.headerLight,
        ]}
      >
        {router.canGoBack() ? (
          <Pressable
            style={styles.menuButton}
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={colorScheme === "dark" ? "#ccc" : "#000"}
            />
          </Pressable>
        ) : (
          <Pressable
            style={styles.menuButton}
            onPress={() => {
              setIsSideMenuOpen(true);
            }}
          >
            <Ionicons
              name="menu"
              size={24}
              color={colorScheme === "dark" ? "#ccc" : "#000"}
            />
          </Pressable>
        )}
        <Image
          source={require("@/assets/images/threads-logo.png")}
          style={[
            styles.logo,
            { tintColor: colorScheme === "dark" ? "white" : undefined },
          ]}
        />
        <SideMenu
          isVisible={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <PostComponent
          item={{
            id: "0",
            username: "arnold",
            displayName: "Arnold",
            content: "Hello, World!",
            timeAgo: "30 minutes ago",
            likes: 11,
            comments: 2,
            reposts: 1,
            isVerified: true,
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            images: [`https://picsum.photos/id/29/800/600`],
          }}
        />
        <View
          style={[
            styles.repliesHeader,
            {
              borderBottomColor: colorScheme === "dark" ? "#333" : "#e0e0e0",
            },
          ]}
        >
          <Text
            style={[
              styles.repliesHeaderText,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}
          >
            Replies
          </Text>
        </View>
        <PostComponent
          item={{
            id: "0",
            username: "sabrina",
            displayName: "Sabrina",
            content: "Hello, Arnold!",
            timeAgo: "10 minutes ago",
            likes: 1,
            comments: 0,
            reposts: 0,
            isVerified: true,
            avatar:
              "https://townsquare.media/site/252/files/2024/06/attachment-Sabrina-Carpenter.jpg?w=1200&q=75&format=natural",
          }}
        />
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  headerLight: {
    backgroundColor: "white",
  },
  headerDark: {
    backgroundColor: "#101010",
  },
  menuButton: {
    position: "absolute",
    top: 8,
    left: 16,
  },
  logo: {
    width: 36,
    height: 36,
  },
  repliesHeader: {
    height: 50,
    paddingLeft: 16,
    borderBottomWidth: 1,
    justifyContent: "center",
    borderBottomColor: "#e0e0e0",
  },
  repliesHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
