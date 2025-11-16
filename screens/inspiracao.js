import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Inspirar() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const theme = useColorScheme(); 
  const isDark = theme === "dark";

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
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#000" : "#fff" }
      ]}
    >
      {loading && <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />}

      {error && (
        <Text style={[styles.error, { color: isDark ? "#ff8080" : "red" }]}>
          Erro ao carregar frase 😓
        </Text>
      )}

      {!loading && !error && (
        <Text style={[styles.frase, { color: isDark ? "#fff" : "#000" }]}>
          "{quote}"
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  frase: { fontSize: 22, textAlign: "center", fontStyle: "italic" },
  error: { fontSize: 18, textAlign: "center" }
});
