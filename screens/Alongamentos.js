import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, TouchableOpacity, Linking } from "react-native";
import getGlobalStyles from "../styles/global";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Alongamentos() {
  const [pose, setPose] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const theme = useColorScheme();
  const styles = getGlobalStyles(theme === "dark");

  async function fetchPose() {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(
        "https://raw.githubusercontent.com/rebeccaestes/yoga_api/master/yoga_api.json"
      );
      const data = await response.json();

      const random = data[Math.floor(Math.random() * data.length)];
      setPose(random);

    } catch (e) {
      console.log("ERRO:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPose();
  }, []);

  const getImageUrl = () => {
    if (!pose?.img_url || pose.img_url.length === 0) return null;
    return pose.img_url[0].url;
  };

  const abrirGoogle = () => {
    if (!pose?.english_name) return;
    const query = encodeURIComponent(pose.english_name + " yoga pose");
    const url = `https://www.google.com/search?q=${query}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.screen}>
      
      {loading && (
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <ActivityIndicator size="large" color="#4A8E7F" />
          <Text style={[styles.mutedText, { marginTop: 10 }]}>
            Carregando alongamento...
          </Text>
        </View>
      )}

      {error && (
        <Text style={[styles.text, { marginBottom: 20 }]}>
          Erro ao carregar alongamento 😓
        </Text>
      )}

      {!loading && !error && pose && (
        <View style={styles.card}>
          <Text style={[styles.text, { fontSize: 20, marginBottom: 10 }]}>
            {pose.english_name}
          </Text>

          <Text style={styles.mutedText}>{pose.sanskrit_name}</Text>

          {getImageUrl() && (
            <Image
              source={{ uri: getImageUrl() }}
              style={{
                width: "100%",
                height: 250,
                borderRadius: 12,
                marginTop: 15,
              }}
              resizeMode="cover"
            />
          )}

          
          <TouchableOpacity
            onPress={abrirGoogle}
            style={[styles.button, { marginTop: 20 }]}
          >
            <Text style={styles.buttonText}>Pesquisar no Google</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && (
        <TouchableOpacity style={styles.button} onPress={fetchPose}>
          <Text style={styles.buttonText}>Outro alongamento</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
