import useStore from "../store";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";

const EditCardModal = () => {
  const isEditModalOpen = useStore((state) => state.isEditModalOpen);
  const editCard = useStore((state) => state.editCard);
  const closeEditModal = useStore((state) => state.closeEditModal);

  const error = useStore((state) => state.error);
  const setError = useStore((state) => state.setError);
  const resetError = useStore((state) => state.resetError);

  const editableCard = useStore((state) => state.editableCard);
  const resetEditableCard = useStore((state) => state.resetEditableCard);

  const [question, setQuestion] = useState(editableCard.question);
  const [answer, setAnswer] = useState(editableCard.answer);
  const [category, setCategory] = useState(editableCard.category);

  useEffect(() => {
    setQuestion(editableCard.question);
    setAnswer(editableCard.answer);
    setCategory(editableCard.category);
  }, [editableCard]);

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

  const submitCard = () => {
    if (!question.trim() && !answer.trim()) {
      setError("Both fields are required");
      return;
    }

    if (!question.trim()) {
      setError("Question cannot be empty or whitespace");
      return;
    }

    if (!answer.trim()) {
      setError("Answer cannot be empty or whitespace");
      return;
    }

    editCard({
      ...editableCard,
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim(),
    });

    resetEditableCard();
    resetError();
    closeEditModal();
  };

  return (
    <Modal
      isOpen={isEditModalOpen}
      className="modal"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
      }}
      appElement={document.getElementById("root")}
      shouldCloseOnOverlayClick={false}
    >
      <div className="modal-card">
        <IoMdClose onClick={handleCancel} className="closeModalBtn" />
        <h2>Edit card</h2>
        <p>Question:</p>
        <textarea
          type="text"
          placeholder="Enter Question..."
          className="questionInput"
          onChange={handleQuestionChange}
          value={question}
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
          value={answer}
          required
          rows={4}
        />
        <p>Category:</p>
        <input
          type="text"
          placeholder="Enter Category..."
          className="answerInput"
          onChange={handleCategoryChange}
          value={category}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={submitCard} className="saveBtn">
          Save
        </button>
      </div>
    </Modal>
  );
};

export default EditCardModal;
