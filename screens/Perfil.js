import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";

export default function Perfil() {
  const { dark } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, dark && styles.dark]}>
      <Text style={[styles.nome, dark && { color: "#fff" }]}>Seu Perfil</Text>
      <Text style={[styles.info, dark && { color: "#aaa" }]}>
        Nome: Silvia
      </Text>
      <Text style={[styles.info, dark && { color: "#aaa" }]}>
        App ZenRoutine
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  dark: { backgroundColor: "#111" },
  nome: { fontSize: 24, fontWeight: "bold" },
  info: { fontSize: 18, marginTop: 10 },
});
