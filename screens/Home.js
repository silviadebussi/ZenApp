import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../theme/globalStyles";

export default function HomeScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Bem-vinda ao Zen App 🌿</Text>
      <Text style={globalStyles.subtitle}>
        Encontre calma, foco e equilíbrio interior.
      </Text>

      <TouchableOpacity style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Iniciar Meditação</Text>
      </TouchableOpacity>
    </View>
  );
}
