import { useState } from "react";
import "../Styles/Homepage.css";
import SearchBar from "../components/SearchBar";
import { getCharacters } from "../services/Api";

function HomePage() {
  const [suggestions, setSuggestions] = useState([]);

  const searchCharacters = async (query) => {
    const characters = await getCharacters(query);
    setSuggestions(characters);
  };

  const pageTitle = "LUCAVENGER";

  return (
    <div className="home-page">
      <div className="background" />
      <h1>{pageTitle}</h1>
      <SearchBar onSearch={searchCharacters} suggestions={suggestions} />
    </div>
  );
}

export default HomePage;
