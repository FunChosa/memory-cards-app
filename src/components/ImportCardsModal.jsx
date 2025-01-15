import React, { useState } from "react";
import "../styles/ImportCardsModal.css";

const ImportCardsModal = ({ closeModal, importCards }) => {
  const [jsonInput, setJsonInput] = useState("");

  const handleImport = () => {
    try {
      const uploadedCards = JSON.parse(jsonInput);
      importCards(uploadedCards);
      closeModal();
    } catch (err) {
      console.error("Invalid JSON format:", err);
      alert("Invalid JSON. Please check format and try again.");
    }
  };

  const placeholderText = `[
        {
            "question": "What is 2+2?",
            "answer": "4"
         },
        {
            "question": "What are the planets in our solar system?", 
            "answer": "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune",
            "category": "Solar System",
        },
    ]`;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Import Cards</h2>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder={placeholderText}
          rows={20}
          style={{ width: "90%" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
            gap: "10px",
            width: "100px",
          }}
        >
          <button className="button" onClick={handleImport}>
            Import
          </button>
          <button className="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
  //   return (
  //     <div className="import-cards-modal">
  //       <h2>Import Cards</h2>
  //       <input type="file" accept=".csv" />
  //       <button>Import</button>
  //       <button onClick={closeModal}>Close</button>
  //     </div>
  //   );
};

export default ImportCardsModal;
