import React, { useState } from "react";
import Header from "./components/Header";
import CardSlider from "./components/CardSlider";
import AddCardModal from "./components/AddCardModal";
import Modal from "react-modal";
import "./styles/App.css";

const App = () => {
  const [cards, setCards] = useState([
    {
      question: "Who is Luke Skywalker's father?",
      answer: "Darth Vader",
      id: "1",
      category: "Star Wars",
    },
    {
      question: "Question 2",
      answer: "Answer 2",
      id: "2",
      category: "Category 2",
    },
    {
      question: "Question 3",
      answer: "Answer 3",
      id: "3",
      category: "Category 3",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addCard = (newCard) => {
    setCards([...cards, newCard]);
    setIsModalOpen(false);
  };

  // const deleteCard = (id) => {
  //   setCards(cards.filter((card) => card.id !== id));
  // };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Header openModal={openModal} />
      <CardSlider cards={cards} />
      <Modal
        isOpen={isModalOpen}
        className="modal"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          content: {
            backgroundImage: "url(src/assets/pattern.jpg)",
            backgroundSize: "contain",
            backgroundBlendMode: "multiply",
          },
        }}
        appElement={document.getElementById("root")}
        shouldCloseOnOverlayClick={false}
      >
        <AddCardModal closeModal={closeModal} addCard={addCard} />
      </Modal>
    </div>
  );
};

export default App;
