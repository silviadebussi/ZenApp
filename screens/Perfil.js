import React, { useState, useEffect, useCallback } from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

export default function Perfil({ navigation, route }) {
  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  const [favCount, setFavCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function refreshAuth() {
        const u = auth.currentUser;
        if (u) {
          await u.reload();
        }
      }
      refreshAuth();
    }, [])
  );

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

    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        setUserData(null);
        setLoading(false);
        return;
      }

      const ref = doc(db, "users", user.uid);

      const unsubSnapshot = onSnapshot(ref, async (snap) => {
        await auth.currentUser.reload(); 

        const fresh = auth.currentUser;
        const data = snap.data() || {};

        setUserData({
          nome: data.nome || fresh.displayName,
          email: data.email || fresh.email,
          fotoURL: data.fotoURL || fresh.photoURL || null,
        });

        setLoading(false);
      });

      return () => unsubSnapshot();
    });

    return unsubAuth;
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
