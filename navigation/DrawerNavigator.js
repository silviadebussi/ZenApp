import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import Perfil from "../screens/Perfil";
import Configs from "../screens/Config";


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Início" component={TabNavigator} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="Configurações" component={Configs} />
    </Drawer.Navigator>
  );
}
