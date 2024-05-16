import PropTypes from "prop-types";
import "./CharacterCard.css";

function CharacterCard({ character }) {
  return (
    <div className="character-card">
      <img
        className="character-image"
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
    </div>
  );
}

CharacterCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      path: PropTypes.string.isRequired,
      extension: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CharacterCard;
