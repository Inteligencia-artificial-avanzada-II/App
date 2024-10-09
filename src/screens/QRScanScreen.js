import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { BarCodeScanner } from "expo-barcode-scanner";  // Importa el escáner de códigos QR

const QRScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);  // Controla si se debe mostrar el escáner

  // Solicitar permisos para usar la cámara
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  // Función que se llama cuando el código QR es escaneado
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("Código escaneado", `El código escaneado es: ${data}`);
    
    // Navegar a OrderScreen después del escaneo
    navigation.navigate("Order");
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
          <Image source={require("../../assets/Qr.png")} style={styles.qrImage} />
        </View>
      ) : (
        <View style={styles.qrContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} // Escanear solo si no ha sido escaneado
            style={StyleSheet.absoluteFillObject}  // Hacer que el escáner ocupe toda la pantalla
          />
        </View>
      )}

      {/* Sección azul inferior */}
      <View style={styles.bottomSection}>
        {/* Botón para escanear */}
        {!showScanner && (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => setShowScanner(true)}  // Mostrar el escáner cuando se presione
          >
            <Text style={styles.buttonText}>LEER QR</Text>
            <Ionicons
              name="arrow-forward-outline"
              size={20}
              color="#000"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}

        {/* Botón para escanear de nuevo */}
        {scanned && showScanner && (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => setScanned(false)} // Permitir reescanear al presionar el botón
          >
            <Text style={styles.buttonText}>Escanear de nuevo</Text>
            <Ionicons
              name="arrow-forward-outline"
              size={20}
              color="#000"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
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
    flex: 1,  // Asegurar que el escáner ocupe todo el espacio disponible
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
