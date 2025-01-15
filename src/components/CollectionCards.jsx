import React from "react";
import "../styles/CollectionCards.css";
import NavigationButton from "./NavigationButton";
import { FaAngleUp } from "react-icons/fa6";
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
