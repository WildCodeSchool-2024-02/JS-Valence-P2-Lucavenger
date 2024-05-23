import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../Styles/Series.css";
import { fetchCharacterSeries } from "../services/Api";

function Series({ characterId }) {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  const unwantedImageUrl =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  useEffect(() => {
    const fetchSeriesData = async () => {
      try {
        const seriesData = await fetchCharacterSeries(characterId);
        setSeries(seriesData);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des séries:", error);
        setLoading(false);
      }
    };

    fetchSeriesData();
  }, [characterId]);

  if (loading) {
    return <p>Chargement des séries...</p>;
  }

  const filteredSeries = series.filter(
    (serie) =>
      `${serie.thumbnail.path}.${serie.thumbnail.extension}` !==
      unwantedImageUrl
  );

  return (
    <div className="series-list">
      <h3>Séries</h3>
      <ul>
        {filteredSeries.map((serie) => (
          <li key={serie.id}>
            <h4>{serie.title}</h4>
            <img
              src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
              alt={serie.title}
              className="series-image"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

Series.propTypes = {
  characterId: PropTypes.number.isRequired,
};

export default Series;
