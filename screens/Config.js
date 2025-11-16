import React, { useContext } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";

export default function Configs() {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, dark && styles.dark]}>
      <Text style={[styles.titulo, dark && { color: "#fff" }]}>
        Configurações
      </Text>

      <View style={styles.row}>
        <Text style={[styles.label, dark && { color: "#fff" }]}>
          Modo Escuro
        </Text>
        <Switch value={dark} onValueChange={toggleTheme} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  dark: { backgroundColor: "#111" },
  titulo: { fontSize: 24, fontWeight: "bold" },
  row: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontSize: 18 },
});
