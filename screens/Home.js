import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import CardMeditacao from "../components/CardMeditacao";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const nav = useNavigation();

  const meditations = [
    {
      id: 1,
      titulo: "Respiração Profunda",
      descricao: "Alivie o estresse em 2 minutos",
    },
    {
      id: 2,
      titulo: "Relaxamento Guiado",
      descricao: "Perfeito para ansiedade",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={meditations}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <CardMeditacao
            titulo={item.titulo}
            descricao={item.descricao}
            onPress={() =>
              nav.navigate("Meditacao", {
                id: item.id,
                titulo: item.titulo,
                descricao: item.descricao,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
