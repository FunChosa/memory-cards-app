import { useState, useEffect } from "react";
import NavigationButton from "./NavigationButton";
import { FaAngleUp } from "react-icons/fa6";
import "../styles/CollectionCards.css";
import { IoAdd } from "react-icons/io5";
import { LuFileJson2 } from "react-icons/lu";
import { CiExport } from "react-icons/ci";
import { handleExportCards } from "../functions";
import useStore from "../store";
import CollectionCard from "./CollectionCard";

const CollectionCards = () => {
  const cards = useStore((state) => state.cards);
  const openAddModal = useStore((state) => state.openAddModal);
  const openImportModal = useStore((state) => state.openImportModal);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCards, setFilteredCards] = useState(cards);

  useEffect(() => {
    setFilteredCards(
      cards.filter((card) => {
        const matchedQuestion = card.question
          .toLocaleLowerCase()
          .includes(searchValue);
        const matchedAnswer = card.answer
          .toLocaleLowerCase()
          .includes(searchValue);
        const matchedCategory = card.category
          .toLocaleLowerCase()
          .includes(searchValue);

        return matchedQuestion || matchedAnswer || matchedCategory;
      })
    );
  }, [searchValue]);

  return (
    <div className="collection-cards-container" id="collection-cards">
      <div className="collection-header">
        <div className="collection-buttons-container">
          <button onClick={openAddModal}>
            <IoAdd />
            New Card
          </button>
          <button onClick={openImportModal}>
            <LuFileJson2 />
            Add via JSON
          </button>
          <button onClick={() => handleExportCards({ cards })}>
            <CiExport />
            Export JSON
          </button>
        </div>
        <div className="collection-search-container">
          <input
            type="search"
            placeholder="Search cards..."
            className="collection-search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.toLocaleLowerCase())}
          />
          <NavigationButton
            title="Back to training"
            id="header"
            icon={<FaAngleUp />}
          />
        </div>
      </div>
      {cards.length > 0 && filteredCards.length > 0 ? (
        <div className="collection-cards-list">
          {searchValue
            ? filteredCards.map((card, index) => (
                <CollectionCard key={index} card={card} />
              ))
            : cards.map((card, index) => (
                <CollectionCard key={index} card={card} />
              ))}
        </div>
      ) : (
        <p>No cards found</p>
      )}
    </div>
  );
};

export default CollectionCards;
