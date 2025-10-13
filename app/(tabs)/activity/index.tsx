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
          <Text style={{ color: pathname === "/activity" ? "black" : "gray" }}>
            All
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.replace(`/activity/follows`)}>
          <Text
            style={{
              color: pathname === "/activity/follows" ? "black" : "gray",
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
              color: pathname === "/activity/replies" ? "black" : "gray",
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
              color: pathname === "/activity/mentions" ? "black" : "gray",
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
              color: pathname === "/activity/quotes" ? "black" : "gray",
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
              color: pathname === "/activity/reposts" ? "black" : "gray",
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
              color: pathname === "/activity/verified" ? "black" : "gray",
            }}
          >
            Verified
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
