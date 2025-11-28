import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";

import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import Meditacao from "../screens/meditacao";
import EditarPerfil from "../screens/EditarPerfil"; 

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />

      <Stack.Screen name="Menu" component={DrawerNavigator} />
      <Stack.Screen name="Meditacao" component={Meditacao} />

      {/* NOVA TELA */}
      <Stack.Screen name="EditarPerfil" component={EditarPerfil} />

    </Stack.Navigator>
  );
}
