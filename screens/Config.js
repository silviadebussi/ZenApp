import React, { useContext } from "react";
import { View, Text, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function Configs() {
  const { dark, toggleTheme } = useContext(ThemeContext);
  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={styles.text}>Modo Escuro</Text>
          <Switch value={dark} onValueChange={toggleTheme} />
        </View>
      </View>
    </SafeAreaView>
  );
}
