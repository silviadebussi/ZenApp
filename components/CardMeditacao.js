import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CardMeditacao({ titulo, descricao, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.desc}>{descricao}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 14,
    marginTop: 4,
    color: "#444",
  },
});
