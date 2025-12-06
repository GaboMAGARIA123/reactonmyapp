import { useState } from "react";
import sampleCards from "./components/Cards";
import "./App.css";
import { Wrapper } from "./components/Wrapper";

function App() {
  const [filteredCards, setFilteredCards] = useState(sampleCards);
  const [favorites, setFavorites] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFavorite = (card) => {
    const exists = favorites.find((f) => f.id === card.id);

    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== card.id));
    } else {
      setFavorites([...favorites, card]);
    }
  };

  const deleteCard = (cardToDelete) => {
    const updated = filteredCards.filter((c) => c.id !== cardToDelete.id);
    setFilteredCards(updated);

    setFavorites(favorites.filter((f) => f.id !== cardToDelete.id));

    if (selectedCard && selectedCard.id === cardToDelete.id) {
      setIsModalOpen(false);
      setSelectedCard(null);
    }
  };

  const totalPrice = favorites.reduce(
    (sum, fav) => sum + Number(fav.price.replace("$", "")),
    0
  );

  const handleSortChange = (value) => {
    const list = [...filteredCards];

    if (value === "low-to-high") {
      list.sort(
        (a, b) =>
          Number(a.price.replace("$", "")) - Number(b.price.replace("$", ""))
      );
    } else if (value === "high-to-low") {
      list.sort(
        (a, b) =>
          Number(b.price.replace("$", "")) - Number(a.price.replace("$", ""))
      );
    } else if (value === "title-a-z") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      setFilteredCards([...sampleCards]);
      return;
    }

    setFilteredCards(list);
  };

  const openViewModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Wrapper>Hello world</Wrapper>
      <Wrapper>Hello world 2</Wrapper>
      <Wrapper>Hello world 3</Wrapper>



      
      {/* <div className="head">
        <h1>Gift Cards</h1>
      </div>

      <div className="explore-section">
        <h3>Explore</h3>

        <div className="search-inputs">
          <select
            className="selector"
            onChange={(e) => handleSortChange(e.target.value)}
            defaultValue="sort"
          >
            <option value="sort">Sort by...</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="title-a-z">Title A-Z</option>
          </select>

          <button className="open">+Add new card</button>
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
              <button
                className="disabled-fav"
                onClick={(e) => {
                  e.target.classList.add("shake");
                  setTimeout(() => e.target.classList.remove("shake"), 500);
                }}
              >
                {favorites.some((f) => f.id === card.id)
                  ? "★ Favorited"
                  : "☆ Like"}
              </button>

              <div className="editdel">
                <button onClick={() => openViewModal(card)}>View</button>

                <button>Edit</button>

                <button className="red" onClick={() => deleteCard(card)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1>Liked cards total price is {totalPrice}$</h1>

      {isModalOpen && selectedCard && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img
              className="modal-image"
              src={selectedCard.image}
              alt={selectedCard.title}
            />

            <div className="modal-content">
              <h2>{selectedCard.title}</h2>
              <p>{selectedCard.description}</p>
              <p>
                <strong>Price:</strong> {selectedCard.price}
              </p>

              <br />
              <hr />

              <div className="card-buttons">
                <button onClick={() => toggleFavorite(selectedCard)}>
                  {favorites.some((f) => f.id === selectedCard.id)
                    ? "★ Favorited"
                    : "☆ Like"}
                </button>

                <button className="close-btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default App;
