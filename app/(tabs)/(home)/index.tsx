import { usePathname, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <TouchableOpacity onPress={() => router.navigate(`/`)}>
          <Text style={{ color: pathname === "/" ? "#007AFF" : "black" }}>
            For you
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.navigate(`/following`)}>
          <Text
            style={{ color: pathname === "/following" ? "#007AFF" : "black" }}
          >
            Following
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
