import { FlashList } from "@shopify/flash-list";
import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import PostComponent, { Post } from "../../../components/Post";

export default function Index() {
  const colorScheme = useColorScheme();
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch("/posts");
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error(error);
      setPosts([]);
    }
  }, []);

  const onEndReached = useCallback(() => {
    const lastPostId = posts.at(-1)?.id;

    if (!lastPostId) return;

    fetch(`/posts?cursor=${lastPostId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) {
          setPosts((prev) => [...prev, ...data.posts]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [posts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await fetchPosts();
    setRefreshing(false);
  }, [fetchPosts]);

  const renderItem = useCallback(
    ({ item }: { item: Post }) => <PostComponent item={item} />,
    []
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);

  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <FlashList
        data={posts}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        onEndReachedThreshold={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});
