import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const registrar = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        senha
      );

      const user = userCredential.user;

      await updateProfile(user, { displayName: nome });

      await setDoc(doc(db, "users", user.uid), {
        nome: nome,
        email: email,
        fotoURL: null,
      });

      Alert.alert("Sucesso!", "Conta criada com sucesso!");

    } catch (error) {
      Alert.alert("Erro ao cadastrar", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} />

      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" />

      <Text>Senha</Text>
      <TextInput
        value={senha}
        secureTextEntry
        onChangeText={setSenha}
      />

      <TouchableOpacity onPress={registrar} style={{ marginTop: 15 }}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ marginTop: 15 }}
      >
        <Text>Já tenho conta</Text>
      </TouchableOpacity>
    </View>
  );
}
