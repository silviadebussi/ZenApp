import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Meditacao({ route }) {
  const { titulo, descricao, id } = route.params;

  async function salvarFavorito() {
    const stored = await AsyncStorage.getItem("favoritos");
    const lista = stored ? JSON.parse(stored) : [];

    const jaExiste = lista.some((item) => item.id === id);
    if (!jaExiste) {
      lista.push({ id, titulo, descricao });
      await AsyncStorage.setItem("favoritos", JSON.stringify(lista));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.desc}>{descricao}</Text>

      <Button title="Salvar nos Favoritos" onPress={salvarFavorito} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 26, fontWeight: "bold" },
  desc: { fontSize: 16, marginVertical: 10 },
});
