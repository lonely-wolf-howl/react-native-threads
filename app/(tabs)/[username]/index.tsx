import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const { username } = useLocalSearchParams();
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#101010" : "#fff" },
      ]}
    >
      <View>
        <TouchableOpacity onPress={() => router.push(`/${username}`)}>
          <Text
            style={[
              styles.tabText,
              {
                color:
                  pathname === `/${username}`
                    ? "#007AFF"
                    : colorScheme === "dark"
                    ? "white"
                    : "black",
              },
            ]}
          >
            Threads
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/${username}/replies`)}>
          <Text
            style={[
              styles.tabText,
              {
                color:
                  pathname === `/${username}/replies`
                    ? "#007AFF"
                    : colorScheme === "dark"
                    ? "white"
                    : "black",
              },
            ]}
          >
            Replies
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/${username}/reposts`)}>
          <Text
            style={[
              styles.tabText,
              {
                color:
                  pathname === `/${username}/reposts`
                    ? "#007AFF"
                    : colorScheme === "dark"
                    ? "white"
                    : "black",
              },
            ]}
          >
            Reposts
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
});
