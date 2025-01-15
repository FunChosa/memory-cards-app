import React, { useState } from "react";
import Header from "./components/Header";
import CardSlider from "./components/CardSlider";
import AddCardModal from "./components/AddCardModal";
import Modal from "react-modal";
import "./styles/App.css";
import CollectionCards from "./components/CollectionCards";
import ImportCardsModal from "./components/ImportCardsModal";
import { v4 as uuidv4 } from "uuid";

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
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
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

  const openImportModal = () => {
    setIsImportModalOpen(true);
  };

  const closeImportModal = () => {
    setIsImportModalOpen(false);
  };

  const importCards = (newCards) => {
    const validatedCards = validateAndPrepareCards(newCards);
    setCards([...cards, ...validatedCards]);
    setIsImportModalOpen(false);
  };

  const validateAndPrepareCards = (newCards) => {
    if (!Array.isArray(newCards)) {
      console.error("Uploaded data must be an array");
      return [];
    }
    return newCards
      .filter((card) => {
        if (typeof card !== "object" || card === null) return false;
        if (!card.question || typeof card.question !== "string") return false;
        if (!card.answer || typeof card.answer !== "string") return false;
        if (card.category && typeof card.category !== "string") return false;
        return true;
      })
      .map((card) => {
        return {
          id: uuidv4(),
          category: card.category || "no_category",
          ...card,
        };
      });
  };
  const handleExportCards = () => {
    const json = JSON.stringify(cards, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "memory_cards.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="App">
      <Header
        openModal={openModal}
        openImportModal={openImportModal}
        handleExportCards={handleExportCards}
      />
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
      <Modal
        isOpen={isImportModalOpen}
        className="modal"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        }}
        appElement={document.getElementById("root")}
        shouldCloseOnOverlayClick={false}
      >
        <ImportCardsModal
          closeModal={closeImportModal}
          importCards={importCards}
        />
      </Modal>
    </div>
  );
};

export default App;
