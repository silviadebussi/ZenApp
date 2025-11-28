import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";

export default function Cadastro({ navigation }) {
  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleCadastro = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      navigation.replace("Menu");
    } catch (err) {
      setErro("Erro ao criar conta");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Criar Conta</Text>

      {erro ? <Text style={[styles.text, { color: "red" }]}>{erro}</Text> : null}

      <View style={styles.card}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.text}>Já tenho conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
