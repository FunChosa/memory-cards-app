import React, { useState } from "react";
import Header from "./components/Header";
import CardSlider from "./components/CardSlider";
import AddCardModal from "./components/AddCardModal";
import Modal from "react-modal";
import "./styles/App.css";
import CollectionCards from "./components/CollectionCards";

const App = () => {
  const [cards, setCards] = useState([
    {
      question: "Who is Luke Skywalker's father?",
      answer: "Darth Vader",
      id: "1",
      category: "Star Wars",
    },
    {
      question: "Who is the main villain in 'Avengers: Infinity War'?",
      answer: "Thanos",
      id: "2",
      category: "Avengers",
    },
    {
      question: "Who is the leader of the Jedi?",
      answer: "Yoda",
      id: "3",
      category: "Star Wars",
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
      <CollectionCards cards={cards} />
      <Modal
        isOpen={isModalOpen}
        className="modal"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
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
