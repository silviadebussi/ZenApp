import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Favoritos from "../screens/Favoritos";
import Inspirar from "../screens/inspiracao";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: { height: 70, paddingBottom: 10 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/casa.png")}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#4CAF50" : "#888",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Inspirar"
        component={Inspirar}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/lampada.png")}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#4CAF50" : "#888",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/coracao.png")}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#4CAF50" : "#888",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
