import axios from "axios";
import CryptoJS from "crypto-js";
import PropTypes from "prop-types"; // Importer PropTypes
import { useEffect, useState } from "react";
import "../Styles/Comics.css";

function Comics({ characterId }) {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    if (!characterId) return;

    const publicKey = "d48b70dc690340116472afc5b02aa14b";
    const privateKey = "c09e9c38566391defe2a6c0f74386a57a394e501";
    const timestamp = Date.now().toString();
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
    const url = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

    axios
      .get(url)
      .then((response) => {
        setComics(response.data.data.results);
      })
      .catch((error) => {
        console.error("Error fetching comics:", error);
      });
  }, [characterId]);

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
