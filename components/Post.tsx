import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export interface Post {
  id: string;
  user: {
    id: string;
    name: string;
    profileImageUrl: string;
    isVerified?: boolean;
  };
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
  reposts: number;
  imageUrls?: string[];
  link?: string;
  linkThumbnail?: string;
  location?: [number, number];
}

export interface DetailedPost extends Post {
  isLiked?: boolean;
  shares?: number;
}

export default function PostComponent({ item }: { item: Post }) {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleUserPress = () => {
    router.push(`/@${item.user.id}`);
  };

  const handlePostPress = () => {
    router.push(`/@${item.user.id}/post/${item.id}`);
  };

  const handleShare = async () => {
    const shareUrl = `thread://@${item.user.id}/post/${item.id}`;

    try {
      await Share.share({
        message: shareUrl,
        url: shareUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Pressable
      style={[
        styles.postContainer,
        { borderBottomColor: colorScheme === "dark" ? "#333" : "#eee" },
      ]}
      onPress={handlePostPress}
      delayLongPress={200}
    >
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={handleUserPress}>
            {item.user.profileImageUrl ? (
              <Image
                source={{ uri: item.user.profileImageUrl }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatar}>
                <Ionicons name="person-circle" size={40} color="#ccc" />
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.usernameContainer}>
            <TouchableOpacity onPress={handleUserPress}>
              <View style={styles.usernameRow}>
                <Text
                  style={[
                    styles.username,
                    colorScheme === "dark"
                      ? styles.usernameDark
                      : styles.usernameLight,
                  ]}
                >
                  {item.user.name}
                </Text>
                {item.user.isVerified && (
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

      <View style={styles.postContent} pointerEvents="box-none">
        <Text
          style={[
            styles.postText,
            colorScheme === "dark" ? styles.postTextDark : styles.postTextLight,
          ]}
        >
          {item.content}
        </Text>
        <View pointerEvents="box-none">
          <ScrollView
            pointerEvents="box-only"
            horizontal
            scrollEnabled
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.postImages}
          >
            {item.imageUrls &&
              item.imageUrls.length > 0 &&
              item.imageUrls.map((image) => (
                <Image
                  key={image}
                  source={{ uri: image }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              ))}
          </ScrollView>
        </View>
        {!item.imageUrls?.length && item.link && (
          <Pressable onPress={() => WebBrowser.openBrowserAsync(item.link!)}>
            <Image
              source={{ uri: item.linkThumbnail }}
              style={styles.postLink}
              resizeMode="cover"
            />
          </Pressable>
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
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
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
  postImages: {
    flexDirection: "row",
    gap: 8,
  },
  postImage: {
    width: 300,
    height: 300,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 12,
  },
  postLink: {
    width: "75%",
    height: 200,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  actionCount: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
});
