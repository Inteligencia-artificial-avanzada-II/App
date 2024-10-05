// App.js
import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import { useFonts } from "expo-font";
import {
  Urbanist_400Regular,
  Urbanist_700Bold,
} from "@expo-google-fonts/urbanist";

export default function App() {
  // Cargar la fuente Urbanist
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_700Bold,
  });

  // Mientras se cargan las fuentes, mostramos un indicador de carga simple
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
