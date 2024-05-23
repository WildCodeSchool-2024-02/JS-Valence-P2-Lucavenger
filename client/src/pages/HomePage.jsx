import { useState } from "react";
import "../Styles/Homepage.css";
import avengersLogo from "../assets/images/Logo Avengers transparent.png";
import SearchBar from "../components/SearchBar";
import { getCharacters } from "../services/Api";

function HomePage() {
  const [suggestions, setSuggestions] = useState([]);
  const searchCharacters = async (query) => {
    const characters = await getCharacters(query);
    setSuggestions(characters);
  };
  return (
    <div className="home-page">
      <div className="background" />
      <div className="title-container">
        <span className="first-part">LUC</span>
        <img src={avengersLogo} alt="Avengers Logo" className="logo" />
        <span className="second-part">VENGER</span>
      </div>
      <SearchBar onSearch={searchCharacters} suggestions={suggestions} />
    </div>
  );
}
export default HomePage;
