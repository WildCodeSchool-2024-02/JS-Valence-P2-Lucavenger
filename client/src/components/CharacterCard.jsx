import ColorThief from "colorthief";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function CharacterCard({ character }) {
  const [bgColor, setBgColor] = useState("white");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;

    img.onload = () => {
      const colorThief = new ColorThief();
      const dominantColors = colorThief.getPalette(img, 2);
      const [firstColor, secondColor] = dominantColors;
      setBgColor(
        `linear-gradient(to right, rgb(${firstColor.join(
          ","
        )}), rgb(${secondColor.join(",")}))`
      );
    };
  }, [character.thumbnail.path, character.thumbnail.extension]);

  return (
    <li style={{ background: bgColor }}>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
      <div className="character-info">
        <p className="character-name">{character.name}</p>
        {character.description && (
          <p className="character-description">{character.description}</p>
        )}
      </div>
    </li>
  );
}

CharacterCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      path: PropTypes.string.isRequired,
      extension: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default CharacterCard;
