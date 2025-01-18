import useStore from "../../store";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import "./CardsCollection.css";

const CollectionCard = ({ card }) => {
  const deleteCard = useStore((state) => state.deleteCard);
  const checkedCards = useStore((state) => state.checkedCards);
  const setEditableCard = useStore((state) => state.setEditableCard);
  const openEditModal = useStore((state) => state.openEditModal);
  const setСheckedCards = useStore((state) => state.setСheckedCards);

  const handleEditCard = () => {
    setEditableCard(card);
    openEditModal();
  };

  const handleDeleteCard = () => {
    deleteCard(card.id);
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    checked
      ? setСheckedCards([...checkedCards, card.id])
      : setСheckedCards(checkedCards.filter((id) => id !== card.id));
  };

  return (
    <div className="collection-card">
      <p className="collection-card-top">
        <input
          type="checkbox"
          className="collection-card-checkbox"
          checked={checkedCards.includes(card.id)}
          onChange={handleCheckboxChange}
          title="Add to deleted cards"
        />
      </p>
      <p className="collection-card-question">{card.question}</p>
      <div className="collection-card-bottom">
        <p className="collection-card-category">{card.category}</p>
        <p className="collection-card-action-buttons">
          <CiEdit className="edit-btn" onClick={handleEditCard} />
          <MdDeleteOutline className="delete-btn" onClick={handleDeleteCard} />
        </p>
      </div>
    </div>
  );
};

export default CollectionCard;
