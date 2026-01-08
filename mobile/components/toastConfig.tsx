import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: ({ text1, text2, ...rest }: any) => {
    const scheme = useColorScheme();
    const theme = scheme === "dark" ? Colors.dark : Colors.light;

    return (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: theme.primary, backgroundColor: theme.surface, borderRadius: 10 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: "bold", color: theme.textPrimary }}
        text2Style={{ fontSize: 14, color: theme.textSecondary }}
        renderLeadingIcon={() => <MaterialIcons name="check-circle" size={24} color={theme.primary} style={styles.icon} />}
        text1={text1}
        text2={text2}
      />
    );
  },

  error: ({ text1, text2, ...rest }: any) => {
    const scheme = useColorScheme();
    const theme = scheme === "dark" ? Colors.dark : Colors.light;

    return (
      <ErrorToast
        {...rest}
        style={{ borderLeftColor: theme.secondary, backgroundColor: theme.surface, borderRadius: 10 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: "bold", color: theme.textPrimary }}
        text2Style={{ fontSize: 14, color: theme.textSecondary }}
        renderLeadingIcon={() => <MaterialIcons name="error" size={24} color={theme.secondary} style={styles.icon} />}
        text1={text1}
        text2={text2}
      />
    );
  },
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
  },
});
