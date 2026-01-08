import { ThemedButton } from "@/components/themed-btn";
import { ThemedInput } from "@/components/themed-input";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "./contexts/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(username, password);
      console.log("Login successful!");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: err.response?.data?.error || "Something went wrong",
      });
      console.log("Login failed:", JSON.stringify(err.response?.data ?? { message: err.message }, null, 2));
    }
    setLoading(false);
  };

  const isBtnDisabled = !username || !password || loading;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" colorKey="primary">
        Welcome Back
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Sign in to continue to MeetMark
      </ThemedText>

      <ThemedInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <ThemedInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

      <ThemedButton title={loading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={isBtnDisabled} style={styles.button} />
    </ThemedView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 30,
    gap: 16,
  },
  subtitle: {
    textAlign: "center",
    width: "90%",
  },
  input: {
    width: 250,
  },
  button: {
    width: 250,
  },
});
