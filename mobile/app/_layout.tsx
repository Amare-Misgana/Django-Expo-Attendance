import { toastConfig } from "@/components/toastConfig";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./contexts/AuthContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colorTheme = colorScheme === "dark" ? Colors.dark : Colors.light;

  const [fontsLoaded] = useFonts({
    Poppins: require("@/assets/fonts/poppins.regular.ttf"),
    "Poppins-Medium": require("@/assets/fonts/poppins.medium.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/poppins.semibold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colorTheme.backgroundEdge }}>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <AuthProvider>
            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: colorTheme.backgroundEdge,
                },
              }}
            >
              <Stack.Screen name="home" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: true, title: "Login" }} />
              <Stack.Screen name="sendOtp" options={{ headerShown: true, title: "Send OTP" }} />
              <Stack.Screen name="verifyOtp" options={{ headerShown: true, title: "Verify Code" }} />
              <Stack.Screen name="(admin)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" backgroundColor={colorTheme.backgroundEdge} />
          </AuthProvider>
          <Toast config={toastConfig} />
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
