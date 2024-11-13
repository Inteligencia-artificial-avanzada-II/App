// src/services/AuthService.js
import axios from "axios";
import { BASE_URL } from "@env";

export const loginCaseta = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/usuario/loginCaseta`, {
      userName: email,
      contraseña: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error en loginCaseta:", error);
    throw error;
  }
};
