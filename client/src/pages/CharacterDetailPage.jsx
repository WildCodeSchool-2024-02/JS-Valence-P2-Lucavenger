import axios from "axios";
import ColorThief from "colorthief";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/CharactereDetail.css"; // Assurez-vous que le nom du fichier CSS est correct
import Comics from "../components/Comics";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import { getCharacters } from "../services/Api";

function CharacterDetailPage() {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [bgColor, setBgColor] = useState("#000");
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const PUBLIC_KEY = "802465d01a9194dcef2b3def7f3eeeb5";
        const PRIVATE_KEY = "f04d78d769814078851b5f2a176e86c3ab919ad6";
        const timestamp = new Date().getTime().toString();
        const hash = CryptoJS.MD5(
          `${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`
        ).toString();
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters/${characterId}`,
          {
            params: {
              apikey: PUBLIC_KEY,
              ts: timestamp,
              hash,
            },
          }
        );
        setCharacter(response.data.data.results[0]);
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = `${response.data.data.results[0].thumbnail.path}.${response.data.data.results[0].thumbnail.extension}`;
        img.onload = () => {
          const colorThief = new ColorThief();
          const dominantColor = colorThief.getColor(img);
          setBgColor(`rgb(${dominantColor.join(",")})`);
          setLoading(false);
        };
      } catch (error) {
        console.error("Erreur lors de la récupération du personnage:", error);
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [characterId]);
  const handleSearch = async (query) => {
    try {
      const characters = await getCharacters(query);
      setSuggestions(characters);
    } catch (error) {
      console.error("Erreur lors de la récupération des suggestions:", error);
    }
  };
  const handleSuggestionClick = () => {
    setSuggestions([]);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="character-details">
      <div className="background-filter" style={{ backgroundColor: bgColor }} />
      <SearchBar
        onSearch={handleSearch}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
      />
      {character && (
        <>
          <div className="character-info">
            <div className="imageBox">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="character-image"
              />
            </div>
            <div className="character-description">
              <h2>{character.name}</h2>
              <p>{character.description}</p>
            </div>
          </div>
          <Comics characterId={character.id} />
        </>
      )}
    </div>
  );
}
export default CharacterDetailPage;
