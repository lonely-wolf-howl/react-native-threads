import AsyncStorage from "@react-native-async-storage/async-storage";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Linking,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import Toast, { BaseToast } from "react-native-toast-message";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
  handleSuccess(notificationId) {
    // todo: handle notification success
  },
  handleError(notificationId, error) {
    // todo: handle notification error
  },
});

SplashScreen.preventAutoHideAsync();

export interface User {
  id: string;
  name: string;
  description: string;
  profileImageUrl: string;
  link?: string;
  showInstagramBadge?: boolean;
  isPrivate?: boolean;
}

export const AuthContext = createContext<{
  user?: User | null;
  login?: () => void;
  logout?: () => void;
  updateUser?: (user: User) => void;
}>({});

function AnimatedAppLoader({
  children,
  image,
}: {
  children: React.ReactNode;
  image: number;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isSplashReady, setIsSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await Asset.loadAsync(image);
      setIsSplashReady(true);
    }
    prepare();
  }, [image]);

  const login = () => {
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: "username",
        password: "password",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        return Promise.all([
          SecureStore.setItem("accessToken", data.accessToken),
          SecureStore.setItem("refreshToken", data.refreshToken),
          AsyncStorage.setItem("user", JSON.stringify(data.user)),
        ]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const logout = () => {
    setUser(null);
    return Promise.all([
      SecureStore.deleteItemAsync("accessToken"),
      SecureStore.deleteItemAsync("refreshToken"),
      AsyncStorage.removeItem("user"),
    ]);
  };

  const updateUser = (user: User | null) => {
    setUser(user);
    if (user) {
      AsyncStorage.setItem("user", JSON.stringify(user));
    } else {
      AsyncStorage.removeItem("user");
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => {
      if (user) {
        setUser(JSON.parse(user));
      }
    });
    // todo: verify access token
  }, []);

  if (!isSplashReady) {
    return null;
  }

  return (
    <AuthContext value={{ user, login, logout, updateUser }}>
      <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>
    </AuthContext>
  );
}

function AnimatedSplashScreen({
  children,
  image,
}: {
  children: React.ReactNode;
  image: number;
}) {
  const colorScheme = useColorScheme();
  const [isAppReady, setIsAppReady] = useState(false);
  const [isSplashAnimationComplete, setIsSplashAnimationComplete] =
    useState(false);
  const animation = useRef(new Animated.Value(1)).current;
  const { updateUser } = useContext(AuthContext);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setIsSplashAnimationComplete(true));
    }
  }, [animation, isAppReady]);

  const onImageLoaded = async () => {
    try {
      await Promise.all([
        AsyncStorage.getItem("user").then((user) => {
          if (user) {
            updateUser?.(user ? JSON.parse(user) : null);
          }
          // todo: verify access token
        }),
      ]);
      await SplashScreen.hideAsync();

      /**
       * local notification
       */
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        return Linking.openSettings();
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Hello, World!",
          body: "This is a notification",
        },
        trigger: null,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsAppReady(true);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#101010" : "#ffffff",
      }}
    >
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colorScheme === "dark" ? "#101010" : "#ffffff",
            opacity: animation,
          }}
        >
          <Animated.Image
            source={image}
            style={{
              resizeMode: "contain",
              width: Constants.expoConfig?.splash?.imageWidth,
              height: Constants.expoConfig?.splash?.imageWidth,
              tintColor: colorScheme === "dark" ? "#ffffff" : undefined,
            }}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

export default function RootLayout() {
  return (
    <AnimatedAppLoader image={require("../assets/images/threads-logo.png")}>
      <StatusBar style="auto" animated={true} translucent={false} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "transparentModal",
            animation: "fade",
          }}
        />
      </Stack>
      <Toast config={toastConfig} />
    </AnimatedAppLoader>
  );
}

const toastConfig = {
  customToast: (props: any) => (
    <BaseToast
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        height: 40,
        borderLeftWidth: 0,
        shadowOpacity: 0,
        justifyContent: "center",
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        alignItems: "center",
        height: 40,
      }}
      text1Style={{
        color: "black",
        fontSize: 14,
        fontWeight: "500",
      }}
      text1={props.text1}
      onPress={props.onPress}
    />
  ),
};
