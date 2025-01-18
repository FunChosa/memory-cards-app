import useStore from "../../store";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../utils/Button";
import { categoryPrefix } from "../../functions";
import Modal from "react-modal";
import "./modalForm.css";

const EditCardModal = () => {
  const isEditModalOpen = useStore((state) => state.isEditModalOpen);
  const editCard = useStore((state) => state.editCard);
  const closeEditModal = useStore((state) => state.closeEditModal);
  const checkedCards = useStore((state) => state.checkedCards);
  const setСheckedCards = useStore((state) => state.setСheckedCards);

  const error = useStore((state) => state.error);
  const setError = useStore((state) => state.setError);
  const resetError = useStore((state) => state.resetError);

  const editableCard = useStore((state) => state.editableCard);
  const resetEditableCard = useStore((state) => state.resetEditableCard);
  const deleteCard = useStore((state) => state.deleteCard);

  const [question, setQuestion] = useState(editableCard.question);
  const [answer, setAnswer] = useState(editableCard.answer);
  const [category, setCategory] = useState(editableCard.category);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCancel = () => {
    resetEditableCard();
    resetError();
    closeEditModal();
  };

  const handleDeleteCard = () => {
    deleteCard(editableCard.id);
    setСheckedCards(checkedCards.filter((id) => id !== editableCard.id));
    resetEditableCard();
    resetError();
    closeEditModal();
  };

  const submitCard = () => {
    if (!question.trim() && !answer.trim()) {
      setError("Both fields are required!");
      return;
    }

    if (!question.trim()) {
      setError("Question cannot be empty!");
      return;
    }

    if (!answer.trim()) {
      setError("Answer cannot be empty!");
      return;
    }

    editCard({
      ...editableCard,
      question: question.trim(),
      answer: answer.trim(),
      category: categoryPrefix(category.trim()),
    });

    resetEditableCard();
    resetError();
    closeEditModal();
  };

  useEffect(() => {
    setQuestion(editableCard.question);
    setAnswer(editableCard.answer);
    setCategory(editableCard.category);
  }, [editableCard]);

  return (
    <Modal
      isOpen={isEditModalOpen}
      className="modal-container"
      style={{
        overlay: { backgroundColor: "var(--overlay-bg)" },
      }}
      appElement={document.getElementById("root")}
      shouldCloseOnOverlayClick={false}
    >
      <div className="modal-card">
        <IoMdClose onClick={handleCancel} className="modal-close-btn" />
        <h2>Edit card</h2>
        <p>Question:</p>
        <textarea
          type="text"
          placeholder="2+2"
          className="modal-question-input"
          onChange={handleQuestionChange}
          value={question}
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
          value={answer}
          required
          rows={4}
        />
        <p>Category:</p>
        <input
          type="text"
          placeholder="#Math"
          className="modal-category-input"
          onChange={handleCategoryChange}
          value={category}
        />
        {error && <p className="modal-error-msg">{error}</p>}
        <div className="modal-btn-container">
          <Button
            title="Save"
            onClick={submitCard}
            className="modal-save-btn"
          />
          <Button
            title="Delete card"
            onClick={handleDeleteCard}
            className="modal-delete-btn"
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditCardModal;
