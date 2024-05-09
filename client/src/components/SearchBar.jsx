import { useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");



  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Recherche ton héros Marvel"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar-input"
      />
      <img src="./image/search.png" alt="Rechercher" className="search-bar-button"/>
    </div>
  );
}

export default SearchBar;
