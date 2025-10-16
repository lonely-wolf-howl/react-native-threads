import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Pressable,
  Modal as RNModal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Thread {
  id: string;
  text: string;
  hashtag?: string;
  location?: string;
  imageUrls: string[];
}

export function ListFooter({
  canAddThread,
  addThread,
}: {
  canAddThread: boolean;
  addThread: () => void;
}) {
  return (
    <View style={styles.listFooter}>
      <View style={styles.listFooterAvatar}>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={styles.avatarSmall}
        />
      </View>
      <View>
        <Pressable onPress={addThread} style={styles.input}>
          <Text
            style={{
              fontWeight: "600",
              color: canAddThread ? "#999" : "#aaa",
            }}
          >
            Add to thread
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function Modal() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [threads, setThreads] = useState<Thread[]>([
    { id: Date.now().toString(), text: "", imageUrls: [] },
  ]);
  const [isPosting, setIsPosting] = useState(false);
  const [isActiveDropdownVisible, setIsActiveDropdownVisible] = useState(false);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [buttonLayout, setButtonLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [replyOption, setReplyOption] = useState("Anyone");
  const [isReplyDropdownVisible, setIsReplyDropdownVisible] = useState(false);

  const replyOptions = ["Anyone", "Profiles you follow", "Mentioned only"];

  const handleCancel = () => {
    if (isPosting) return;
    router.back();
  };

  const handlePost = () => {};

  const updateThreadText = (id: string, text: string) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === id ? { ...thread, text } : thread
      )
    );
  };

  const hasValidContent = (thread: Thread): boolean => {
    const hasText = thread.text.trim().length > 0;
    const hasImages = thread.imageUrls.length > 0;

    return hasText || hasImages;
  };

  const lastThread = threads.at(-1);
  const canAddThread = lastThread ? hasValidContent(lastThread) : false;

  const canPost = threads.every(hasValidContent);

  const removeThread = (id: string) => {
    setThreads((prevThreads) =>
      prevThreads.filter((thread) => thread.id !== id)
    );
  };

  const pickImage = async (id: string) => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Photos permission not granted",
        "Please grant photos permission to use this feature",
        [
          { text: "Open settings", onPress: () => Linking.openSettings() },
          { text: "Cancel" },
        ]
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "livePhotos", "videos"],
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      setThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread.id === id
            ? {
                ...thread,
                imageUrls: thread.imageUrls.concat(
                  result.assets?.map((asset) => asset.uri) ?? []
                ),
              }
            : thread
        )
      );
    }
  };

  const takePhoto = async (id: string) => {
    let { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Camera permission not granted",
        "Please grant camera permission to use this feature",
        [
          { text: "Open settings", onPress: () => Linking.openSettings() },
          { text: "Cancel" },
        ]
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images", "livePhotos", "videos"],
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    let { status: saveStatus } = await MediaLibrary.requestPermissionsAsync();
    if (saveStatus === "granted" && result.assets?.[0].uri) {
      MediaLibrary.saveToLibraryAsync(result.assets[0].uri);
    }

    if (!result.canceled) {
      setThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread.id === id
            ? {
                ...thread,
                imageUrls: thread.imageUrls.concat(
                  result.assets?.map((asset) => asset.uri) ?? []
                ),
              }
            : thread
        )
      );
    }
  };

  const removeImageFromThread = (id: string, uriToRemove: string) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === id
          ? {
              ...thread,
              imageUrls: thread.imageUrls.filter((uri) => uri !== uriToRemove),
            }
          : thread
      )
    );
  };

  const getMyLocation = async (id: string) => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Location permission not granted",
        "Please grant location permission to use this feature",
        [
          { text: "Open settings", onPress: () => Linking.openSettings() },
          { text: "Cancel" },
        ]
      );
      return;
    }

    // const location = await Location.getCurrentPositionAsync({});

    const address = await Location.reverseGeocodeAsync({
      latitude: 36.362,
      longitude: 127.344,
    });

    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === id
          ? {
              ...thread,
              // location: [location.coords.latitude, location.coords.longitude],
              location: address[0].formattedAddress as string,
            }
          : thread
      )
    );
  };

  const renderThreadItem = ({
    item,
    index,
  }: {
    item: Thread;
    index: number;
  }) => (
    <View style={styles.threadContainer}>
      <View style={styles.avatarContainer}>
        <Image
          source={require("../assets/images/react-logo.png")}
          style={styles.avatar}
        />
        {index === threads.length - 1 && <View style={styles.threadLine} />}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.username}>Jay</Text>
          {index > 0 && (
            <TouchableOpacity
              onPress={() => removeThread(item.id)}
              style={styles.removeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close-outline" size={20} color="#8e8e93" />
            </TouchableOpacity>
          )}
        </View>
        <TextInput
          style={styles.input}
          placeholder={"What's new?"}
          placeholderTextColor="#999"
          value={item.text}
          onChangeText={(text) => updateThreadText(item.id, text)}
          multiline
        />
        {item.imageUrls && item.imageUrls.length > 0 && (
          <FlatList
            data={item.imageUrls}
            renderItem={({ item: uri, index: _ }) => (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri }} style={styles.imagePreview} />
                <TouchableOpacity
                  onPress={() =>
                    !isPosting && removeImageFromThread(item.id, uri)
                  }
                  style={styles.removeImageButton}
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color="rgba(0,0,0,0.7)"
                  />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(uri, imgIndex) =>
              `${item.id}-img-${imgIndex}-${uri}`
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageFlatList}
          />
        )}
        {item.location && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              {/* {item.location[0]}, {item.location[1]} */}
              {item.location}
            </Text>
          </View>
        )}
        {index === threads.length - 1 && (
          <View style={styles.actionButtons}>
            <Pressable
              style={styles.actionButton}
              onPress={() => !isPosting && pickImage(item.id)}
            >
              <Ionicons name="image-outline" size={24} color="#777" />
            </Pressable>
            <Pressable
              style={styles.actionButton}
              onPress={(event) => {
                if (!isPosting) {
                  event.currentTarget.measureInWindow((x, y, width, height) => {
                    setButtonLayout({ x, y, width, height });
                    setActiveThreadId(item.id);
                    setIsActiveDropdownVisible(true);
                  });
                }
              }}
            >
              <Ionicons
                name="ellipsis-horizontal-circle-outline"
                size={24}
                color="#777"
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable
          onPress={handleCancel}
          disabled={isPosting}
          style={styles.headerLeft}
        >
          <Text style={[styles.cancel, isPosting && styles.disabledText]}>
            Cancel
          </Text>
        </Pressable>
        <Text style={styles.title}>New thread</Text>
        <View style={styles.headerRight} />
      </View>

      <FlatList
        data={threads}
        keyExtractor={(item) => item.id}
        renderItem={renderThreadItem}
        ListFooterComponent={
          <ListFooter
            canAddThread={canAddThread}
            addThread={() => {
              if (canAddThread) {
                setThreads((prevThreads) => [
                  ...prevThreads,
                  { id: Date.now().toString(), text: "", imageUrls: [] },
                ]);
              }
            }}
          />
        }
        style={styles.list}
        keyboardShouldPersistTaps="handled"
      />

      <RNModal
        transparent={true}
        visible={isReplyDropdownVisible}
        animationType="fade"
        onRequestClose={() => setIsReplyDropdownVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsReplyDropdownVisible(false)}
        >
          <View
            style={[
              styles.dropdownContainer,
              { bottom: insets.bottom + 30 },
              colorScheme === "dark"
                ? styles.dropdownContainerDark
                : styles.dropdownContainerLight,
            ]}
          >
            {replyOptions.map((option) => (
              <Pressable
                key={option}
                style={[
                  styles.dropdownOption,
                  option === replyOption && styles.selectedOption,
                ]}
                onPress={() => {
                  setReplyOption(option);
                  setIsReplyDropdownVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownOptionText,
                    colorScheme === "dark"
                      ? styles.dropdownOptionTextDark
                      : styles.dropdownOptionTextLight,
                    option === replyOption && styles.selectedOptionText,
                  ]}
                >
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </RNModal>

      <RNModal
        transparent={true}
        visible={isActiveDropdownVisible}
        animationType="fade"
        onRequestClose={() => {
          setIsActiveDropdownVisible(false);
          setButtonLayout(null);
        }}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => {
            setIsActiveDropdownVisible(false);
            setButtonLayout(null);
          }}
        >
          <View
            style={[
              styles.dropdownContainer,
              buttonLayout && {
                position: "absolute",
                top: buttonLayout.y + buttonLayout.height + 5,
                left: buttonLayout.x - 10,
              },
              colorScheme === "dark"
                ? styles.dropdownContainerDark
                : styles.dropdownContainerLight,
            ]}
          >
            <Pressable
              style={styles.dropdownOption}
              onPress={() => {
                if (activeThreadId) {
                  takePhoto(activeThreadId);
                }
                setIsActiveDropdownVisible(false);
                setActiveThreadId(null);
                setButtonLayout(null);
              }}
            >
              <Text
                style={[
                  styles.dropdownOptionText,
                  colorScheme === "dark"
                    ? styles.dropdownOptionTextDark
                    : styles.dropdownOptionTextLight,
                ]}
              >
                Camera
              </Text>
            </Pressable>
            <Pressable
              style={styles.dropdownOption}
              onPress={() => {
                if (activeThreadId) {
                  getMyLocation(activeThreadId);
                }
                setIsActiveDropdownVisible(false);
                setActiveThreadId(null);
                setButtonLayout(null);
              }}
            >
              <Text
                style={[
                  styles.dropdownOptionText,
                  colorScheme === "dark"
                    ? styles.dropdownOptionTextDark
                    : styles.dropdownOptionTextLight,
                ]}
              >
                Location
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </RNModal>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
        <Pressable onPress={() => setIsReplyDropdownVisible(true)}>
          <Text style={styles.footerText}>
            {replyOption} can reply and quote
          </Text>
        </Pressable>
        <Pressable
          style={[styles.postButton, !canPost && styles.postButtonDisabled]}
          disabled={!canPost}
          onPress={handlePost}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // header
  header: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  headerLeft: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  headerRight: {
    position: "absolute",
    right: 16,
    width: 60,
  },
  cancel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  disabledText: {
    color: "#ccc",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    color: "#000",
  },
  // list
  list: {
    flex: 1,
  },
  threadContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  // avatar
  avatarContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  threadLine: {
    width: 2,
    flexGrow: 1,
    marginTop: 8,
    backgroundColor: "#aaa",
  },
  // content
  contentContainer: {
    position: "relative",
    flex: 1,
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    marginTop: -2,
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "800",
    color: "#000",
  },
  removeButton: {
    marginRight: -4,
    marginLeft: 8,
  },
  input: {
    minHeight: 24,
    paddingTop: 2,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    color: "#000",
  },
  // action button
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginLeft: 2,
    marginRight: 16,
  },
  imagePreviewContainer: {
    position: "relative",
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  removeImageButton: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: 2,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  imageFlatList: {
    paddingBottom: 8,
  },
  locationContainer: {
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
  },
  locationText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#8e8e93",
  },
  // list footer
  listFooter: {
    flexDirection: "row",
    paddingLeft: 30,
    paddingTop: 4,
    paddingBottom: 12,
  },
  listFooterAvatar: {
    marginRight: 10,
    paddingTop: 4,
  },
  avatarSmall: {
    width: 16,
    height: 16,
    borderRadius: 12,
  },
  // footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8e8e93",
  },
  postButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: "#000",
  },
  postButtonDisabled: {
    backgroundColor: "#ccc",
  },
  postButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  // reply
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  dropdownContainer: {
    width: 200,
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  dropdownContainerLight: {
    backgroundColor: "white",
  },
  dropdownContainerDark: {
    backgroundColor: "#101010",
  },
  dropdownOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
  },
  selectedOption: {},
  dropdownOptionText: {
    fontSize: 16,
  },
  dropdownOptionTextLight: {
    color: "#000",
  },
  dropdownOptionTextDark: {
    color: "#fff",
  },
  selectedOptionText: {
    fontWeight: "600",
    color: "#007AFF",
  },
});
