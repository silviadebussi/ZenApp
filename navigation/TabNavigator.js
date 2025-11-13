import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/Home";
import MeditacaoScreen from "../screens/meditacao";
import FavoritosScreen from "../screens/Favoritos";
import PerfilScreen from "../screens/Perfil";
import ConfigScreen from "../screens/Config";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#777",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Início") iconName = "home";
          else if (route.name === "Meditar") iconName = "leaf";
          else if (route.name === "Favoritos") iconName = "heart";
          else if (route.name === "Perfil") iconName = "person";
          else if (route.name === "Config") iconName = "settings";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Meditar" component={MeditacaoScreen} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Config" component={ConfigScreen} />
    </Tab.Navigator>
  );
}
