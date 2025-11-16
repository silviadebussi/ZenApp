import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ dark }) => (
          <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
            <StackNavigator />
          </NavigationContainer>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}
