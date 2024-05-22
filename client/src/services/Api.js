// Api.js

import axios from "axios";
import CryptoJS from "crypto-js";

const PUBLIC_KEY = "802465d01a9194dcef2b3def7f3eeeb5";
const PRIVATE_KEY = "f04d78d769814078851b5f2a176e86c3ab919ad6";

const api = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
});

const getCharacters = async (query) => {
  const timestamp = new Date().getTime().toString();
  const hash = CryptoJS.MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY).toString();

  try {
    const response = await api.get("characters", {
      params: {
        apikey: PUBLIC_KEY,
        ts: timestamp,
        hash,
        nameStartsWith: query || "", // Vérifiez si la requête est définie, sinon, laissez-la vide
      },
    });

    return response.data.data.results;
  } catch (error) {
    console.error("Erreur lors de la recherche de personnages:", error);
    throw error; // Relancez l'erreur pour la capturer et la gérer correctement
  }
};

const fetchCharacter = async (characterId) => {
  const timestamp = new Date().getTime().toString();
  const hash = CryptoJS.MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY).toString();

  try {
    const response = await api.get(`characters/${characterId}`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: timestamp,
        hash,
      },
    });

    return response.data.data.results[0];
  } catch (error) {
    console.error("Erreur lors de la récupération du personnage:", error);
    throw error; // Relancez l'erreur pour la capturer et la gérer correctement
  }
};

export { fetchCharacter, getCharacters };
