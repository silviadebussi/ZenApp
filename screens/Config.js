import React, { useContext } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Configs() {
  const { dark, toggleTheme } = useContext(ThemeContext);
  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  const handleLogout = async () => {
    await signOut(auth);
 
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={styles.text}>Modo Escuro</Text>
          <Switch value={dark} onValueChange={toggleTheme} />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
