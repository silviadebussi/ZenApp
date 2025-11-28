import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export default function EditarPerfil({ navigation }) {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    async function loadUser() {
      if (!user) return;
      setName(user.displayName || "");

   
      if (user.photoURL) setPhoto(user.photoURL);
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        if (data.name) setName(data.name);
        if (data.photo) setPhoto(data.photo);
      }
    }

    loadUser();
  }, []);

  async function salvarAlteracoes() {
    if (!user) return;

    try {
    
      await updateProfile(user, {
        displayName: name,
        photoURL: photo || null,
      });

      
      await setDoc(doc(db, "users", user.uid), {
        name,
        email: user.email,
        photo,
      });

      alert("Perfil atualizado!");
      navigation.goBack();
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
        source={
          photo
            ? { uri: photo }
            : require("../assets/image_app.png")
        }
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
        value={name}
        onChangeText={setName}
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
        value={photo}
        onChangeText={setPhoto}
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
