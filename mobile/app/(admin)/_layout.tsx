import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: true, title: "Login" }} />
      <Stack.Screen name="sendOtp" options={{ headerShown: true, title: "Send OTP" }} />
      <Stack.Screen name="verifyOtp" options={{ headerShown: true, title: "Verify Code" }} />
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
    </Stack>
  );
}
