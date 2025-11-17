import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";

export default function Home() {
  const nav = useNavigation();
  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  const meditations = [
    { id: 1, titulo: "Respiração Profunda", descricao: "Alivie o estresse" },
    { id: 2, titulo: "Relaxamento guiado", descricao: "Perfeito para ansiedade" },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={meditations}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              nav.navigate("Meditacao", { ...item })
            }
          >
            <View style={styles.card}>
              <Text style={styles.text}>{item.titulo}</Text>
              <Text style={styles.mutedText}>{item.descricao}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
