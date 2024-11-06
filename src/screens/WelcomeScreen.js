// src/screens/WelcomeScreen.js
import { React, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import globalStyles from "../globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const WelcomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0033cc" />
        </View>
      )}

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
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="#6A707C"
          />
        </TouchableOpacity>
      </View>

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
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
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
  inputPassword: {
    flex: 1,
    padding: 15,
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 10,
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
