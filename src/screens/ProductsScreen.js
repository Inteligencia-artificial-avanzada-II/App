import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem("products");
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        } else {
          Alert.alert("Error", "No se encontraron productos almacenados.");
        }
      } catch (error) {
        console.error("Error al cargar los productos: ", error);
        Alert.alert("Error", "Hubo un problema al cargar los productos.");
      }
    };

    loadProducts();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: index % 2 === 0 ? "#0033cc" : "#ff0000" },
        ]}
      >
        <Ionicons name="cube" size={20} color="#fff"></Ionicons>
      </View>
      <Text style={styles.itemText}>{item.itemDescription}</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{item.requestedQuantity}</Text>
        <Text style={styles.unitText}>{item.unitOfMeasure}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-undo-circle" size={35} color="#0033cc" />
        </TouchableOpacity>
        <Text style={styles.title}>Products</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.itemContainer}
      />
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 40,
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0033cc",
  },
  itemContainer: {
    paddingBottom: 50,
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
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
    flex: 1,
  },
  quantityText: {
    fontSize: 16,
    color: "#555",
    marginRight: 5,
  },
  unitText: {
    fontSize: 16,
    color: "#555",
  },
  backButton: {
    marginRight: 10,
    position: "absolute",
    left: 0,
  },
});

export default ProductsScreen;
