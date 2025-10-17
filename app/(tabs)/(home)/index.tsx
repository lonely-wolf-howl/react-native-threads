import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import PostComponent, { Post } from "../../../components/Post";

export default function Index() {
  const colorScheme = useColorScheme();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/posts");
      const data = await response.json();
      setPosts(data.posts);
    } catch (err) {
      setError("Failed to load posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.centerContainer,
          colorScheme === "dark" ? styles.containerDark : styles.containerLight,
        ]}
      >
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.centerContainer,
          colorScheme === "dark" ? styles.containerDark : styles.containerLight,
        ]}
      >
        <Text style={{ color: colorScheme === "dark" ? "#fff" : "#000" }}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      nestedScrollEnabled
      style={[
        styles.container,
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      {posts.map((post) => (
        <PostComponent key={post.id} item={post} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerDark: {
    backgroundColor: "#101010",
  },
  containerLight: {
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});
