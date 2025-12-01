import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";

export default function Home() {
  const nav = useNavigation();
  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  const [meditations, setMeditations] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMeditations() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/silviadebussi/meditation_api/master/meditations.json"
      );

      const data = await response.json();
      setMeditations(data);
    } catch (e) {
      console.log("Erro ao carregar API", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMeditations();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <ActivityIndicator size="large" color="#4A8E7F" />
        <Text style={styles.mutedText}>Carregando meditações...</Text>
      </SafeAreaView>
    );
  }

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
