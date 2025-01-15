import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/CardSlider.css";
import { FaAngleDown, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { LuShuffle } from "react-icons/lu";
import { debounce } from "../functions";
import NavigationButton from "./NavigationButton";
import useStore from "../store";

const CardSlider = () => {
  const cards = useStore((state) => state.cards);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCards, setCurrentCards] = useState(cards);
  const [categories, setCategories] = useState([
    ...new Set(cards.map((card) => card.category)),
  ]);
  const [filterCategory, setFilterCategory] = useState([]);
  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % currentCards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (currentIndex - 1 + currentCards.length) % currentCards.length
    );
  };

  const handleShuffle = () => {
    const shuffledCards = [...currentCards].sort(() => Math.random() - 0.5);
    setCurrentCards(shuffledCards);
    setCurrentIndex(0);
  };

  useEffect(() => {
    setCurrentCards(cards);
    setCategories([...new Set(cards.map((card) => card.category))]);
  }, [cards]);

  useEffect(() => {
    if (filterCategory.length > 0) {
      setCurrentCards(
        cards.filter((card) => filterCategory.includes(card.category))
      );
    }
    if (filterCategory.length === 0) {
      setCurrentCards(cards);
    }
    setCurrentIndex(0);
  }, [filterCategory]);

  const debouncedHandleNext = debounce(handleNext, 500);
  const debouncedHandlePrevious = debounce(handlePrevious, 500);

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      debouncedHandleNext();
    }
    if (event.key === "ArrowLeft") {
      debouncedHandlePrevious();
    }
  });

  return (
    <div className="card-slider" id="card-slider">
      {currentCards.length > 0 ? (
        <>
          <Card
            question={currentCards[currentIndex].question}
            answer={currentCards[currentIndex].answer}
            id={currentCards[currentIndex].id}
            category={currentCards[currentIndex].category}
          />
          <div className="buttons-container">
            <button onClick={handlePrevious}>
              <FaAngleLeft />
            </button>
            <p className="current-index">
              {currentIndex + 1}/{currentCards.length}
            </p>
            <button onClick={handleNext}>
              <FaAngleRight />
            </button>
          </div>

          <div className="settings">
            <button onClick={handleShuffle}>
              <LuShuffle />
            </button>
            {categories.map(
              (category) =>
                category && (
                  <button
                    key={category}
                    onClick={() => {
                      filterCategory.includes(category)
                        ? setFilterCategory(
                            filterCategory.filter((c) => c !== category)
                          )
                        : setFilterCategory([...filterCategory, category]);
                    }}
                    className={
                      filterCategory.includes(category) ? "active" : ""
                    }
                  >
                    #{category}
                  </button>
                )
            )}
          </div>
        </>
      ) : (
        <p>No cards</p>
      )}
      <NavigationButton
        title="View card collection"
        id="collection-cards"
        icon={<FaAngleDown />}
      />
    </div>
  );
};

export default CardSlider;
