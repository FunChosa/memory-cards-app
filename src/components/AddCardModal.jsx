import useStore from "../store";
import { IoMdClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import "../styles/AddCardModal.css";

const AddCardModal = () => {
  const isModalOpen = useStore((state) => state.isModalOpen);
  const addCard = useStore((state) => state.addCard);
  const closeModal = useStore((state) => state.closeModal);

  const error = useStore((state) => state.error);
  const setError = useStore((state) => state.setError);

  const newCard = useStore((state) => state.newCard);
  const setNewCard = useStore((state) => state.setNewCard);

  const resetNewCard = useStore((state) => state.resetNewCard);
  const resetError = useStore((state) => state.resetError);

  const handleQuestionChange = (event) => {
    setNewCard({ ...newCard, question: event.target.value });
  };

  const handleAnswerChange = (event) => {
    setNewCard({ ...newCard, answer: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setNewCard({ ...newCard, category: event.target.value });
  };

  const submitCard = () => {
    if (!newCard.question.trim() && !newCard.answer.trim()) {
      setError("Both fields are required");
      return;
    }

    if (!newCard.question.trim()) {
      setError("Question cannot be empty or whitespace");
      return;
    }

    if (!newCard.answer.trim()) {
      setError("Answer cannot be empty or whitespace");
      return;
    }

    addCard({
      question: newCard.question.trim(),
      answer: newCard.answer.trim(),
      category: newCard.category.trim(),
      id: uuidv4(),
    });

    resetNewCard();
    resetError();
    closeModal();
  };

  const handleCancel = () => {
    resetNewCard();
    resetError();
    closeModal();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      className="modal"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
      }}
      appElement={document.getElementById("root")}
      shouldCloseOnOverlayClick={false}
    >
      <div className="modal-card">
        <IoMdClose onClick={handleCancel} className="closeModalBtn" />
        <h2>Add new card</h2>
        <p>Question:</p>
        <textarea
          type="text"
          placeholder="Enter Question..."
          className="questionInput"
          onChange={handleQuestionChange}
          value={newCard.question}
          required
          autoFocus
          rows={4}
        />
        <p>Answer:</p>
        <textarea
          type="text"
          placeholder="Enter Answer..."
          className="answerInput"
          onChange={handleAnswerChange}
          required
          rows={4}
          value={newCard.answer}
        />
        <p>Category:</p>
        <input
          type="text"
          placeholder="Enter Category..."
          className="answerInput"
          onChange={handleCategoryChange}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={() => submitCard()} className="saveBtn">
          Save
        </button>
      </div>
    </Modal>
  );
};

export default AddCardModal;
