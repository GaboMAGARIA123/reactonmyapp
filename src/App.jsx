import { useEffect, useState } from "react";
import sampleCards from "./components/Cards";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [filteredCards, setFilteredCards] = useState(sampleCards);

  useEffect(() => {
    const searchtext = searchText.toLowerCase();
    const result = sampleCards.filter(card =>
      card.title.toLowerCase().includes(searchtext)
    );
    setFilteredCards(result);
  }, [searchText]);

  useEffect(() => {
    const searchdes = searchDescription.toLowerCase();
    const result = sampleCards.filter(card =>
      card.description.toLowerCase().includes(searchdes)
    );
    setFilteredCards(result);
  }, [searchDescription]);

  const handleTextChange = (e) => setSearchText(e.target.value);
  const handleDescriptionChange = (e) => setSearchDescription(e.target.value);

  return (
    <>
      <div className="head">
        <h1>Gift Cards</h1>
      </div>

      <div className="explore-section">
        <h3>Explore</h3>
        <div className="search-inputs">
          <input
            type="text"
            placeholder="Search Cards by Title"
            value={searchText}
            onChange={handleTextChange}
          />
          <input
            type="text"
            placeholder="Search Cards by Description"
            value={searchDescription}
            onChange={handleDescriptionChange}
          />
        </div>
      </div>

      <div className="Cards">
        {filteredCards.map((card) => (
          <div key={card.id} className="card">
            <div className="card-image">
              <img src={card.image} alt={card.title} />
              <div className="card-tag">{card.tag}</div>
            </div>
            <div className="card-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <div className="card-buttons">
              <button>☆ Like</button>
              <button className="open">Open</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
