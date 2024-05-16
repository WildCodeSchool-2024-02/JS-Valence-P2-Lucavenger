import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import "./Comics.css";

function Comics({ characterId }) {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    if (!characterId) {
      return;
    }

    const publicKey = "d48b70dc690340116472afc5b02aa14b";
    const privateKey = "c09e9c38566391defe2a6c0f74386a57a394e501";
    const timestamp = Date.now().toString();
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

    const url = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

    axios
      .get(url)
      .then((response) => {
        // Filtrer les comics sans images
        const filteredComics = response.data.data.results.filter(
          (comic) =>
            comic.thumbnail &&
            `${comic.thumbnail.path}.${comic.thumbnail.extension}` !==
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        );
        setComics(filteredComics);
      })
      .catch((error) => {
        console.error("Error fetching comics:", error);
      });
  }, [characterId]);

  return (
    <div className="comics-container">
      <h2>Comics</h2>
      <div className="comics-grid">
        {comics.map((comic) => (
          <div key={comic.id} className="comic-item">
            <div className="comic-image">
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
            </div>
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
