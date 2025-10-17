import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export interface Post {
  id: string;
  username: string;
  displayName: string;
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
  reposts: number;
  isVerified?: boolean;
  avatar?: string;
  image?: string;
  location?: [number, number];
}

export interface DetailedPost extends Post {
  isLiked?: boolean;
  shares?: number;
}

export default function PostComponent({ item }: { item: Post }) {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleShare = async (username: string, postId: string) => {
    const shareUrl = `thread://@${username}/post/${postId}`;

    try {
      await Share.share({
        message: shareUrl,
        url: shareUrl,
      });
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const handlePostPress = (post: Post) => {
    router.push(`/@${post.username}/post/${post.id}`);
  };

  const handleUserPress = (post: Post) => {
    router.push(`/@${post.username}`);
  };

  return (
    <Pressable
      style={[
        styles.postContainer,
        { borderBottomColor: colorScheme === "dark" ? "#333" : "#eee" },
      ]}
      onPress={() => handlePostPress(item)}
      delayLongPress={200}
    >
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => handleUserPress(item)}>
            {item.avatar ? (
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatar}>
                <Ionicons name="person-circle" size={40} color="#ccc" />
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.usernameContainer}>
            <TouchableOpacity onPress={() => handleUserPress(item)}>
              <View style={styles.usernameRow}>
                <Text
                  style={[
                    styles.username,
                    colorScheme === "dark"
                      ? styles.usernameDark
                      : styles.usernameLight,
                  ]}
                >
                  {item.username}
                </Text>
                {item.isVerified && (
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color="#0095F6"
                    style={styles.verifiedIcon}
                  />
                )}
                <Text
                  style={[
                    styles.timeAgo,
                    colorScheme === "dark"
                      ? styles.timeAgoDark
                      : styles.timeAgoLight,
                  ]}
                >
                  {item.timeAgo}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Feather
            name="more-horizontal"
            size={16}
            color={colorScheme === "dark" ? "#ccc" : "#888"}
          />
        </View>
      </View>

      <View style={styles.postContent}>
        <Text
          style={[
            styles.postText,
            colorScheme === "dark" ? styles.postTextDark : styles.postTextLight,
          ]}
        >
          {item.content}
        </Text>
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}
        {item.location && item.location.length > 0 && (
          <Text style={styles.postText}>{item.location.join(", ")}</Text>
        )}
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Feather
            name="heart"
            size={20}
            color={colorScheme === "dark" ? "#ccc" : "#666"}
          />
          {item.likes > 0 && (
            <Text
              style={[
                styles.actionCount,
                { color: colorScheme === "dark" ? "#ccc" : "#666" },
              ]}
            >
              {item.likes}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather
            name="message-circle"
            size={20}
            color={colorScheme === "dark" ? "#ccc" : "#666"}
          />
          {item.comments > 0 && (
            <Text
              style={[
                styles.actionCount,
                { color: colorScheme === "dark" ? "#ccc" : "#666" },
              ]}
            >
              {item.comments}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather
            name="repeat"
            size={20}
            color={colorScheme === "dark" ? "#ccc" : "#666"}
          />
          {item.reposts > 0 && (
            <Text
              style={[
                styles.actionCount,
                { color: colorScheme === "dark" ? "#ccc" : "#666" },
              ]}
            >
              {item.reposts}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleShare(item.username, item.id)}
        >
          <Feather
            name="send"
            size={20}
            color={colorScheme === "dark" ? "#ccc" : "#666"}
          />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  usernameContainer: {
    flex: 1,
  },
  usernameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  postContent: {
    marginTop: -26,
    marginLeft: 52,
  },
  postActions: {
    flexDirection: "row",
    marginLeft: 52,
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    marginRight: 4,
    fontSize: 15,
    fontWeight: "600",
  },
  usernameDark: {
    color: "white",
  },
  usernameLight: {
    color: "#000",
  },
  verifiedIcon: {
    marginRight: 4,
  },
  timeAgo: {
    marginLeft: 4,
    fontSize: 14,
  },
  timeAgoDark: {
    color: "#ccc",
  },
  timeAgoLight: {
    color: "#888",
  },
  postText: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  postTextDark: {
    color: "white",
  },
  postTextLight: {
    color: "#000",
  },
  actionCount: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
  postImage: {
    width: "100%",
    height: 300,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
});
