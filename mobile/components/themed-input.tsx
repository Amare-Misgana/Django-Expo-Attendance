import { useThemeColor } from "@/hooks/use-theme-color";
import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from "react-native";

export type ThemedInputProps = TextInputProps & {
  colorKey?: keyof typeof import("@/constants/theme").Colors.light;
  containerStyle?: ViewStyle;
};

export function ThemedInput({ colorKey = "primary", containerStyle, style, value, onChangeText, ...props }: ThemedInputProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = useThemeColor({ light: undefined, dark: undefined }, focused ? colorKey : "border");
  const textColor = useThemeColor({ light: undefined, dark: undefined }, "textPrimary");
  const placeholderColor = useThemeColor({ light: undefined, dark: undefined }, "textLast");

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, { borderColor, color: textColor }, style]}
        placeholderTextColor={placeholderColor}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
