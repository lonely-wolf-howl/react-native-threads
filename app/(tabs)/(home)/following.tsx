import { StyleSheet, Text, useColorScheme, View } from "react-native";

export default function Following() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#101010" : "#fff" },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: colorScheme === "dark" ? "white" : "black" },
        ]}
      >
        Following
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});
