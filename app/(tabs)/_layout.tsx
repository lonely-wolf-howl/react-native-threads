import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              color={focused ? "black" : "gray"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="search"
              color={focused ? "black" : "gray"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.navigate("/modal");
          },
        }}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="add" color={focused ? "black" : "gray"} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="heart-outline"
              color={focused ? "black" : "gray"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="[username]"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              color={focused ? "black" : "gray"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(post)/[username]/post/[postId]"
        options={{
          tabBarLabel: () => null,
          href: null,
        }}
      />
    </Tabs>
  );
}
