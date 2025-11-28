import { StyleSheet } from "react-native";

const zenColors = {
  light: {
    background: "#F2F7FA", 
    card: "#FFFFFF",
    text: "#1A1A1A",
    textSecondary: "#6A6A6A",
    primary: "#5C8D89",
    primaryDark: "#3E6D69",
  },
  dark: {
    background: "#0F1416",
    card: "#1E1E1E",
    text: "#F2F2F2",
    textSecondary: "#A8A8A8",
    primary: "#7EC8C3",
    primaryDark: "#5AA39E",
  },
};

export default function getGlobalStyles(isDark) {
  const colors = isDark ? zenColors.dark : zenColors.light;

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 24,
      paddingTop: 20,
    },

    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 20,
      textAlign: "center",
    },

    text: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
    },

    mutedText: {
      fontSize: 14,
      color: colors.textSecondary,
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,

      shadowColor: "#000",
      shadowOpacity: isDark ? 0.25 : 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: isDark ? 6 : 3,
    },

    button: {
      backgroundColor: colors.primary,
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },

    buttonText: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "600",
    },

    input: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 14,
      fontSize: 16,
      color: colors.text,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDark ? "#333" : "#DDD",
    },

    separator: {
      height: 1,
      width: "100%",
      backgroundColor: isDark ? "#2A2A2A" : "#DADADA",
      marginVertical: 18,
    },

    center: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
}
