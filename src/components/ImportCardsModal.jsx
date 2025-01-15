import useStore from "../store";
import { validateAndPrepareCards } from "../functions";
import Modal from "react-modal";
import "../styles/ImportCardsModal.css";

const ImportCardsModal = () => {
  const jsonInput = useStore((state) => state.jsonInput);
  const setJsonInput = useStore((state) => state.setJsonInput);
  const resetJsonInput = useStore((state) => state.resetJsonInput);

  const isImportModalOpen = useStore((state) => state.isImportModalOpen);

  const cards = useStore((state) => state.cards);
  const closeImportModal = useStore((state) => state.closeImportModal);
  const setCards = useStore((state) => state.setCards);

  const handleImport = () => {
    try {
      const uploadedCards = JSON.parse(jsonInput);
      const validatedCards = validateAndPrepareCards(uploadedCards);
      setCards([...cards, ...validatedCards]);
      resetJsonInput();
      closeImportModal();
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
    <Modal
      isOpen={isImportModalOpen}
      className="modal"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
      }}
      appElement={document.getElementById("root")}
      shouldCloseOnOverlayClick={false}
    >
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
            <button
              className="button"
              onClick={() => {
                resetJsonInput();
                closeImportModal();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImportCardsModal;
