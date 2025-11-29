import React, { useState, useEffect } from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Perfil({ navigation }) {
  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  const [favCount, setFavCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadFavorites() {
      try {
        const stored = await AsyncStorage.getItem("favoritos");
        const list = stored ? JSON.parse(stored) : [];
        setFavCount(list.length);
      } catch (e) {
        console.log("Erro ao carregar favoritos", e);
      }
    }

    loadFavorites();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          setUserData({
            nome: data.nome || user.displayName || "Usuário",
            email: data.email || user.email,
            fotoURL: data.fotoURL || user.photoURL || null,
          });
        } else {
          setUserData({
            nome: user.displayName || "Usuário",
            email: user.email,
            fotoURL: user.photoURL || null,
          });
        }

      } catch (e) {
        console.log("Erro ao obter dados do usuário:", e);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.text}>Carregando perfil...</Text>
      </SafeAreaView>
    );
  }

  if (!userData) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.text}>Nenhum usuário logado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ alignItems: "center", marginBottom: 25 }}>
        <Image
          source={
            userData.fotoURL
              ? { uri: userData.fotoURL }
              : require("../assets/image_app.png")
          }
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            marginBottom: 10,
          }}
        />

        <Text style={styles.title}>Seu Perfil</Text>
      </View>

      <Text style={styles.text}>Nome: {userData.nome}</Text>
      <Text style={styles.mutedText}>Email: {userData.email}</Text>

      <View
        style={{
          height: 1,
          backgroundColor: "#aaa",
          opacity: 0.2,
          marginVertical: 25,
        }}
      />

      <Text style={styles.subtitle}>Atividade</Text>
      <Text style={styles.text}>Meditações Favoritas: {favCount}</Text>
      <Text style={styles.text}>Última sessão: Hoje</Text>

      <View
        style={{
          height: 1,
          backgroundColor: "#aaa",
          opacity: 0.2,
          marginVertical: 25,
        }}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("EditarPerfil")}
        style={{
          backgroundColor: "#4A8E7F",
          padding: 12,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          Editar Perfil
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
