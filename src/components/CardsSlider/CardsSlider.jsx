import useStore from "../../store";
import React, { useState, useEffect } from "react";
import SliderCard from "./SliderCard";
import NavigationButton from "../utils/NavigationButton";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { LuShuffle } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import { HiMiniArrowPath } from "react-icons/hi2";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import Button from "../utils/Button";
import "./CardsSlider.css";
import NoData from "../utils/NoData";

const CardsSlider = () => {
  const cards = useStore((state) => state.cards);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const setIsDarkMode = useStore((state) => state.setIsDarkMode);

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
    <div className="card-slider-container" id="cards-slider">
      <div className="card-slider-header-container">
        <div className="card-slider-header-left-container">
          <h2 className="card-slider-header-title">
            <HiMiniArrowPath />
            Memory Cards
          </h2>
        </div>
        <div className="card-slider-header-right-container">
          <Button
            icon={isDarkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="card-slider-toggle-btn"
          />
          <NavigationButton
            title="View card collection"
            to="cards-collection"
            icon={<FaAngleDown />}
          />
        </div>
      </div>
      {currentCards.length > 0 ? (
        <div className="card-slider">
          <div className="card-slider-settings-container">
            <Button
              icon={<LuShuffle />}
              onClick={handleShuffle}
              className="card-slider-shuffle-btn"
            />
            {categories.map((category) => (
              <Button
                key={category}
                title={category}
                onClick={() =>
                  setFilterCategory(
                    filterCategory.includes(category)
                      ? filterCategory.filter((c) => c !== category)
                      : [...filterCategory, category]
                  )
                }
                className={
                  "card-slider-filter-btn" +
                  (filterCategory.includes(category) ? "-active" : "")
                }
              />
            ))}
          </div>
          <SliderCard
            question={currentCards[currentIndex].question}
            answer={currentCards[currentIndex].answer}
            id={currentCards[currentIndex].id}
            category={currentCards[currentIndex].category}
          />
          <div className="card-slider-navigation-panel">
            <Button
              icon={<FaAngleLeft />}
              onClick={handlePrevious}
              className="card-slider-navigation-btn"
            />
            <p className="card-slider-current-index">
              {currentIndex + 1}/{currentCards.length}
            </p>
            <Button
              icon={<FaAngleRight />}
              onClick={handleNext}
              className="card-slider-navigation-btn"
            />
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default CardsSlider;
