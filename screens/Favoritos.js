import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import CardMeditacao from "../components/CardMeditacao";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  async function loadFavoritos() {
    const stored = await AsyncStorage.getItem("favoritos");
    if (stored) setFavoritos(JSON.parse(stored));
  }

  useEffect(() => {
    loadFavoritos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Meditações Favoritas</Text>

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardMeditacao
            titulo={item.titulo}
            descricao={item.descricao}
          />
        )}
        ListEmptyComponent={<Text>Nenhum favorito ainda</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
