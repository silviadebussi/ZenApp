import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import CardMeditacao from "../components/CardMeditacao";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";

export default function Favoritos({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);
  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  async function loadFavoritos() {
    const stored = await AsyncStorage.getItem("favoritos");
    setFavoritos(stored ? JSON.parse(stored) : []);
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavoritos();
    }, [])
  );

  async function removerFavorito(id) {
    const novos = favoritos.filter((item) => item.id !== id);
    setFavoritos(novos);
    await AsyncStorage.setItem("favoritos", JSON.stringify(novos));
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Meditações Favoritas</Text>

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.mutedText}>Nenhum favorito ainda</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <CardMeditacao
              titulo={item.titulo}
              descricao={item.descricao}
              onPress={() =>
                navigation.navigate("Meditacao", {
                  id: item.id,
                  titulo: item.titulo,
                  descricao: item.descricao,
                  conteudo: item.conteudo,
                })
              }
            />

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#C45555", marginTop: 12 },
              ]}
              onPress={() => removerFavorito(item.id)}
            >
              <Text style={styles.buttonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
