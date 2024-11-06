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

  useEffect(() => {
    if (isFocused) {
      setScanned(false);
      setShowScanner(false);
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
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );

      console.log("Respuesta: ", response.data);
      const products = response.data.data.mongoData.products;

      const sqlData = response.data.data.sqlData;
      await AsyncStorage.setItem("sqlData", JSON.stringify(sqlData));

      console.log("Array de productos: ", products);
      await AsyncStorage.setItem("products", JSON.stringify(products));

      if (response.data.data) {
        navigation.navigate("Order");
      } else {
        Alert.alert("Error", "El código QR no es válido", [
          {
            text: "OK",
            onPress: () => setScanned(false), // Restablece el estado para permitir un nuevo escaneo
          },
        ]);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema con la validación del código QR", [
        {
          text: "OK",
          onPress: () => setScanned(false), // Restablece el estado para permitir un nuevo escaneo
        },
      ]);
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
  qrContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    flex: 1,
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
