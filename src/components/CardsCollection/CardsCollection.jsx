import { useState, useEffect } from "react";
import NavigationButton from "../utils/NavigationButton";
import { FaAngleUp } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { LuFileJson2 } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { CiExport } from "react-icons/ci";
import { handleExportCards } from "../../functions";
import useStore from "../../store";
import CollectionCard from "./CollectionCard";
import Button from "../utils/Button";
import "./CardsCollection.css";

const CardsCollection = () => {
  const cards = useStore((state) => state.cards);
  const openAddModal = useStore((state) => state.openAddModal);
  const openImportModal = useStore((state) => state.openImportModal);
  const deletedCards = useStore((state) => state.deletedCards);
  const deleteCard = useStore((state) => state.deleteCard);
  const resetDeletedCards = useStore((state) => state.resetDeletedCards);
  const setDeletedCards = useStore((state) => state.setDeletedCards);
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

  const exportCards = () => {
    handleExportCards({ cards });
  };

  const handleBulkDelete = () => {
    if (deletedCards.length > 0) {
      deletedCards.forEach((element) => {
        deleteCard(element);
      });
    }
    resetDeletedCards();
  };

  const handleSelectAll = () => {
    if (deletedCards.length === cards.length) {
      resetDeletedCards();
    } else {
      setDeletedCards([...cards.map((card) => card.id)]);
    }
  };

  return (
    <div className="collection-container" id="cards-collection">
      <div className="collection-header-container">
        <div className="collection-header-left-container">
          <Button
            title="New Card"
            icon={<IoAdd />}
            onClick={openAddModal}
            className={"collection-action-btn"}
          />
          <Button
            title="Add via JSON"
            icon={<LuFileJson2 />}
            onClick={openImportModal}
            className={"collection-action-btn"}
          />
          <Button
            title="Export JSON"
            icon={<CiExport />}
            onClick={exportCards}
            className={"collection-action-btn"}
          />
          <Button
            icon={<MdDeleteOutline />}
            onClick={handleBulkDelete}
            className={"collection-action-btn"}
            disabled={deletedCards.length === 0}
            title="Delete"
          />
          <Button
            title="Select All"
            className={"collection-action-btn"}
            onClick={handleSelectAll}
          />
        </div>
        <div className="collection-header-right-container">
          <input
            type="search"
            placeholder="Search cards..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.toLocaleLowerCase())}
          />
          <NavigationButton
            title="Back to training"
            to="cards-slider"
            icon={<FaAngleUp />}
          />
        </div>
      </div>
      {cards.length > 0 && filteredCards.length > 0 ? (
        <div className="collection-list">
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

export default CardsCollection;
