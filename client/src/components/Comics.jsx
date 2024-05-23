import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../Styles/Comics.css";
import { fetchCharacterComics } from "../services/Api";

function Comics({ characterId }) {
  // Notez la déclaration de fonction ici
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const comicsData = await fetchCharacterComics(characterId);
        setComics(comicsData);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des comics:", error);
        setLoading(false);
      }
    };

    fetchComics();
  }, [characterId]);

  if (loading) {
    return <p>Chargement des comics...</p>;
  }

  return (
    <div className="comics">
      <h2>Comics</h2>
      <div className="comics-list">
        {comics.map((comic) => (
          <div key={comic.id} className="comic-item">
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <p>{comic.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

Comics.propTypes = {
  characterId: PropTypes.number.isRequired,
};

export default Comics;
