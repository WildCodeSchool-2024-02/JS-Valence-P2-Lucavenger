import ColorThief from "colorthief";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/CharacterDetail.css";
import BottomNavBar from "../components/BottomNavBar";
import Comics from "../components/Comics";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import Series from "../components/Series";
import { fetchCharacter, getCharacters } from "../services/Api";

function CharacterDetailPage() {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [bgColor, setBgColor] = useState("#000");
  const [filter, setFilter] = useState("all"); // État pour stocker le filtre sélectionné

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const characterData = await fetchCharacter(characterId);
        setCharacter(characterData);

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = `${characterData.thumbnail.path}.${characterData.thumbnail.extension}`;

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

    fetchCharacterData();
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

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="character-details">
      <div className="background-filter" style={{ backgroundColor: bgColor }} />
      <NavBar
        onSearch={handleSearch}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
      />
      {character && (
        <>
          <div className="character-info">
            <div className="card">
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
          <BottomNavBar handleFilterChange={handleFilterChange} />
          {(filter === "all" || filter === "comics") && (
            <Comics characterId={character.id} />
          )}
          {(filter === "all" || filter === "series") && (
            <Series characterId={character.id} />
          )}
        </>
      )}
    </div>
  );
}

export default CharacterDetailPage;
