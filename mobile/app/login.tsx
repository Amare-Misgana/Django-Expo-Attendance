import { ThemedButton } from "@/components/themed-btn";
import { ThemedInput } from "@/components/themed-input";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  useEffect(() => {
    setIsBtnDisabled(() => {
      return username.length == 0 || password.length == 0;
    });
  }, [username, password]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" colorKey="primary">
        Welcome Back
      </ThemedText>

      <ThemedText type="body" style={styles.subtitle}>
        Sign in to continue to MeetMark
      </ThemedText>
      <ThemedInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.usernameInput} />
      <ThemedInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.passwordInput} />
      <ThemedButton
        title="Login"
        style={styles.loginBtn}
        onPress={() => {
          console.log(username, password);
        }}
        disabled={isBtnDisabled}
      />
    </ThemedView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 30,
    gap: 19,
  },
  subtitle: {
    textAlign: "center",
    width: "90%",
  },
  usernameInput: {
    width: 250,
  },
  passwordInput: {
    width: 250,
  },
  loginBtn: {
    width: 250,
  },
});
