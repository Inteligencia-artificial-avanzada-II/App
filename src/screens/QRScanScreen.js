import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner"; // Importa el escáner de códigos QR
import { useIsFocused } from "@react-navigation/native"; // Para detectar si la pantalla está enfocada
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const QRScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false); // Controla si se debe mostrar el escáner
  const [userToken, setUserToken] = useState("");

  const isFocused = useIsFocused(); // Hook para detectar si la pantalla está enfocada

  // Solicitar permisos para usar la cámara
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
    fetchToken();
  }, []);

  // Restablecer el escáner si la pantalla vuelve a estar enfocada
  useEffect(() => {
    if (isFocused) {
      setScanned(false); // Permitir volver a escanear cuando regresa a la pantalla
      setShowScanner(false); // Reiniciar el escáner y volver a la pantalla principal
    }
  }, [isFocused]);

  const fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        setUserToken(token);
      }
    } catch (error) {
      console.log("Error al recuperar el token: ", error);
    }
  };

  // Función que se llama cuando el código QR es escaneado
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    try {
      console.log("Escaneado: ", data);
      const response = await axios.get(
        `http://159.54.147.172:8080/orden/consultarqr/${data}`,
        {
          Headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );

      console.log("Respuesta: ", response.data);

      if (response.data.data) {
        navigation.navigate("Order");
      } else {
        Alert.alert("Error", "El codigo QR no es valido");
        navigation.navigate("QRScan");
      }
    } catch (error) {
      console.log("Error en la solicitud", error);
      Alert.alert("Error", "Hubo un problema con la validación del código QR");
    }
  };

  // Si no se ha concedido el permiso para la cámara
  if (hasPermission === null) {
    return <Text>Solicitando permiso para la cámara...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No se concedió el permiso para la cámara.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Botón de regreso */}
      <View style={styles.containerBack}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
      </View>

      {/* Contenedor del escaneo de QR */}
      {!showScanner ? (
        <View style={styles.qrContainer}>
          <Image
            source={require("../../assets/Qr.png")}
            style={styles.qrImage}
          />
        </View>
      ) : (
        <View style={styles.qrContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} // Escanear solo si no ha sido escaneado
            style={StyleSheet.absoluteFillObject} // Hacer que el escáner ocupe toda la pantalla
          />
        </View>
      )}

      {/* Sección azul inferior */}
      {!showScanner && (
        <View style={styles.bottomSection}>
          {/* Botón para escanear */}
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => setShowScanner(true)} // Mostrar el escáner cuando se presione
          >
            <Text style={styles.buttonText}>LEER QR</Text>
            <Ionicons
              name="arrow-forward-outline"
              size={20}
              color="#000"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  containerBack: {
    position: "absolute",
    top: 50,
    left: 20,
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
  qrContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    flex: 1, // Asegurar que el escáner ocupe todo el espacio disponible
    width: "100%",
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "25%",
    backgroundColor: "#001789",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 5,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    right: 20,
  },
});

export default QRScanScreen;
