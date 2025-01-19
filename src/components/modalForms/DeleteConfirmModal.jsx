import Modal from "react-modal";
import "./modalForm.css";
import useStore from "../../store";
import Button from "../utils/Button";

const DeleteConfirmModal = () => {
  const isDeleteModalOpen = useStore((state) => state.isDeleteModalOpen);
  const closeDeleteModal = useStore((state) => state.closeDeleteModal);

  const closeEditModal = useStore((state) => state.closeEditModal);
  const deleteCard = useStore((state) => state.deleteCard);
  const checkedCards = useStore((state) => state.checkedCards);
  const setСheckedCards = useStore((state) => state.setСheckedCards);
  const resetEditableCard = useStore((state) => state.resetEditableCard);
  const resetError = useStore((state) => state.resetError);
  const editableCard = useStore((state) => state.editableCard);

  const handleDeleteCard = () => {
    deleteCard(editableCard.id);
    setСheckedCards(checkedCards.filter((id) => id !== editableCard.id));
    resetEditableCard();
    resetError();
    closeDeleteModal();
    closeEditModal();
  };

  return (
    <Modal
      isOpen={isDeleteModalOpen}
      className="modal-container"
      style={{
        overlay: { backgroundColor: "var(--overlay-bg)", zIndex: 1000 },
        content: {
          width: "300px",
          marginTop: "15rem",
        },
      }}
      appElement={document.getElementById("root")}
      shouldCloseOnOverlayClick={false}
    >
      <div className="modal-card">
        <h2 className="modal-card-title">Delete this card?</h2>
        <div className="modal-btn-container">
          <Button
            title="Cancel"
            className="modal-delete-btn"
            onClick={closeDeleteModal}
          />
          <Button
            title="Delete"
            className="modal-save-btn"
            onClick={handleDeleteCard}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
