import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { BaseToast, ErrorToast, ToastProps } from "react-native-toast-message";

// Type definitions
interface ThemeToastProps extends ToastProps {
  text1?: string;
  text2?: string;
}

// Custom Toast Components
const SuccessToast = ({ text1, text2, ...rest }: ThemeToastProps) => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  return (
    <BaseToast
      {...rest}
      style={[styles.toast, { backgroundColor: theme.surface }]}
      contentContainerStyle={styles.contentContainer}
      text1Style={[styles.text1, { color: theme.textPrimary }]}
      text2Style={[styles.text2, { color: theme.textSecondary }]}
      renderLeadingIcon={() => <MaterialIcons name="check-circle" size={24} color={theme.primary} style={styles.icon} />}
      text1={text1}
      text2={text2}
    />
  );
};

const ErrorToastComponent = ({ text1, text2, ...rest }: ThemeToastProps) => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ErrorToast
      {...rest}
      style={[styles.toast, { backgroundColor: theme.surface }]}
      contentContainerStyle={styles.contentContainer}
      text1Style={[styles.text1, { color: theme.textPrimary }]}
      text2Style={[styles.text2, { color: theme.textSecondary }]}
      renderLeadingIcon={() => <MaterialIcons name="error" size={24} color={theme.secondary} style={styles.icon} />}
      text1={text1}
      text2={text2}
    />
  );
};

// Toast Configuration
export const toastConfig = {
  success: (props: ToastProps) => <SuccessToast {...props} />,
  error: (props: ToastProps) => <ErrorToastComponent {...props} />,
};

// Styles
const styles = StyleSheet.create({
  toast: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  contentContainer: {
    paddingHorizontal: 0,
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  text1: {
    fontSize: 16,
    fontWeight: "600", // Using numeric weight for better compatibility
  },
  text2: {
    fontSize: 14,
    marginTop: 2,
  },
});
