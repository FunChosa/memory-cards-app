import useStore from "../store";
import { useEffect } from "react";
import "../styles/Card.css";

const Card = ({ question, answer, id, category }) => {
  const isFlipped = useStore((state) => state.isFlipped);
  const setIsFlipped = useStore((state) => state.setIsFlipped);

  useEffect(() => {
    setIsFlipped(false);
  }, [id]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="card"
      style={{ backgroundColor: isFlipped ? "#1c1c1c" : "#172554" }}
      onClick={handleFlip}
    >
      <div className="category">{category && <p>#{category}</p>}</div>
      <p>{isFlipped ? answer : question}</p>
    </div>
  );
};

export default Card;
