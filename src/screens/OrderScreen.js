import { React, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderScreen = ({ navigation }) => {
  const [orderId, setOrderId] = useState("");
  const [origen, setOrigen] = useState("");

  useEffect(() => {
    const fetchOrderId = async () => {
      try {
        const sqlData = await AsyncStorage.getItem("sqlData");
        if (sqlData) {
          const parsedData = JSON.parse(sqlData);
          setOrderId(parsedData.idOrden);
          setOrigen(parsedData.origen);
        } else {
          console.error("No se encontro sqlData en AsyncStorage");
        }
      } catch (error) {
        console.error("Error al obtener el idOrden: ", error);
      }
    };
    fetchOrderId();
  }, []);

  return (
    <View style={styles.container}>
      {/* Contenedor para el título y el número de orden */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Orden</Text>
        <Text style={styles.orderNumber}># {orderId}</Text>
      </View>

      <View style={styles.itemContainer}>
        {/* Botón con icono y texto "Origen" */}
        <TouchableOpacity style={styles.item}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="document"
              size={20}
              color="#fff"
              style={styles.icon}
            />
            {/* Icono de documento */}
          </View>
          <Text style={styles.itemText}>{origen}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("Products")}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name="basket"
              size={20}
              color="#fff"
              style={styles.icon}
            />
          </View>
          <Text style={styles.itemText}>Productos</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Parked")}
      >
        <Text style={styles.buttonText}>Acomodar</Text>
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 40,
    marginTop: 150,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0033cc",
  },
  orderNumber: {
    fontSize: 16,
    color: "#000",
  },
  itemContainer: {
    marginBottom: 50,
    width: "100%",
  },
  item: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  iconContainer: {
    backgroundColor: "#0033cc",
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
  },
  button: {
    position: "absolute",
    bottom: 100,
    backgroundColor: "#0033cc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderScreen;
