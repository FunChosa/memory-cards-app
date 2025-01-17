import useStore from "../../store";
import { IoMdClose } from "react-icons/io";
import { categoryPrefix } from "../../functions";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import Button from "../utils/Button";
import "./modalForm.css";

const AddCardModal = () => {
  const {
    isAddModalOpen,
    addCard,
    closeAddModal,
    error,
    setError,
    resetError,
    newCard,
    setNewCard,
    resetNewCard,
  } = useStore((state) => state);

  const handleQuestionChange = (event) => {
    setNewCard({ ...newCard, question: event.target.value });
  };

  const handleAnswerChange = (event) => {
    setNewCard({ ...newCard, answer: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setNewCard({ ...newCard, category: event.target.value });
  };
  const handleCancel = () => {
    resetNewCard();
    resetError();
    closeAddModal();
  };

  const submitCard = () => {
    if (!newCard.question.trim() && !newCard.answer.trim()) {
      setError("Both fields are required!");
      return;
    }

    if (!newCard.question.trim()) {
      setError("Question cannot be empty!");
      return;
    }

    if (!newCard.answer.trim()) {
      setError("Answer cannot be empty!");
      return;
    }

    addCard({
      question: newCard.question.trim(),
      answer: newCard.answer.trim(),
      category: categoryPrefix(newCard.category.trim()),
      id: uuidv4(),
    });

    resetNewCard();
    resetError();
    closeAddModal();
  };

  return (
    <Modal
      isOpen={isAddModalOpen}
      className="modal-container"
      style={{
        overlay: { backgroundColor: "var(--overlay-bg)" },
      }}
      appElement={document.getElementById("root")}
      shouldCloseOnOverlayClick={false}
    >
      <div className="modal-card">
        <IoMdClose onClick={handleCancel} className="modal-close-btn" />
        <h2>Add new card</h2>
        <p>Question:</p>
        <textarea
          type="text"
          placeholder="2+2"
          className="modal-question-input"
          onChange={handleQuestionChange}
          value={newCard.question}
          required
          autoFocus
          rows={4}
        />
        <p>Answer:</p>
        <textarea
          type="text"
          placeholder="Fish"
          className="modal-answer-input"
          onChange={handleAnswerChange}
          value={newCard.answer}
          required
          rows={4}
        />
        <p>Category:</p>
        <input
          type="text"
          placeholder="#Math"
          className="modal-category-input"
          onChange={handleCategoryChange}
        />
        {error && <p className="modal-error-msg">{error}</p>}
        <div className="modal-btn-container">
          <div></div>
          <Button
            title="Save"
            className="modal-save-btn"
            onClick={submitCard}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddCardModal;
