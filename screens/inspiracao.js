import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Inspirar() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchQuote() {
      try {
        setLoading(true);
        const response = await fetch("https://zenquotes.io/api/random");
        const data = await response.json();
        setQuote(data[0].q);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchQuote();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.error}>Erro ao carregar frase 😓</Text>}
      {!loading && !error && (
        <Text style={styles.frase}>"{quote}"</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  frase: { fontSize: 22, textAlign: "center", fontStyle: "italic" },
  error: { fontSize: 18, color: "red", textAlign: "center" },
});
