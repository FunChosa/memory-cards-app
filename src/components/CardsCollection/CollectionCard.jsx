import useStore from "../../store";
import { CiEdit } from "react-icons/ci";
import "./CardsCollection.css";

const CollectionCard = ({ card }) => {
  const { checkedCards, setEditableCard, openEditModal, setСheckedCards } =
    useStore();

  const handleEditCard = () => {
    setEditableCard(card);
    openEditModal();
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    checked
      ? setСheckedCards([...checkedCards, card.id])
      : setСheckedCards(checkedCards.filter((id) => id !== card.id));
  };

  const handleCardClick = (event) => {
    if (event.target.type !== "checkbox") {
      handleEditCard(event);
    }
  };

  return (
    <div
      className="collection-card"
      onClick={handleCardClick}
      style={{
        backgroundColor: checkedCards.includes(card.id)
          ? "var(--hover-card-collection)"
          : "var(--primary)",
      }}
    >
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
        </p>
      </div>
    </div>
  );
};

export default CollectionCard;
