import useStore from "../../store";
import { validateAndPrepareCards } from "../../functions";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import "./modalForm.css";

const ImportCardsModal = () => {
  const jsonInput = useStore((state) => state.jsonInput);
  const setJsonInput = useStore((state) => state.setJsonInput);
  const resetJsonInput = useStore((state) => state.resetJsonInput);

  const error = useStore((state) => state.error);
  const setError = useStore((state) => state.setError);
  const resetError = useStore((state) => state.resetError);

  const isImportModalOpen = useStore((state) => state.isImportModalOpen);

  const cards = useStore((state) => state.cards);
  const closeImportModal = useStore((state) => state.closeImportModal);
  const setCards = useStore((state) => state.setCards);

  const handleClose = () => {
    resetJsonInput();
    closeImportModal();
    resetError();
  };

  const handleImport = () => {
    try {
      const uploadedCards = JSON.parse(jsonInput);
      const validatedCards = validateAndPrepareCards(uploadedCards);
      setCards([...cards, ...validatedCards]);
      handleClose();
    } catch (err) {
      console.error("Invalid JSON format:", err);
      setError("Invalid JSON. Please check format and try again.");
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
      className="modal-container"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
      }}
      appElement={document.getElementById("root")}
      shouldCloseOnOverlayClick={false}
    >
      <div className="modal-card">
        <IoMdClose onClick={handleClose} className="modal-close-btn" />
        <h2>Import Cards</h2>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="modal-json-input"
          placeholder={placeholderText}
          rows={15}
        />
        {error && <p className="modal-error-msg">{error}</p>}
        <button className="modal-save-btn" onClick={handleImport}>
          Save
        </button>
      </div>
    </Modal>
  );
};

export default ImportCardsModal;
