import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import "../Styles/BottomNavBar.css";

function BottomNavBar({ handleFilterChange }) {
  const location = useLocation();

  return (
    <div className="bottom-nav-bar">
      <Link
        className="filter-option"
        to={{ pathname: location.pathname, search: "?filter=comics" }}
        onClick={() => handleFilterChange("comics")}
      >
        <div className="filter-ball1">C</div>
      </Link>
      <Link
        className="filter-option"
        to={{ pathname: location.pathname, search: "?filter=series" }}
        onClick={() => handleFilterChange("series")}
      >
        <div className="filter-ball2">S</div>
      </Link>
    </div>
  );
}

BottomNavBar.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
};

export default BottomNavBar;
