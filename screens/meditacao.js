import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../theme/globalStyles";

export default function FavoritosScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Favoritos 💚</Text>
      <Text style={globalStyles.subtitle}>
        Salve aqui suas meditações e sons preferidos.
      </Text>
    </View>
  );
}
