import { useEffect, useState } from "react";
import sampleCards from "./components/Cards";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [filteredCards, setFilteredCards] = useState(sampleCards);
  const [favorites, setFavorites] = useState([]);

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

  const toggleFavorite = (card) => {
  const exists = favorites.find(f => f.id === card.id);

if (exists) {
  setFavorites(favorites.filter(f => f.id !== card.id));  
} else {
  setFavorites([...favorites, card]);                     
}    
  };

  const totalPrice = favorites.reduce((sum, fav) => sum + Number(fav.price.replace("$", "")), 0);


  const handleTextChange = (e) => setSearchText(e.target.value);
  const handleDescriptionChange = (e) => setSearchDescription(e.target.value);

  const handleSortChange = (value) => {
    const listToSort = [...filteredCards];

    if (value === "low-to-high") {
      listToSort.sort((a, b) =>
        Number(a.price.replace("$", "")) - Number(b.price.replace("$", ""))
      );
    } else if (value === "high-to-low") {
      listToSort.sort((a, b) =>
        Number(b.price.replace("$", "")) - Number(a.price.replace("$", ""))
      );
    } else if (value === "title-a-z") {
      listToSort.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // reset to original sampleCards order
      setFilteredCards([...sampleCards]);
      return;
    }

    setFilteredCards(listToSort);
  };

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
            placeholder="Search Cards by Description"
            value={searchDescription}
            onChange={handleDescriptionChange}
          /><input
            type="text"
            placeholder="Search Cards by Title"
            value={searchText}
            onChange={handleTextChange}
          />
         <select onChange={(e) => handleSortChange(e.target.value)} defaultValue="sort">
            <option value="sort">Sort by...</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="title-a-z">Title A-Z</option>
          </select>
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
              <h4>{card.price}</h4>
              <p>{card.description}</p>
            </div>
            <div className="card-buttons">
              <button onClick={() => toggleFavorite(card)}>
                {favorites.some(f => f.id === card.id) ? "★ Favorited" : "☆ Like"}
              </button>
              <button className="open">Open</button>
            </div>
          </div>
        ))}
        <h1>Liked cards total price is {totalPrice}$</h1>
      </div>
    </>
  );
}

export default App;
