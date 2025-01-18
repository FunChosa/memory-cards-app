import useStore from "../../store";
import { useEffect } from "react";
import "./CardsSlider.css";

const SliderCard = ({ question, answer, id, category }) => {
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
      className="card-container"
      style={{
        backgroundColor: isFlipped ? "var(--primary)" : "var(--accent)",
      }}
      onClick={handleFlip}
    >
      <p className="card-content">{isFlipped ? answer : question}</p>
      <p className="card-category">{"#" + category}</p>
    </div>
  );
};

export default SliderCard;
