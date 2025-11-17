import React from "react";
import { Text } from "react-native";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Perfil() {
  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Seu Perfil</Text>

      <Text style={styles.text}>Nome: Silvia</Text>
      <Text style={styles.mutedText}>App ZenRoutine</Text>
    </SafeAreaView>
  );
}
