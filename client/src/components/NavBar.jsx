import PropTypes from "prop-types"; // Importer PropTypes
import "../Styles/NavBar.css";
import avengersLogo from "../assets/images/Logo Avengers transparent.png"; // Importez votre image du logo des Avengers
import SearchBar from "./SearchBar";

function NavBar({ onSearch, suggestions, onSuggestionClick }) {
  return (
    <div className="navbar">
      <div className="title-container">
        <span className="first-part">LUC</span>
        <img src={avengersLogo} alt="Avengers Logo" className="logo" />
        <span className="second-part">VENGER</span>
      </div>
      <div className="search-container">
        <SearchBar
          onSearch={onSearch}
          suggestions={suggestions}
          onSuggestionClick={onSuggestionClick}
        />
      </div>
    </div>
  );
}
NavBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, // Remplacez par les propriétés réelles de votre objet suggestion
      name: PropTypes.string.isRequired, // Exemple de propriétés
    })
  ).isRequired,
  onSuggestionClick: PropTypes.func.isRequired,
};
export default NavBar;
