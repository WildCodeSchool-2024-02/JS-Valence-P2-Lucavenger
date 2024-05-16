import { useState } from "react";
import "./App.css";
import MarvelAPI from "./components/MarvelAPI";
import SearchBar from "./components/SearchBar";
import CharacterCard from "./components/CharacterCard";
import Description from "./components/Description";
import Comics from "./components/Comics"; // Importe le composant Comics
import "./components/Home.css";

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm] = useState("");

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="app_container">
      <h1 className="home_title">LUCAVENGERS</h1>
      <SearchBar onCharacterSelect={handleCharacterSelect} />
      <MarvelAPI
        searchTerm={searchTerm}
        onCharacterSelect={handleCharacterSelect}
      />
      {selectedCharacter && (
        <div className="character_info">
          <CharacterCard character={selectedCharacter} />
          <Description description={selectedCharacter.description} />
          <Comics characterId={selectedCharacter.id} />{" "}
          {/* Render Comics with characterId */}
        </div>
      )}
    </div>
  );
}

export default App;
