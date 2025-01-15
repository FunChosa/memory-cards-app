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
  const openModal = useStore((state) => state.openModal);
  const openImportModal = useStore((state) => state.openImportModal);
  return (
    <div className="collection-cards-container" id="collection-cards">
      <div className="collection-header">
        <div className="collection-buttons-container">
          <button onClick={openModal}>
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
        <NavigationButton
          title="Back to training"
          id="header"
          icon={<FaAngleUp />}
        />
      </div>
      {cards.length > 0 ? (
        <div className="collection-cards-list">
          {cards.map((card, index) => (
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
