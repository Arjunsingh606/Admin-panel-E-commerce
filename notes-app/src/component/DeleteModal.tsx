import { Button, Modal } from "react-bootstrap";

interface DeleteModalProps {
  deleteNote: (id: string) => void;
  setDeleteModal: (value: boolean) => void;
  noteId: string;
  deletModal: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ deleteNote, setDeleteModal, noteId, deletModal }) => {
  const handleConfirmDelete = () => {
    deleteNote(noteId);
    setDeleteModal(false);
  };
  return (
    <Modal show={deletModal} onHide={() => setDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this Note ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setDeleteModal(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
