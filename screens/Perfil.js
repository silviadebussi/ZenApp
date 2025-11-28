import React, { useState, useCallback } from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Perfil({ navigation }) {
  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  const [favCount, setFavCount] = useState(0);
  const [userData, setUserData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      async function loadFavorites() {
        try {
          const stored = await AsyncStorage.getItem("favoritos");
          const list = stored ? JSON.parse(stored) : [];
          setFavCount(list.length);
        } catch (e) {
          console.log("Erro ao carregar favoritos", e);
        }
      }

      async function loadUser() {
        const user = auth.currentUser;
        if (!user) return;

       
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          setUserData(snapshot.data());
        } else {
          setUserData({
            name: user.displayName || "Usuário",
            email: user.email,
            photo: user.photoURL || null,
          });
        }
      }

      loadFavorites();
      loadUser();
    }, [])
  );

  if (!userData) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.text}>Carregando perfil...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ alignItems: "center", marginBottom: 25 }}>
        <Image
          source={
            userData.photo
              ? { uri: userData.photo }
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

      <Text style={styles.text}>Nome: {userData.name}</Text>
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
