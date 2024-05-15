import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import PropTypes from "prop-types";
import "./SearchBar.css";

function SearchBar({ onCharacterSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    const publicKey = "d48b70dc690340116472afc5b02aa14b";
    const privateKey = "c09e9c38566391defe2a6c0f74386a57a394e501";
    const timestamp = Date.now().toString();
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

    const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchTerm}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

    axios
      .get(url)
      .then((response) => {
        const characters = response.data.data.results;
        setSuggestions(characters);
      })
      .catch((error) => {
        console.error("Error fetching character suggestions:", error);
        setSuggestions([]);
      });
  }, [searchTerm]);

  const handleSelectCharacter = (character) => {
    onCharacterSelect(character);
    setSuggestions([]);
  };

  const handleKeyPress = (event, character) => {
    if (event.key === "Enter") {
      handleSelectCharacter(character);
    }
  };

  return (
    <div className="search-container" ref={searchRef}>
      <input
        type="text"
        placeholder="Search character..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.slice(0, 5).map((character) => (
            <div
              key={character.id}
              className="search-suggestions-item"
              onClick={() => handleSelectCharacter(character)}
              onKeyDown={(e) => handleKeyPress(e, character)}
              tabIndex={0} // Make the div focusable
              role="button" // Define the role as a button
            >
              {character.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  onCharacterSelect: PropTypes.func.isRequired,
};

export default SearchBar;
