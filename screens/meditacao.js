import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Meditacao({ route }) {
  const { titulo, descricao, id } = route.params;

  async function salvarFavorito() {
    const stored = await AsyncStorage.getItem("favoritos");
    const lista = stored ? JSON.parse(stored) : [];

    if (!lista.some((i) => i.id === id)) {
      lista.push({ id, titulo, descricao });
      await AsyncStorage.setItem("favoritos", JSON.stringify(lista));
    }
  }

  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.text}>{descricao}</Text>

      <TouchableOpacity style={styles.button} onPress={salvarFavorito}>
        <Text style={styles.buttonText}>Salvar nos Favoritos</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
