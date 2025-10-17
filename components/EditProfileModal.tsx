import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext, User } from "../app/_layout";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  initialProfileData: User;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
  initialProfileData,
}) => {
  const colorScheme = useColorScheme();
  const { updateUser } = useContext(AuthContext);
  const [name, setName] = useState(initialProfileData?.name || "");
  const [description, setDescription] = useState(
    initialProfileData?.description || ""
  );
  const [link, setLink] = useState(initialProfileData?.link || "");
  const [showInstagramBadge, setShowInstagramBadge] = useState(
    initialProfileData?.showInstagramBadge || false
  );
  const [isPrivate, setIsPrivate] = useState(
    initialProfileData?.isPrivate || false
  );
  const [isSaving, setIsSaving] = useState(false);
  const [editingField, setEditingField] = useState<"bio" | "link" | null>(null);
  const [tempValue, setTempValue] = useState("");

  useEffect(() => {
    if (visible && initialProfileData) {
      setName(initialProfileData.name);
      setDescription(initialProfileData.description);
      setLink(initialProfileData.link || "");
      setShowInstagramBadge(initialProfileData.showInstagramBadge || false);
      setIsPrivate(initialProfileData.isPrivate || false);
    } else if (!visible) {
      setEditingField(null);
      setTempValue("");
    }
  }, [visible, initialProfileData]);

  const handleSave = async () => {
    if (!initialProfileData?.name) {
      console.error("Cannot save profile without a username.");
      return;
    }

    setIsSaving(true);
    try {
      await updateUser?.({
        id: initialProfileData.id,
        name: initialProfileData.name,
        description,
        link,
        showInstagramBadge,
        isPrivate,
        profileImageUrl: initialProfileData.profileImageUrl,
      });
    } catch (error) {
      console.error("Failed to save profile:", error);
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (!isSaving) {
      if (editingField) {
        setEditingField(null);
        setTempValue("");
      } else {
        if (initialProfileData) {
          setName(initialProfileData.name);
          setDescription(initialProfileData.description);
          setLink(initialProfileData.link || "");
          setShowInstagramBadge(initialProfileData.showInstagramBadge || false);
          setIsPrivate(initialProfileData.isPrivate || false);
        }
        onClose();
      }
    }
  };

  const handleEditBio = () => {
    setEditingField("bio");
    setTempValue(description);
  };

  const handleEditLink = () => {
    setEditingField("link");
    setTempValue(link);
  };

  const handleConfirmEdit = () => {
    if (editingField === "bio") {
      setDescription(tempValue);
    } else if (editingField === "link") {
      setLink(tempValue);
    }
    setEditingField(null);
    setTempValue("");
  };

  const renderEditFieldView = () => {
    const isBio = editingField === "bio";
    const title = isBio ? "Bio" : "Link";
    const placeholder = isBio ? "Write a bio" : "Add link";

    return (
      <View
        style={[
          styles.modalContainer,
          { backgroundColor: colorScheme === "dark" ? "#000" : "#f8f8f8" },
        ]}
      >
        <View
          style={[
            styles.header,
            {
              backgroundColor: colorScheme === "dark" ? "#000" : "#f8f8f8",
              borderBottomColor: colorScheme === "dark" ? "#333" : "#e0e0e0",
            },
          ]}
        >
          <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
            <Text
              style={[
                styles.headerButtonText,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}
          >
            {title}
          </Text>
          <TouchableOpacity
            onPress={handleConfirmEdit}
            style={styles.headerButton}
          >
            <Text
              style={[
                styles.headerButtonText,
                styles.doneButton,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.editingContentContainer}>
          <TextInput
            style={[
              isBio ? styles.textInputBioLarge : styles.textInputLinkLarge,
              {
                backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#fff",
                borderColor: colorScheme === "dark" ? "#333" : "#ccc",
                color: colorScheme === "dark" ? "#fff" : "#333",
              },
            ]}
            value={tempValue}
            onChangeText={setTempValue}
            placeholder={placeholder}
            placeholderTextColor={colorScheme === "dark" ? "#666" : "#ccc"}
            multiline={isBio}
            autoCapitalize={isBio ? "sentences" : "none"}
            keyboardType={isBio ? "default" : "url"}
            autoFocus
          />
        </View>
      </View>
    );
  };

  const renderMainProfileView = () => (
    <View
      style={[
        styles.modalContainer,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#f8f8f8" },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: colorScheme === "dark" ? "#000" : "#f8f8f8",
            borderBottomColor: colorScheme === "dark" ? "#333" : "#e0e0e0",
          },
        ]}
      >
        {isSaving ? (
          <View style={styles.headerButtonPlaceholder} />
        ) : (
          <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
            <Text
              style={[
                styles.headerButtonText,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.headerTitle,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}
        >
          Edit profile
        </Text>
        {isSaving ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator
              size="small"
              color={colorScheme === "dark" ? "#ccc" : "#888"}
            />
          </View>
        ) : (
          <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
            <Text
              style={[
                styles.headerButtonText,
                styles.doneButton,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}
            >
              Done
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.contentContainer}>
        <View
          style={[
            styles.section,
            styles.nameSection,
            { borderBottomColor: colorScheme === "dark" ? "#333" : "#e0e0e0" },
          ]}
        >
          <View style={styles.sectionText}>
            <Text
              style={[
                styles.label,
                { color: colorScheme === "dark" ? "#fff" : "#333" },
              ]}
            >
              Name
            </Text>
            <View style={styles.nameRow}>
              <Ionicons
                name="lock-closed-outline"
                size={16}
                color={colorScheme === "dark" ? "#ccc" : "#888"}
                style={styles.lockIcon}
              />
              <Text
                style={[
                  styles.valueText,
                  { color: colorScheme === "dark" ? "#ccc" : "#555" },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {name} (@{initialProfileData?.id || "..."})
              </Text>
            </View>
          </View>
          <Image
            source={require("../assets/images/react-logo.png")}
            style={styles.profilePic}
          />
        </View>

        <TouchableOpacity
          onPress={handleEditBio}
          style={[
            styles.section,
            { borderBottomColor: colorScheme === "dark" ? "#333" : "#e0e0e0" },
          ]}
        >
          <View style={styles.sectionTextFull}>
            <Text
              style={[
                styles.label,
                { color: colorScheme === "dark" ? "#fff" : "#333" },
              ]}
            >
              Bio
            </Text>
            <Text
              style={[
                styles.tappableText,
                !description && styles.placeholderText,
                { color: colorScheme === "dark" ? "#fff" : "#333" },
              ]}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {description || "Write a bio..."}
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colorScheme === "dark" ? "#666" : "#ccc"}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleEditLink}
          style={[
            styles.section,
            { borderBottomColor: colorScheme === "dark" ? "#333" : "#e0e0e0" },
          ]}
        >
          <View style={styles.sectionTextFull}>
            <Text
              style={[
                styles.label,
                { color: colorScheme === "dark" ? "#fff" : "#333" },
              ]}
            >
              Link
            </Text>
            <Text
              style={[
                styles.tappableText,
                styles.linkText,
                !link && styles.placeholderText,
                {
                  color: link
                    ? "#007AFF"
                    : colorScheme === "dark"
                    ? "#666"
                    : "#ccc",
                },
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {link || "Add link..."}
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colorScheme === "dark" ? "#666" : "#ccc"}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>

        <View
          style={[
            styles.divider,
            { backgroundColor: colorScheme === "dark" ? "#000" : "#f8f8f8" },
          ]}
        />

        <View style={styles.switchSection}>
          <View style={styles.switchTextContainer}>
            <Text
              style={[
                styles.labelSwitch,
                { color: colorScheme === "dark" ? "#fff" : "#333" },
              ]}
            >
              Show Instagram badge
            </Text>
            <Text
              style={[
                styles.description,
                { color: colorScheme === "dark" ? "#ccc" : "#666" },
              ]}
            >
              When turned on, the Threads badge on your Instagram profile will
              also appear.
            </Text>
          </View>
          <Switch
            trackColor={{
              false: colorScheme === "dark" ? "#333" : "#E9E9EA",
              true: "#34C759",
            }}
            thumbColor={"#ffffff"}
            ios_backgroundColor={colorScheme === "dark" ? "#333" : "#E9E9EA"}
            onValueChange={setShowInstagramBadge}
            value={showInstagramBadge}
            style={styles.switch}
          />
        </View>

        <View
          style={[
            styles.dividerThin,
            { backgroundColor: colorScheme === "dark" ? "#333" : "#e0e0e0" },
          ]}
        />

        <View style={styles.switchSection}>
          <View style={styles.switchTextContainer}>
            <Text
              style={[
                styles.labelSwitch,
                { color: colorScheme === "dark" ? "#fff" : "#333" },
              ]}
            >
              Private profile
            </Text>
            <Text
              style={[
                styles.description,
                { color: colorScheme === "dark" ? "#ccc" : "#666" },
              ]}
            >
              If you switch to private, you won&apos;t be able to reply to
              others unless they follow you.
            </Text>
          </View>
          <Switch
            trackColor={{
              false: colorScheme === "dark" ? "#333" : "#E9E9EA",
              true: "#34C759",
            }}
            thumbColor={"#ffffff"}
            ios_backgroundColor={colorScheme === "dark" ? "#333" : "#E9E9EA"}
            onValueChange={setIsPrivate}
            value={isPrivate}
            style={styles.switch}
          />
        </View>
        <View
          style={[
            styles.dividerThin,
            { backgroundColor: colorScheme === "dark" ? "#333" : "#e0e0e0" },
          ]}
        />
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={handleCancel}
    >
      <SafeAreaView
        style={[
          styles.safeArea,
          { backgroundColor: colorScheme === "dark" ? "#000" : "#f8f8f8" },
        ]}
      >
        {editingField ? renderEditFieldView() : renderMainProfileView()}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  contentContainer: {
    flex: 1,
    paddingTop: 10,
  },
  editingContentContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 55,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#f8f8f8",
  },
  headerButton: {
    padding: 8,
    minWidth: 60,
    alignItems: "center",
  },
  headerButtonPlaceholder: {
    padding: 8,
    minWidth: 60,
  },
  activityIndicatorContainer: {
    padding: 8,
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
  },
  nameSection: {
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
  },
  sectionText: {
    flex: 1,
    marginRight: 16,
  },
  sectionTextFull: {
    flex: 1,
    marginRight: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  switchTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  headerButtonText: {
    fontSize: 17,
    color: "#000",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  doneButton: {
    fontWeight: "600",
    color: "#000",
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  labelSwitch: {
    marginBottom: 2,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  valueText: {
    fontSize: 16,
    color: "#555",
    flexShrink: 1,
  },
  tappableText: {
    paddingVertical: Platform.OS === "ios" ? 4 : 2,
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
  },
  linkText: {
    color: "#007AFF",
  },
  placeholderText: {
    fontStyle: "italic",
    color: "#ccc",
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 18,
    color: "#666",
  },
  lockIcon: {
    marginRight: 6,
  },
  chevronIcon: {
    marginLeft: "auto",
  },
  textInputBioLarge: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    lineHeight: 22,
    textAlignVertical: "top",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    color: "#333",
  },
  textInputLinkLarge: {
    padding: 12,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    color: "#007AFF",
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d0d0d0",
    backgroundColor: "#e8e8e8",
  },
  divider: {
    height: 12,
    backgroundColor: "#f8f8f8",
  },
  dividerThin: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#e0e0e0",
  },
  switch: {
    transform: Platform.OS === "ios" ? [] : [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
});

export default EditProfileModal;
