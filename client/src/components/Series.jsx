import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../Styles/Series.css";
import { fetchCharacterSeries } from "../services/Api";

function Series({ characterId }) {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="series-list">
      <h3>Séries</h3>
      <ul>
        {series.map((serie) => (
          <li key={serie.id}>
            <h4>{serie.title}</h4>
            <img
              src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
              alt={serie.title}
              className="series-image"
            />
            <p>{serie.description || "Pas de description disponible."}</p>
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
