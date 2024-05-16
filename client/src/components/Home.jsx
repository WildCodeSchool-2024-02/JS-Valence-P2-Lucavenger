import { useState } from "react";
import "./Home.css";
import MarvelAPI from "./MarvelAPI";
import SearchBar from "./SearchBar";
import CharacterCard from "./CharacterCard";
import Description from "./Description";
import Comics from "./Comics";

function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="home_container">
      <h1 className="home_title">LUCAVENGERS</h1>
      <SearchBar onSearch={handleSearch} />
      <MarvelAPI
        searchTerm={searchTerm}
        onCharacterSelect={handleCharacterSelect}
      />
      {selectedCharacter && (
        <div className="character_info">
          <CharacterCard character={selectedCharacter} />
          <Description description={selectedCharacter.description} />
          <Comics characterId={selectedCharacter.id} />{" "}
        </div>
      )}
    </div>
  );
}

export default Home;
