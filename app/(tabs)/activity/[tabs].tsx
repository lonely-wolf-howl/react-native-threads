import { useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import ActivityItem, { ActivityItemProps } from "../../../components/Activity";

const mockActivities: ActivityItemProps[] = [
  {
    id: "0",
    username: "Sabrina",
    timeAgo: "1h",
    content: "followed you",
    type: "followed",
    avatar:
      "https://static.wikia.nocookie.net/sabrina-carpenter/images/0/07/Short_n%27_Sweet.png/revision/latest?cb=20240802050532",
  },
  {
    id: "1",
    username: "Dua Lipa",
    timeAgo: "2h",
    postId: "1",
    content: "quoted your post",
    type: "quote",
    avatar:
      "https://static.wikia.nocookie.net/dualipa/images/d/dd/Dua_Lipa_Future_Nostalgia_Cover.png/revision/latest?cb=20240323023103",
  },
];

export default function ActivityTabs() {
  const colorScheme = useColorScheme();
  const { tabs } = useLocalSearchParams<{ tabs: string }>();

  const getFilteredActivities = () => {
    switch (tabs) {
      case "follows":
        return mockActivities.filter(
          (a) => a.type === "followed" || a.type === "follow"
        );
      case "replies":
        return mockActivities.filter((a) => a.type === "reply");
      case "mentions":
        return mockActivities.filter((a) => a.type === "mention");
      case "quotes":
        return mockActivities.filter((a) => a.type === "quote");
      case "reposts":
        return mockActivities.filter((a) => a.type === "repost");
      case "verified":
        return mockActivities.filter((a) => a.type === "verified");
      default:
        return mockActivities;
    }
  };

  const filteredActivities = getFilteredActivities();

  if (filteredActivities.length === 0) {
    return (
      <View
        style={[
          styles.emptyContainer,
          { backgroundColor: colorScheme === "dark" ? "#101010" : "#fff" },
        ]}
      >
        <Text style={{ color: colorScheme === "dark" ? "#888" : "#666" }}>
          No activities yet
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#101010" : "#fff" },
      ]}
    >
      {filteredActivities.map((activity) => (
        <ActivityItem key={activity.id} {...activity} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
