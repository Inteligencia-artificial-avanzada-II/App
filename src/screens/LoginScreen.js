import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import globalStyles from "../globalStyles";


const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Imagen de fondo utilizando ImageBackground */}
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={styles.backgroundImage}
      >
        {/* Vista para aplicar opacidad a la imagen */}
        <View style={styles.overlay} />

        {/* Contenedor del login */}
        <View style={styles.loginContainer}>
          <Image
            source={require("../../assets/bimboLogo.png")}
            style={styles.logo}
          />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.6}
            onPress={() => navigation.navigate("Welcome")}
          >
            <Text style={[globalStyles.textBold, styles.buttonText]}>
              Iniciar Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Fondo negro para la pantalla
  },
  backgroundImage: {
    flex: 1, // Permitir que la imagen ocupe todo el espacio disponible
    justifyContent: "flex-end", // Coloca el contenido en la parte inferior
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Cubre toda el área del ImageBackground
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Color negro con opacidad
  },
  loginContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    padding: 5,
    height: "30%", // Ajusta la altura para que no ocupe toda la pantalla
  },
  logo: {
    width: 169,
    height: 140,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#001789",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
