import { usePathname, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import NotFound from "../../+not-found";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();

  if (
    ![
      "/activity",
      "/activity/follows",
      "/activity/replies",
      "/activity/mentions",
      "/activity/quotes",
      "/activity/reposts",
      "/activity/verified",
    ].includes(pathname)
  ) {
    return <NotFound />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <TouchableOpacity onPress={() => router.replace(`/activity`)}>
          <Text
            style={{ color: pathname === "/activity" ? "#007AFF" : "black" }}
          >
            All
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.replace(`/activity/follows`)}>
          <Text
            style={{
              color: pathname === "/activity/follows" ? "#007AFF" : "black",
            }}
          >
            Follows
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.replace(`/activity/replies`)}>
          <Text
            style={{
              color: pathname === "/activity/replies" ? "#007AFF" : "black",
            }}
          >
            Replies
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.replace(`/activity/mentions`)}>
          <Text
            style={{
              color: pathname === "/activity/mentions" ? "#007AFF" : "black",
            }}
          >
            Mentions
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.replace(`/activity/quotes`)}>
          <Text
            style={{
              color: pathname === "/activity/quotes" ? "#007AFF" : "black",
            }}
          >
            Quotes
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.replace(`/activity/reposts`)}>
          <Text
            style={{
              color: pathname === "/activity/reposts" ? "#007AFF" : "black",
            }}
          >
            Reposts
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.replace(`/activity/verified`)}>
          <Text
            style={{
              color: pathname === "/activity/verified" ? "#007AFF" : "black",
            }}
          >
            Verified
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
