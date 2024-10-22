// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import QRScanScreen from "./src/screens/QRScanScreen";
import OrderScreen from "./src/screens/OrderScreen";
import ParkedScreen from "./src/screens/ParkedScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="QRScan" component={QRScanScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="Parked" component={ParkedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
