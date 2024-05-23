import axios from "axios";
import CryptoJS from "crypto-js";

const PUBLIC_KEY = "802465d01a9194dcef2b3def7f3eeeb5";
const PRIVATE_KEY = "f04d78d769814078851b5f2a176e86c3ab919ad6";

const api = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
});

const generateHash = () => {
  const timestamp = new Date().getTime().toString();
  const hash = CryptoJS.MD5(
    `${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`
  ).toString();
  return { ts: timestamp, hash };
};

const getCharacters = async (query) => {
  try {
    const { ts, hash } = generateHash();
    const response = await api.get("characters", {
      params: {
        apikey: PUBLIC_KEY,
        ts,
        hash,
        nameStartsWith: query || "",
      },
    });
    return response.data.data.results;
  } catch (error) {
    console.error("Erreur lors de la recherche de personnages:", error);
    throw error;
  }
};

const fetchCharacter = async (characterId) => {
  try {
    const { ts, hash } = generateHash();
    const response = await api.get(`characters/${characterId}`, {
      params: {
        apikey: PUBLIC_KEY,
        ts,
        hash,
      },
    });
    return response.data.data.results[0];
  } catch (error) {
    console.error("Erreur lors de la récupération du personnage:", error);
    throw error;
  }
};

const fetchCharacterComics = async (characterId) => {
  try {
    const { ts, hash } = generateHash();
    const response = await api.get(`characters/${characterId}/comics`, {
      params: {
        apikey: PUBLIC_KEY,
        ts,
        hash,
      },
    });
    return response.data.data.results;
  } catch (error) {
    console.error("Erreur lors de la récupération des comics:", error);
    throw error;
  }
};

const fetchCharacterSeries = async (characterId) => {
  try {
    const { ts, hash } = generateHash();
    const response = await api.get(`characters/${characterId}/series`, {
      params: {
        apikey: PUBLIC_KEY,
        ts,
        hash,
      },
    });
    return response.data.data.results;
  } catch (error) {
    console.error("Erreur lors de la récupération des séries:", error);
    throw error;
  }
};

export {
  fetchCharacter,
  fetchCharacterComics,
  fetchCharacterSeries,
  getCharacters,
};
