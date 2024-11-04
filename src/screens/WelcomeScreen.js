// src/screens/WelcomeScreen.js
import { React, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import globalStyles from "../globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const WelcomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://159.54.147.172:8080/usuario/loginCaseta",
        {
          userName: email,
          contraseña: password,
        }
      );

      if (response.data.data.isValid) {
        await AsyncStorage.setItem("userToken", response.data.data.token);
        navigation.navigate("QRScan");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log("Error de la solicitud: ", error);
      Alert.alert(
        "Error",
        "Las credenciales ingresadas son incorrectas o hubo un problema con el servidor."
      );
    }
  };

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
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
