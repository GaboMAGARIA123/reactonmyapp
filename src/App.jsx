import { useEffect, useMemo, useState } from "react";
import sampleCards from "./components/Cards";
import "./App.css";
import { Modals } from "./components/Modals";

function App() {
  const [cards, setCards] = useState(sampleCards);
  const [filteredCards, setFilteredCards] = useState(sampleCards);
  const [favorites, setFavorites] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "view" | "add" | "delete"

  // add form
  const [newCard, setNewCard] = useState({
    title: "",
    description: "",
    image: "",
    tag: "Nature",
    price: 0,
  });

  // keep filteredCards in sync when cards changes (after delete/add)
  useEffect(() => {
    setFilteredCards(cards);
  }, [cards]);

  const totalPrice = useMemo(() => {
    return favorites.reduce((sum, fav) => {
      const n = Number(String(fav.price).replace("$", ""));
      return sum + (Number.isFinite(n) ? n : 0);
    }, 0);
  }, [favorites]);

  const openModal = (type, card = null) => {
    setModalType(type);
    setSelectedCard(card);
    setIsModalOpen(true);

    if (type === "add") {
      setNewCard({
        title: "",
        description: "",
        image: "",
        tag: "Nature",
        price: 0,
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
    setSelectedCard(null);
  };

  const toggleFavorite = (card) => {
    const exists = favorites.some((f) => f.id === card.id);
    setFavorites(exists ? favorites.filter((f) => f.id !== card.id) : [...favorites, card]);
  };

  const deleteCard = (cardToDelete) => {
    setCards((prev) => prev.filter((c) => c.id !== cardToDelete.id));
    setFavorites((prev) => prev.filter((f) => f.id !== cardToDelete.id));
    closeModal();
  };

  const handleSortChange = (value) => {
    const list = [...cards];

    if (value === "low-to-high") {
      list.sort(
        (a, b) =>
          Number(String(a.price).replace("$", "")) -
          Number(String(b.price).replace("$", ""))
      );
      setFilteredCards(list);
      return;
    }

    if (value === "high-to-low") {
      list.sort(
        (a, b) =>
          Number(String(b.price).replace("$", "")) -
          Number(String(a.price).replace("$", ""))
      );
      setFilteredCards(list);
      return;
    }

    if (value === "title-a-z") {
      list.sort((a, b) => String(a.title).localeCompare(String(b.title)));
      setFilteredCards(list);
      return;
    }

    setFilteredCards(cards);
  };

  const handleAddChange = (key, value) => {
    setNewCard((prev) => ({ ...prev, [key]: value }));
  };

  const submitAddCard = () => {
    const title = newCard.title.trim();
    const description = newCard.description.trim();
    const image = newCard.image.trim();
    const tag = newCard.tag.trim();
    const priceNum = Number(newCard.price);

    if (!title || !description || !image || !tag || !Number.isFinite(priceNum)) {
      // keep it simple (no extra libs)
      alert("Please fill all fields correctly.");
      return;
    }

    const created = {
      id: crypto?.randomUUID ? crypto.randomUUID() : Date.now(),
      title,
      description,
      image,
      tag,
      price: `$${priceNum}`,
    };

    setCards((prev) => [created, ...prev]);
    closeModal();
  };

  return (
    <>
      <div className="head">
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

          <button className="open" onClick={() => openModal("add")}>
            + Add new card
          </button>
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
                onClick={() => toggleFavorite(card)}
                className={favorites.some((f) => f.id === card.id) ? "fav-on" : ""}
              >
                {favorites.some((f) => f.id === card.id) ? "★ Favorited" : "☆ Like"}
              </button>

              <div className="editdel">
                <button onClick={() => openModal("view", card)}>View</button>
                <button className="red" onClick={() => openModal("delete", card)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="total">
        Liked cards total price is <b>${totalPrice}</b>
      </div>

      <Modals
        isOpen={isModalOpen}
        title={
          modalType === "add"
            ? "Add New Card"
            : modalType === "delete"
            ? "Delete Card"
            : selectedCard
            ? selectedCard.title
            : ""
        }
        onClose={closeModal}
        containerclassName={
          modalType === "add"
            ? "modal-wide"
            : modalType === "view"
            ? "modal-view"
            : "modal-confirm"
        }
      >
        {modalType === "view" && selectedCard && (
          <div className="view-wrap">
            <img className="view-image" src={selectedCard.image} alt={selectedCard.title} />

            <div className="view-content">
              <p className="view-desc">{selectedCard.description}</p>

              <div className="view-row">
                <span className="view-label">Tag:</span>
                <span>{selectedCard.tag}</span>
              </div>

              <div className="view-row">
                <span className="view-label">Price:</span>
                <span>{selectedCard.price}</span>
              </div>

              <div className="modal-footer">
                <button className="btn" onClick={() => toggleFavorite(selectedCard)}>
                  {favorites.some((f) => f.id === selectedCard.id) ? "★ Favorited" : "☆ Like"}
                </button>

                <div className="footer-right">
                  <button className="btn" onClick={closeModal}>
                    Close
                  </button>
                  <button className="btn red-btn" onClick={() => openModal("delete", selectedCard)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {modalType === "add" && (
          <div className="form">
            <div className="field">
              <label>Title <span>*</span></label>
              <input
                placeholder="Enter card title"
                value={newCard.title}
                onChange={(e) => handleAddChange("title", e.target.value)}
              />
            </div>

            <div className="field">
              <label>Description <span>*</span></label>
              <textarea
                placeholder="Enter card description"
                value={newCard.description}
                onChange={(e) => handleAddChange("description", e.target.value)}
              />
            </div>

            <div className="field">
              <label>Image URL <span>*</span></label>
              <input
                placeholder="https://example.com/image.jpg"
                value={newCard.image}
                onChange={(e) => handleAddChange("image", e.target.value)}
              />
            </div>

            <div className="grid2">
              <div className="field">
                <label>Tag <span>*</span></label>
                <select value={newCard.tag} onChange={(e) => handleAddChange("tag", e.target.value)}>
                  <option>Nature</option>
                  <option>Food</option>
                  <option>Travel</option>
                  <option>Shopping</option>
                  <option>Games</option>
                </select>
              </div>

              <div className="field">
                <label>Price ($) <span>*</span></label>
                <input
                  type="number"
                  min="0"
                  value={newCard.price}
                  onChange={(e) => handleAddChange("price", e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn blue-btn" onClick={submitAddCard}>
                Add Card
              </button>
            </div>
          </div>
        )}
        {modalType === "delete" && selectedCard && (
          <div className="confirm">
            <p className="confirm-text">
              Are you sure you want to delete{" "}
              <b>&quot;{selectedCard.title}&quot;</b>? This action cannot be undone.
            </p>

            <div className="modal-footer">
              <button className="btn" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn red-btn" onClick={() => deleteCard(selectedCard)}>
                Delete
              </button>
            </div>
          </div>
        )}
      </Modals>
    </>
  );
}

export default App;
