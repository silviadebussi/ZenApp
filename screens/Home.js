import React, { useContext } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import CardMeditacao from "../components/CardMeditacao";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../context/ThemeContext";

export default function Home() {
  const nav = useNavigation();
  const { dark } = useContext(ThemeContext);

  const meditations = [
    { id: 1, titulo: "Respiração Profunda", descricao: "Alivie o estresse" },
    { id: 2, titulo: "Relaxamento guiado", descricao: "Perfeito para ansiedade" },
  ];

  return (
    <SafeAreaView style={[styles.container, dark && styles.dark]}>
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
  dark: { backgroundColor: "#111" },
});
