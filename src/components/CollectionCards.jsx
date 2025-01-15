import NavigationButton from "./NavigationButton";
import { FaAngleUp } from "react-icons/fa6";
import "../styles/CollectionCards.css";

const CollectionCards = () => {
  return (
    <div className="collection-cards-container" id="collection-cards">
      <NavigationButton
        title="Back to training"
        id="header"
        icon={<FaAngleUp />}
      />
      CollectionCards
    </div>
  );
};

export default CollectionCards;
