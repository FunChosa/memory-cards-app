import React, { useEffect, useState } from "react";
import "../styles/Card.css";
import { debounce } from "../functions";
const Card = ({ question, answer, id, category }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    setIsFlipped(false);
  }, [id]);

  const handleFlipDebounced = debounce(handleFlip, 500);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleFlipDebounced();
    }
  });

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteCard(id);
  };

  return (
    <div
      className="card"
      style={{ backgroundColor: isFlipped ? "#1c1c1c" : "#172554" }}
      onClick={handleFlip}
    >
      <div className="category">{category && <p>#{category}</p>}</div>
      {/* <div className="flipper">
        <HiMiniArrowPath />
      </div> */}
      <p>{isFlipped ? answer : question}</p>
    </div>
  );
};

export default Card;
