import useStore from "../store";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import "../styles/CollectionCard.css";

const CollectionCard = ({ card }) => {
  const deleteCard = useStore((state) => state.deleteCard);
  const setEditableCard = useStore((state) => state.setEditableCard);
  const openEditModal = useStore((state) => state.openEditModal);
  const handleEditCard = () => {
    setEditableCard(card);
    openEditModal();
  };
  return (
    <div className="collection-card">
      <p className="collection-card-top"></p>
      <p className="collection-card-question">{card.question}</p>
      <div className="collection-card-bottom">
        <p className="collection-card-category">{card.category}</p>
        <p className="collection-card-action-buttons">
          <CiEdit className="edit-btn" onClick={handleEditCard} />
          <MdDeleteOutline
            className="delete-btn"
            onClick={() => deleteCard(card.id)}
          />
        </p>
      </div>
    </div>
  );
};

export default CollectionCard;
