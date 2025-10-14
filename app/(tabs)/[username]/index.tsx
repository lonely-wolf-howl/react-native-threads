import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const { username } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <TouchableOpacity onPress={() => router.push(`/${username}`)}>
          <Text
            style={{ color: pathname === `/${username}` ? "#007AFF" : "black" }}
          >
            Threads
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/${username}/replies`)}>
          <Text
            style={{
              color: pathname === `/${username}/replies` ? "#007AFF" : "black",
            }}
          >
            Replies
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/${username}/reposts`)}>
          <Text
            style={{
              color: pathname === `/${username}/reposts` ? "#007AFF" : "black",
            }}
          >
            Reposts
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
