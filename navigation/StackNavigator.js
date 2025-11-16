import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import Meditacao from "../screens/meditacao";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Meditacao" component={Meditacao} />
    </Stack.Navigator>
  );
}
