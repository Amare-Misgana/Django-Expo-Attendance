import { ThemedButton } from "@/components/themed-btn";
import { ThemedInput } from "@/components/themed-input";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router, useLocalSearchParams } from "expo-router"; // Assuming you're using Expo Router
import React, { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Toast from "react-native-toast-message";
import { api } from "./utils/api";

const SendOtpPage = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useLocalSearchParams();
  const usernameParams = params.username as string;

  useEffect(() => {
    if (usernameParams) {
      setUsername(usernameParams);
    }
  }, []);

  const handleSendOtp = async () => {
    // Dismiss keyboard
    Keyboard.dismiss();

    // Validate input
    if (!username.trim()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter your username",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/api/users/send-code/", {
        username: username.trim(),
      });

      Toast.show({
        type: "success",
        text1: "OTP Sent Successfully",
        text2: "Check your email for the verification code",
      });

      // Navigate to OTP verification page with username
      router.navigate({
        pathname: "/verifyOtp",
        params: { username: username.trim() },
      });

      console.log("OTP sent successfully:", response.data);
    } catch (err: any) {
      let errorMessage = "Something went wrong";

      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      
      Toast.show({
        type: "error",
        text1: "OTP Failed",
        text2: errorMessage,
      });

      console.log("OTP failed:", JSON.stringify(err.response?.data, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const isBtnDisabled = !username.trim() || loading;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <ThemedView style={styles.container}>
          {/* Header Section */}
          <ThemedView style={styles.header}>
            <ThemedText type="title" colorKey="primary" style={styles.title}>
              Welcome Back
            </ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Sign in to continue to MeetMark
            </ThemedText>
          </ThemedView>

          {/* Form Section */}
          <ThemedView style={styles.form}>
            <ThemedInput
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
              returnKeyType="send"
              onSubmitEditing={handleSendOtp}
              style={styles.input}
            />

            <ThemedButton title={loading ? "Sending OTP..." : "Send OTP"} onPress={handleSendOtp} disabled={isBtnDisabled} style={styles.button} />

            {/* Help Text */}
            <ThemedText type="body" style={styles.helpText}>
              You'll receive a one-time verification code via email
            </ThemedText>
          </ThemedView>

          {/* Footer Section */}
          <ThemedView style={styles.footer}>
            <ThemedText type="body" style={styles.footerText}>
              Having trouble?{" "}
              <ThemedText
                type="body"
                colorKey="primary"
                style={styles.link}
                onPress={() => {
                  // Navigate to help/support page
                  console.log("Navigate to help");
                }}
              >
                Contact Support
              </ThemedText>
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SendOtpPage;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    width: "90%",
    opacity: 0.8,
    lineHeight: 22,
  },
  form: {
    alignItems: "center",
    gap: 20,
    width: "100%",
  },
  input: {
    width: 250,
  },
  button: {
    width: 250,
  },
  helpText: {
    textAlign: "center",
    marginTop: 8,
    opacity: 0.7,
    width: "90%",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: {
    textAlign: "center",
    opacity: 0.7,
  },
  link: {
    fontWeight: "600",
  },
});
