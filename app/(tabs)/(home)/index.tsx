import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import PostComponent from "../../../components/Post";

export default function Index() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#101010" : "#fff" },
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
      >
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
            image: `https://picsum.photos/id/29/800/600`,
          }}
        />
        <PostComponent
          item={{
            id: "1",
            username: "jay",
            displayName: "Jay",
            content: "Hello, World!",
            timeAgo: "1 hour ago",
            likes: 7,
            comments: 1,
            reposts: 6,
            isVerified: true,
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
          }}
        />
        <PostComponent
          item={{
            id: "2",
            username: "tom",
            displayName: "Tom",
            content: "Hello, World!",
            timeAgo: "2 hour ago",
            likes: 3,
            comments: 1,
            reposts: 3,
            isVerified: true,
            avatar: "https://randomuser.me/api/portraits/women/3.jpg",
            image: `https://picsum.photos/id/38/800/600`,
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
