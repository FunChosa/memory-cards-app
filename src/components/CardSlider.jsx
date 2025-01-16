import React, { useState, useEffect } from "react";
import useStore from "../store";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { LuShuffle } from "react-icons/lu";
import "../styles/CardSlider.css";

const CardSlider = () => {
  const cards = useStore((state) => state.cards);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCards, setCurrentCards] = useState(cards);

  const filterCategory = useStore((state) => state.filterCategory);
  const setFilterCategory = useStore((state) => state.setFilterCategory);

  const categories = useStore((state) => state.categories);
  const setCategories = useStore((state) => state.setCategories);

  useEffect(() => {
    setCategories(Array.from(new Set(cards.map((card) => card.category))));
    setFilterCategory([]);
    setCurrentCards(cards);
  }, [cards]);

  useEffect(() => {
    setCurrentCards(
      filterCategory.length > 0
        ? cards.filter((card) => filterCategory.includes(card.category))
        : cards
    );
    setCurrentIndex(0);
  }, [filterCategory]);

  const handleNext = () =>
    setCurrentIndex((currentIndex + 1) % currentCards.length);

  const handlePrevious = () =>
    setCurrentIndex(
      (currentIndex - 1 + currentCards.length) % currentCards.length
    );
  const handleShuffle = () => {
    const shuffledCards = [...currentCards].sort(() => Math.random() - 0.5);
    setCurrentCards(shuffledCards);
    setCurrentIndex(0);
  };

  return (
    <div className="card-slider" id="card-slider">
      {currentCards.length > 0 ? (
        <>
          <div className="settings">
            <button onClick={handleShuffle}>
              <LuShuffle />
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setFilterCategory(
                    filterCategory.includes(category)
                      ? filterCategory.filter((c) => c !== category)
                      : [...filterCategory, category]
                  )
                }
                className={filterCategory.includes(category) ? "active" : ""}
              >
                #{category}
              </button>
            ))}
          </div>
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
        </>
      ) : (
        <p>No cards found</p>
      )}
    </div>
  );
};

export default CardSlider;
