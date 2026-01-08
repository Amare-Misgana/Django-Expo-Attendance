import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

export type ThemedButtonProps = {
  title: string;
  colorKey?: keyof typeof import("@/constants/theme").Colors.light; // 'primary', 'secondary', etc.
  outline?: boolean; // new prop for transparent button with border
  onPress?: () => void;
  style?: ViewStyle;
};

export function ThemedButton({ title, colorKey = "primary", outline = false, onPress, style }: ThemedButtonProps) {
  const themeColor = useThemeColor({ light: undefined, dark: undefined }, colorKey);

  return (
    <TouchableOpacity style={[styles.button, outline ? { backgroundColor: "transparent", borderWidth: 2, borderColor: themeColor } : { backgroundColor: themeColor }, style]} onPress={onPress}>
      <ThemedText type="defaultSemiBold" style={{ color: outline ? themeColor : "#fff" }}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
