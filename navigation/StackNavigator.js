import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import DrawerNavigator from "./DrawerNavigator";
import Meditacao from "../screens/meditacao";
import EditarPerfil from "../screens/EditarPerfil";

const Stack = createStackNavigator();

export default function StackNavigator() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  if (user === undefined) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Menu" component={DrawerNavigator} />
          <Stack.Screen name="Meditacao" component={Meditacao} />
          <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
        </>
      )}
    </Stack.Navigator>
  );
}
