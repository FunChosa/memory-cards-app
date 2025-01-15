import "../styles/CollectionCard.css";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const CollectionCard = ({ card }) => {
  return (
    <div className="collection-card">
      <p className="collection-card-top"></p>
      <p className="collection-card-question">{card.question}</p>
      <div className="collection-card-bottom">
        <p className="collection-card-category"># {card.category}</p>
        <p className="collection-card-action-buttons">
          <CiEdit className="edit-btn" />
          <MdDeleteOutline className="delete-btn" />
        </p>
      </div>
    </div>
  );
};

export default CollectionCard;
