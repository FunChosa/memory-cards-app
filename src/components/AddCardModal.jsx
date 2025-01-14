import React, { useState } from "react";
import "../styles/AddCardModal.css";
import { IoMdClose } from "react-icons/io";
import { TbSkull } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";

const AddCardModal = ({ addCard, closeModal }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("no_category");
  const [error, setError] = useState(null);
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value.trim());
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value.trim());
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value.trim());
  };

  const submitCard = () => {
    if (!question && !answer) {
      setError("Both fields are required");
      return;
    }
    if (!question) {
      setError("Question cannot be empty");
      return;
    }
    if (!answer) {
      setError("Answer cannot be empty");
      return;
    }
    addCard({ question, answer, category, id: uuidv4() });
  };

  return (
    <div className="modal-card">
      <IoMdClose onClick={closeModal} className="closeModalBtn" />
      <h2>Add new card</h2>
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
        required
        rows={4}
        value={answer}
      />
      <p>Category:</p>
      <input
        type="text"
        placeholder="Enter Category..."
        className="answerInput"
        onChange={handleCategoryChange}
      />
      {error && (
        <p className="error">
          <TbSkull />
          {error}
          <TbSkull />
        </p>
      )}
      <button onClick={() => submitCard()} className="saveBtn">
        Save
      </button>
    </div>
  );
};

export default AddCardModal;
