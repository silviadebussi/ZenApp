import { StyleSheet } from "react-native";

const zenColors = {
  light: {
    background: "#F6F6F3",
    card: "#FFFFFF",
    text: "#1A1A1A",
    textSecondary: "#7A7A7A",
    primary: "#5C8D89",
    primaryDark: "#3E6D69",
  },
  dark: {
    background: "#0D0D0D",
    card: "#1A1A1A",
    text: "#F6F6F6",
    textSecondary: "#A0A0A0",
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
      fontWeight: "600",
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
      shadowOpacity: 0.07,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 3,
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
    },

    separator: {
      height: 1,
      width: "100%",
      backgroundColor: isDark ? "#333" : "#DDD",
      marginVertical: 18,
    },

    center: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
}
