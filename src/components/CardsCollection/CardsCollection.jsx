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
import NoData from "../utils/NoData";
import Button from "../utils/Button";
import "./CardsCollection.css";

const CardsCollection = () => {
  const cards = useStore((state) => state.cards);
  const openAddModal = useStore((state) => state.openAddModal);
  const openImportModal = useStore((state) => state.openImportModal);
  const checkedCards = useStore((state) => state.checkedCards);
  const deleteCard = useStore((state) => state.deleteCard);
  const resetСheckedCards = useStore((state) => state.resetСheckedCards);
  const setСheckedCards = useStore((state) => state.setСheckedCards);
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
  }, [searchValue, cards]);

  const exportCards = () => {
    const cardsForExport = cards.filter((card) =>
      checkedCards.includes(card.id)
    );
    handleExportCards(cardsForExport);
  };

  const handleBulkDelete = () => {
    if (checkedCards.length > 0) {
      checkedCards.forEach((element) => {
        deleteCard(element);
      });
    }
    resetСheckedCards();
  };

  const handleSelectAll = () => {
    if (checkedCards.length === filteredCards.length) {
      resetСheckedCards();
    } else {
      setСheckedCards([...filteredCards.map((card) => card.id)]);
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
            title="Import JSON"
            icon={<LuFileJson2 />}
            onClick={openImportModal}
            className={"collection-action-btn"}
          />
          <Button
            title="Export JSON"
            icon={<CiExport />}
            onClick={exportCards}
            disabled={checkedCards.length === 0}
            className={"collection-action-btn"}
          />
          <Button
            icon={<MdDeleteOutline />}
            onClick={handleBulkDelete}
            className={"collection-action-btn"}
            disabled={checkedCards.length === 0}
            title="Delete"
          />
        </div>
        <div className="collection-header-right-container">
          <div>
            {checkedCards.length}/{cards.length} selected
          </div>
          <Button
            title="Select All"
            className={"collection-action-btn"}
            onClick={handleSelectAll}
          />
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
        <NoData />
      )}
    </div>
  );
};

export default CardsCollection;
