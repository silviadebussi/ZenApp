import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardMeditacao from "../components/CardMeditacao"; 

export default function Inspirar() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  async function fetchQuotes() {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(
        `https://api.adviceslip.com/advice?t=${Date.now()}`
      );
      const data = await response.json();

      setQuotes([data.slip.advice]);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>

      {loading && (
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <ActivityIndicator size="large" color="#4A8E7F" />
          <Text style={[styles.mutedText, { marginTop: 10 }]}>
            Carregando frase...
          </Text>
        </View>
      )}

      {error && (
        <Text style={[styles.text, { marginBottom: 20 }]}>
          Erro ao carregar frases
        </Text>
      )}

      {!loading && (
        <Image
          source={require("../assets/zen.png")}
          style={{
            width: 140,
            height: 140,
            alignSelf: "center",
            marginBottom: 20,
            opacity: 0.9
          }}
        />
      )}

   
      {!loading && !error && quotes.length > 0 && (
        <CardMeditacao
          titulo="Mensagem do Dia"
          descricao={`“${quotes[0]}”`}
          onPress={() => {}}
        />
      )}

      {!loading && (
        <TouchableOpacity style={styles.button} onPress={fetchQuotes}>
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>
      )}

    </SafeAreaView>
  );
}
