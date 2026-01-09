import { ThemedButton } from "@/components/themed-btn";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";

const dashboard = () => {
  const { user, getAccessToken } = useAuth();
  const [access, setAccess] = React.useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      setAccess(token);
    })();
  }, []);
  console.log(user);
  return (
    <ThemedView>
      <ThemedText>Admin {user?.username}</ThemedText>
      <ThemedText>Access: {access}</ThemedText>
      <ThemedButton
        title="Press me"
        onPress={() => {
          console.log("I am logged in");
        }}
      />
    </ThemedView>
  );
};

export default dashboard;

const styles = StyleSheet.create({});
