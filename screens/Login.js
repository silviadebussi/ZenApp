import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebaseConfig";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";

export default function Login({ navigation }) {
  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

 const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, senha);
    
  } catch (err) {
    setErro("Email ou senha inválidos");
  }
};


  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Login</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.text}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
