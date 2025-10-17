import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostComponent, { Post } from "../../../../../components/Post";
import SideMenu from "../../../../../components/SideMenu";

export default function PostScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { postId } = useLocalSearchParams();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndReplies = async () => {
      try {
        setLoading(true);
        const [postResponse, repliesResponse] = await Promise.all([
          fetch(`/posts/${postId}`),
          fetch(`/posts/${postId}/replies`),
        ]);
        const postData = await postResponse.json();
        const repliesData = await repliesResponse.json();
        setPost(postData.post);
        setReplies(repliesData.replies);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostAndReplies();
    }
  }, [postId]);

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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={colorScheme === "dark" ? "#fff" : "#000"}
          />
        </View>
      ) : post ? (
        <ScrollView style={styles.scrollView}>
          <PostComponent item={post} />
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
          {replies.map((reply) => (
            <PostComponent key={reply.id} item={reply} />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={{ color: colorScheme === "dark" ? "#fff" : "#000" }}>
            Post not found
          </Text>
        </View>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
