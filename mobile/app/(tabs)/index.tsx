import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React from "react";
import { StyleSheet } from "react-native";

const HomePage = () => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText type="title">HomePage</ThemedText>
      <ThemedText type="subtitle">HomePage</ThemedText>
      <ThemedText type="paragraph">This is a paragraph</ThemedText>
    </ThemedView>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
