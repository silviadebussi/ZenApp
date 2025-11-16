import React from "react";
import { View, Text, StyleSheet, Button, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Meditacao({ route }) {
  const { titulo, descricao, id } = route.params;

  const theme = useColorScheme();
  const isDark = theme === "dark";

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
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#000" : "#fff" }
      ]}
    >
      <Text style={[styles.titulo, { color: isDark ? "#fff" : "#000" }]}>
        {titulo}
      </Text>

      <Text style={[styles.desc, { color: isDark ? "#ccc" : "#333" }]}>
        {descricao}
      </Text>

      <View style={{ marginTop: 20 }}>
        <Button
          title="Salvar nos Favoritos"
          onPress={salvarFavorito}
          color={isDark ? "#888" : undefined} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  desc: { fontSize: 16, lineHeight: 22 },
});
