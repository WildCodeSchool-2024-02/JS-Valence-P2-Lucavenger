import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../Styles/Comics.css";
import { fetchCharacterComics } from "../services/Api";

function Comics({ characterId }) {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  const unwantedImageUrl =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

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

  const filteredComics = comics.filter(
    (comic) =>
      `${comic.thumbnail.path}.${comic.thumbnail.extension}` !==
      unwantedImageUrl
  );

  return (
    <div className="comics">
      <h2>Comics</h2>
      <div className="comics-list">
        {filteredComics.map((comic) => (
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
