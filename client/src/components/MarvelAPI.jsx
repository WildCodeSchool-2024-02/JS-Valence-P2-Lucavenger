import { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import PropTypes from "prop-types";

function MarvelAPI({ searchTerm, onCharacterSelect }) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        if (!searchTerm) return;

        const publicKey = "d48b70dc690340116472afc5b02aa14b";
        const privateKey = "c09e9c38566391defe2a6c0f74386a57a394e501";
        const timestamp = Date.now().toString();
        const hash = CryptoJS.MD5(
          timestamp + privateKey + publicKey
        ).toString();

        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${searchTerm}`
        );
        setCharacters(response.data.data.results);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la recherche:", error);
      }
    };

    fetchCharacters();
  }, [searchTerm]);

  const handleCharacterSelect = (character) => {
    onCharacterSelect(character);
  };

  const handleKeyPress = (event, character) => {
    if (event.key === "Enter") {
      handleCharacterSelect(character);
    }
  };

  return (
    <div className="search-results">
      {characters.map((character) => (
        <div
          key={character.id}
          className="search-result"
          onClick={() => handleCharacterSelect(character)}
          onKeyDown={(event) => handleKeyPress(event, character)}
          tabIndex={0}
          role="button"
        >
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <h3>{character.name}</h3>
        </div>
      ))}
    </div>
  );
}

MarvelAPI.propTypes = {
  searchTerm: PropTypes.string,
  onCharacterSelect: PropTypes.func.isRequired,
};

MarvelAPI.defaultProps = {
  searchTerm: "",
};

export default MarvelAPI;
