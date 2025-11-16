import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../theme/globalStyles";

export default function ConfigScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Configurações ⚙️</Text>
      <Text style={globalStyles.subtitle}>
        Ajuste sons, tema e notificações.
      </Text>

      <TouchableOpacity style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Alternar Tema</Text>
      </TouchableOpacity>
    </View>
  );
}
