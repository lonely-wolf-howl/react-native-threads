import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export interface ActivityItemProps {
  id: string;
  username: string;
  otherCount?: number;
  timeAgo: string;
  content: string;
  type: string;
  link?: string;
  reply?: string;
  likes?: number;
  actionButton?: React.ReactNode;
  avatar: string;
  postId?: string;
}

export default function ActivityItem({
  id,
  username,
  otherCount,
  timeAgo,
  content,
  type,
  link,
  reply,
  likes,
  actionButton,
  avatar,
  postId,
}: ActivityItemProps) {
  const colorScheme = useColorScheme();
  const router = useRouter();

  let iconColor = "#FF3B30";
  let iconName: any = "heart";
  let IconComponent: any = FontAwesome;

  if (type === "follow" || type === "followed") {
    iconColor = "#FF9500";
    iconName = "person";
    IconComponent = Ionicons;
  } else if (type === "mention") {
    iconColor = "#FF3B30";
    iconName = "at";
    IconComponent = FontAwesome;
  } else if (type === "reply") {
    iconColor = "#007AFF";
    iconName = "reply";
    IconComponent = FontAwesome;
  } else if (type === "quote") {
    iconColor = "#007AFF";
    iconName = "quote-left";
    IconComponent = FontAwesome;
  } else if (type === "repost") {
    iconColor = "#007AFF";
    iconName = "retweet";
    IconComponent = FontAwesome;
  }

  const handleItemPress = () => {
    if (type === "follow" || type === "followed") {
      router.push(`/${username}`);
    } else if (postId) {
      router.push(`/${username}/post/${postId}`);
    } else {
      router.push(`/${username}`);
    }
  };

  const handleAvatarPress = () => {
    router.push(`/${username}`);
  };

  return (
    <Pressable
      onPress={handleItemPress}
      style={[
        styles.activityItemContainer,
        {
          borderBottomColor: colorScheme === "dark" ? "#333" : "#eee",
        },
      ]}
    >
      <Pressable onPress={handleAvatarPress} style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={[styles.iconCircle, { backgroundColor: iconColor }]}>
          <IconComponent name={iconName} size={12} color="white" />
        </View>
      </Pressable>

      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <Text
            style={[
              styles.username,
              colorScheme === "dark"
                ? styles.usernameDark
                : styles.usernameLight,
            ]}
          >
            {username}
          </Text>
          {otherCount && (
            <Text
              style={[
                styles.otherCount,
                colorScheme === "dark"
                  ? styles.otherCountDark
                  : styles.otherCountLight,
              ]}
            >
              +{otherCount}명
            </Text>
          )}
          <Text
            style={[
              styles.timeAgo,
              colorScheme === "dark" ? styles.timeAgoDark : styles.timeAgoLight,
            ]}
          >
            {timeAgo}
          </Text>
        </View>

        {type === "followed" ? (
          <Text
            style={[
              styles.activityText,
              colorScheme === "dark"
                ? styles.activityTextDark
                : styles.activityTextLight,
            ]}
          >
            followed you
          </Text>
        ) : (
          <Text
            numberOfLines={2}
            style={[
              styles.activityText,
              colorScheme === "dark"
                ? styles.activityTextDark
                : styles.activityTextLight,
            ]}
          >
            {content}
          </Text>
        )}

        {link && (
          <View
            style={[
              styles.linkContainer,
              {
                backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#f0f0f0",
              },
            ]}
          >
            <FontAwesome name="link" size={14} color="#007AFF" />
            <Text style={styles.linkText}>{link}</Text>
          </View>
        )}

        {reply && (
          <View
            style={[
              styles.replyContainer,
              {
                borderLeftColor: colorScheme === "dark" ? "#444" : "#ddd",
              },
            ]}
          >
            <Text
              style={[
                styles.replyText,
                colorScheme === "dark"
                  ? styles.replyTextDark
                  : styles.replyTextLight,
              ]}
            >
              {reply}
            </Text>
          </View>
        )}

        <View style={styles.activityFooter}>
          {likes !== undefined && (
            <View style={styles.likesContainer}>
              <FontAwesome name="heart" size={12} color="#FF3B30" />
              <Text style={styles.likesText}>{likes}</Text>
            </View>
          )}
          {actionButton && actionButton}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  activityItemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  activityFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconCircle: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    marginRight: 4,
    fontSize: 14,
    fontWeight: "bold",
  },
  usernameDark: {
    color: "white",
  },
  usernameLight: {
    color: "black",
  },
  otherCount: {
    marginRight: 4,
    fontSize: 14,
    color: "#888",
  },
  otherCountDark: {
    color: "#ccc",
  },
  otherCountLight: {
    color: "#888",
  },
  timeAgo: {
    fontSize: 14,
    color: "#888",
  },
  timeAgoDark: {
    color: "#ccc",
  },
  timeAgoLight: {
    color: "#888",
  },
  activityText: {
    fontSize: 14,
    lineHeight: 18,
    color: "#333",
  },
  activityTextDark: {
    color: "#ccc",
  },
  activityTextLight: {
    color: "#333",
  },
  replyText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
  },
  replyTextDark: {
    color: "#ccc",
  },
  replyTextLight: {
    color: "#555",
  },
  likesText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#FF3B30",
  },
  followButtonText: {
    fontSize: 12,
    fontWeight: "600",
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    padding: 8,
    borderRadius: 8,
  },
  linkText: {
    marginLeft: 6,
    flexShrink: 1,
    fontSize: 13,
    color: "#007AFF",
  },
  replyContainer: {
    marginTop: 8,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#ddd",
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  followBackButton: {
    marginLeft: "auto",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});
