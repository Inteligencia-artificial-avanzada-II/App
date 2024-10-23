import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const ParkedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Icono de éxito */}
      <Image
        source={require("../../assets/OK.png")} // Asegúrate de tener el icono correcto en tu carpeta de assets
        style={styles.icon}
      />

      {/* Texto indicando que el camión ha sido descargado */}
      <Text style={styles.title}>Camion Acomodado</Text>

      {/* Botón para regresar al login */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("QRScan")} // Cambia "Login" por la pantalla a la que quieres navegar
      >
        <Text style={styles.buttonText}>Inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0033cc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    position: "absolute",
    bottom: 150,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ParkedScreen;
