import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      {loading && <ActivityIndicator size="large" />}

      {error && (
        <Text style={styles.text}>Erro ao carregar frases 😓</Text>
      )}

      {!loading && !error && (
        <View style={styles.card}>
          {quotes.map((q, i) => (
            <Text key={i} style={styles.text}>“{q}”</Text>
          ))}
        </View>
      )}

      {!loading && (
        <TouchableOpacity style={styles.button} onPress={fetchQuotes}>
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
