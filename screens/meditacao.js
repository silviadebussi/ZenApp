import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Meditacao({ route }) {
  const { titulo, descricao, id } = route.params;

  const [saving, setSaving] = useState(false);
  const [isFavorito, setIsFavorito] = useState(false);

  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  
  useEffect(() => {
    async function checkFavorito() {
      const stored = await AsyncStorage.getItem("favoritos");
      const lista = stored ? JSON.parse(stored) : [];

      setIsFavorito(lista.some((i) => i.id === id));
    }

    checkFavorito();
  }, [id]);

  async function salvarFavorito() {
    setSaving(true);

    const stored = await AsyncStorage.getItem("favoritos");
    const lista = stored ? JSON.parse(stored) : [];

    if (!lista.some((i) => i.id === id)) {
      lista.push({ id, titulo, descricao });
      await AsyncStorage.setItem("favoritos", JSON.stringify(lista));
    }

    setIsFavorito(true);
    setSaving(false);
  }

  async function removerFavorito() {
    setSaving(true);

    const stored = await AsyncStorage.getItem("favoritos");
    let lista = stored ? JSON.parse(stored) : [];

    lista = lista.filter((i) => i.id !== id);
    await AsyncStorage.setItem("favoritos", JSON.stringify(lista));

    setIsFavorito(false);
    setSaving(false);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.text}>{descricao}</Text>

   
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isFavorito ? "#C0392B" : "#4A8E7F", marginTop: 20 },
        ]}
        onPress={isFavorito ? removerFavorito : salvarFavorito}
      >
        {saving ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>
            {isFavorito ? "Remover dos Favoritos" : "Salvar nos Favoritos"}
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
