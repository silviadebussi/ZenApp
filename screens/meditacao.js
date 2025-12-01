import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Meditacao({ route }) {
  const { titulo, descricao, id } = route.params;

  const [saving, setSaving] = useState(false);

  async function salvarFavorito() {
    setSaving(true);

    const stored = await AsyncStorage.getItem("favoritos");
    const lista = stored ? JSON.parse(stored) : [];

    if (!lista.some((i) => i.id === id)) {
      lista.push({ id, titulo, descricao });
      await AsyncStorage.setItem("favoritos", JSON.stringify(lista));
    }

    setSaving(false);
  }

  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.text}>{descricao}</Text>

      <TouchableOpacity style={styles.button} onPress={salvarFavorito}>
        {saving ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Salvar nos Favoritos</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
