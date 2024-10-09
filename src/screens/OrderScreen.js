import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const OrderScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Contenedor para el título y el número de orden */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Orden</Text>
        <Text style={styles.orderNumber}>#743687456</Text>
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
          <Text style={styles.itemText}>Origen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="basket"
              size={20}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.itemText}>Productos</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
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
