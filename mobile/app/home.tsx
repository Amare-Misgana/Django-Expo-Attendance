import { ThemedButton } from "@/components/themed-btn";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

const HomePage = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" colorKey="primary">
        MeetMark
      </ThemedText>
      <ThemedText type="subtitle" colorKey="secondary" style={styles.subtitle}>
        Your smart attendance companion for meetings and classes
      </ThemedText>
      <Image source={require("../assets/images/attendance.png")} style={styles.attendanceImg} />
      <View style={styles.ctaContainer}>
        <View style={styles.cta}>
          <ThemedButton
            title="Login"
            outline
            style={styles.loginBtn}
            onPress={() => {
              router.push("/login");
            }}
          />
          <ThemedButton title="Register" style={styles.registerBtn} />
        </View>
      </View>
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
  ctaContainer: {
    marginTop: 50,
    alignItems: "center",
    gap: 10,
  },
  cta: {
    flexDirection: "row",
    gap: 10,
    width: "70%",
  },
  loginBtn: {
    width: "50%",
  },
  registerBtn: {
    width: "50%",
  },
  attendanceImg: {
    width: "100%",
    height: "50%",
    objectFit: "contain",
  },
});
