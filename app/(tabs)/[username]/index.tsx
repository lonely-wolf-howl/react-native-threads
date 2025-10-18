import { FlashList } from "@shopify/flash-list";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { AuthContext } from "../../../app/_layout";
import PostComponent from "../../../components/Post";

const Header = () => {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const { user } = useContext(AuthContext);

  return pathname === "/@" + user?.id ? (
    <View style={styles.postInputContainer}>
      <Image
        source={{ uri: user?.profileImageUrl }}
        style={styles.profileAvatar}
      />
      <Text
        style={
          colorScheme === "dark"
            ? styles.postInputTextDark
            : styles.postInputTextLight
        }
      >
        What&apos;s new?
      </Text>
      <Pressable
        onPress={() => {
          router.navigate("/modal");
        }}
        style={[
          styles.postButton,
          colorScheme === "dark"
            ? styles.postButtonDark
            : styles.postButtonLight,
        ]}
      >
        <Text
          style={[
            styles.postButtonText,
            colorScheme === "dark"
              ? styles.postButtonTextDark
              : styles.postButtonTextLight,
          ]}
        >
          Post
        </Text>
      </Pressable>
    </View>
  ) : null;
};

export default function Index() {
  const colorScheme = useColorScheme();
  const { username } = useLocalSearchParams();
  const [threads, setThreads] = useState<any[]>([]);

  useEffect(() => {
    const userId = username?.toString().slice(1);

    if (!userId) {
      setThreads([]);
      return;
    }

    setThreads([]);

    fetch(`/users/${userId}/threads`)
      .then((res) => res.json())
      .then((data) => {
        setThreads(data.posts || []);
      })
      .catch((error) => {
        console.error(error);
        setThreads([]);
      });
  }, [username]);

  const onEndReached = () => {
    const userId = username?.toString().slice(1);
    const lastPostId = threads.at(-1)?.id;

    if (!userId || !lastPostId) return;

    fetch(`/users/${userId}/threads?cursor=${lastPostId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) {
          setThreads((prev) => [...prev, ...data.posts]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <FlashList
        data={threads}
        ListHeaderComponent={<Header />}
        renderItem={({ item }) => <PostComponent item={item} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={2}
      />
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
  postInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#aaa",
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: -4,
    marginRight: 10,
  },
  postInputTextLight: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
  postInputTextDark: {
    color: "#aaa",
    fontSize: 16,
    fontWeight: "600",
  },
  postButton: {
    position: "absolute",
    right: 16,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 22,
  },
  postButtonLight: {
    backgroundColor: "black",
  },
  postButtonDark: {
    backgroundColor: "white",
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: "800",
  },
  postButtonTextLight: {
    color: "white",
  },
  postButtonTextDark: {
    color: "black",
  },
});
