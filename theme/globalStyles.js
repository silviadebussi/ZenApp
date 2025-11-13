// theme/globalStyles.js
import { StyleSheet } from "react-native";

export const colors = {
  background: "#E8F5E9",   // verde-claro zen
  primary: "#4CAF50",      // verde principal
  accent: "#81C784",       // verde suave
  textDark: "#1B5E20",     // texto forte
  textLight: "#66BB6A",    // texto secundário
  white: "#FFFFFF",
  gray: "#A5D6A7",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 15,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
