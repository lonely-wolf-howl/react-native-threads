import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import PostComponent from "../../../components/Post";

export default function Index() {
  const colorScheme = useColorScheme();

  return (
    <ScrollView
      nestedScrollEnabled
      style={[
        styles.container,
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
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
          images: [`https://picsum.photos/id/29/800/600`],
        }}
      />
      <PostComponent
        item={{
          id: "1",
          username: "jay",
          displayName: "Jay",
          content: "Come to visit my GitHub!",
          timeAgo: "1 hour ago",
          likes: 7,
          comments: 1,
          reposts: 6,
          link: "https://github.com/lonely-wolf-howl",
          linkThumbnail:
            "https://avatars.githubusercontent.com/u/130229450?v=4",
          isVerified: true,
          avatar: "https://avatars.githubusercontent.com/u/130229450?v=4",
        }}
      />
      <PostComponent
        item={{
          id: "2",
          username: "sabrina",
          displayName: "Sabrina",
          content: "Hello, World!",
          timeAgo: "2 hour ago",
          likes: 3,
          comments: 1,
          reposts: 3,
          isVerified: true,
          avatar:
            "https://townsquare.media/site/252/files/2024/06/attachment-Sabrina-Carpenter.jpg?w=1200&q=75&format=natural",
          images: [`https://picsum.photos/id/38/800/600`],
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
