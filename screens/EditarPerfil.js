import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export default function EditarPerfil({ navigation }) {
  const user = auth.currentUser;

  const [nome, setNome] = useState("");
  const [fotoURL, setFotoURL] = useState("");

  useEffect(() => {
    async function loadUser() {
      if (!user) return;

      setNome(user.displayName || "");
      setFotoURL(user.photoURL || "");

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref, { source: "server" });

      if (snap.exists()) {
        const data = snap.data();
        if (data.nome) setNome(data.nome);
        if (data.fotoURL) setFotoURL(data.fotoURL);
      }
    }

    loadUser();
  }, []);

  async function salvarAlteracoes() {
    if (!user) return;

    try {
      await updateProfile(user, {
        displayName: nome,
        photoURL: fotoURL || null,
      });

      await setDoc(doc(db, "users", user.uid), {
        nome,
        email: user.email,
        fotoURL,
      });

      await user.reload();

     
      navigation.navigate("Perfil", { updated: true });
    } catch (e) {
      console.log(e);
      alert("Erro ao atualizar perfil.");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Editar Perfil
      </Text>

      <Image
        source={fotoURL ? { uri: fotoURL } : require("../assets/image_app.png")}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />

      <Text style={{ fontSize: 16, marginBottom: 5 }}>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Seu nome"
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 10,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      />

      <Text style={{ fontSize: 16, marginBottom: 5 }}>URL da Foto</Text>
      <TextInput
        value={fotoURL}
        onChangeText={setFotoURL}
        placeholder="https://exemplo.com/foto.jpg"
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 10,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      />

      <TouchableOpacity
        onPress={salvarAlteracoes}
        style={{
          backgroundColor: "#4A8E7F",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Salvar
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
