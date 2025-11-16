import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../theme/globalStyles";

export default function PerfilScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Seu Perfil 🌸</Text>
      <Text style={globalStyles.subtitle}>Veja e personalize sua jornada zen.</Text>

      <TouchableOpacity style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}
