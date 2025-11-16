import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import Meditacao from "../screens/meditacao";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Meditacao" component={Meditacao} />
    </Stack.Navigator>
  );
}
