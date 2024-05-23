import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./Styles/App.css";
import backgroundImage from "./assets/images/Backlground.jpg"; // Assurez-vous d'importer votre image de fond
import CharacterDetailPage from "./pages/CharacterDetailPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="background-filter" />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            path="/character/:characterId"
            element={<CharacterDetailPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
