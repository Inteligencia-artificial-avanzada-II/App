// src/screens/WelcomeScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import globalStyles from "../globalStyles";
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerBack}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
      </View>
      <Text style={[globalStyles.textBold, styles.title]}>
        ¡Bienvenido de{"\n"}nuevo!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu correo"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
      />

      <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={[globalStyles.textBold, styles.buttonText]}>
          Iniciar Sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  containerBack: {
    marginTop: 50,
    width: 50,
    height: 50,
    borderColor: "#E8ECF4",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 24,
    color: "#1E232C",
  },
  title: {
    fontSize: 40,
    color: "#0033cc",
    marginTop: 30,
    marginBottom: 40,
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    marginBottom: 15,
  },
  forgotPasswordText: {
    alignSelf: "flex-end",
    color: "#6A707C",
    marginTop: 15,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0033cc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default WelcomeScreen;
