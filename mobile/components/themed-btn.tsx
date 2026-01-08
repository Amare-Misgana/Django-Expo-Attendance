import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

export type ThemedButtonProps = {
  title: string;
  colorKey?: keyof typeof import("@/constants/theme").Colors.light; // e.g. 'primary', 'secondary', 'accent'
  outline?: boolean; // transparent button with border
  disabled?: boolean; // disables the button
  onPress?: () => void;
  style?: ViewStyle;
};

export function ThemedButton({ title, colorKey = "primary", outline = false, disabled = false, onPress, style }: ThemedButtonProps) {
  const themeColor = useThemeColor({ light: undefined, dark: undefined }, disabled ? (`${colorKey}Disabled` as keyof typeof import("@/constants/theme").Colors.light) : colorKey);

  return (
    <TouchableOpacity
      style={[styles.button, outline ? { backgroundColor: "transparent", borderWidth: 2, borderColor: themeColor } : { backgroundColor: themeColor }, disabled && { opacity: 0.6 }, style]}
      onPress={disabled ? undefined : onPress}
    >
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
