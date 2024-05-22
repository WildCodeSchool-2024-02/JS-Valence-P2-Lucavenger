import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/SearchBar.css";

function SearchBar({ onSearch, suggestions, onSuggestionClick }) {
  const [query, setQuery] = useState("");

  const handleInputChange = ({ target }) => {
    const { value } = target; // Utilisation de la destructuration d'objet
    setQuery(value);
    onSearch(value);
  };

  const handleSuggestionClick = (character) => {
    onSuggestionClick(character);
  };

  const filteredSuggestions = suggestions.filter(
    (character) =>
      character.thumbnail &&
      `${character.thumbnail.path}.${character.thumbnail.extension}` !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" &&
      character.description.trim() !== ""
  );

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Rechercher un personnage Marvel..."
        />
        {filteredSuggestions.length > 0 && (
          <ul className="suggestion-list">
            {filteredSuggestions.map((character) => (
              <li key={character.id}>
                <Link
                  to={`/character/${character.id}`}
                  onClick={() => handleSuggestionClick(character)}
                >
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                  />
                  {character.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      thumbnail: PropTypes.shape({
        path: PropTypes.string.isRequired,
        extension: PropTypes.string.isRequired,
      }).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  onSuggestionClick: PropTypes.func.isRequired,
};

export default SearchBar;
