import PropTypes from "prop-types";
import "./Description.css";

function Description({ description }) {
  return (
    <div className="description-card">
      <p className="description-text">{description}</p>
    </div>
  );
}

Description.propTypes = {
  description: PropTypes.string.isRequired,
};

export default Description;
