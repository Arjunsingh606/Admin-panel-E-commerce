import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Pagination from "rc-pagination";
import Modal from "react-bootstrap/Modal";

interface TicketDetails {
  ticket: Ticket[];
  show: boolean;
  handleClose: () => void;
  handleShow: (item: Ticket) => void;
  deleteTicket: (id: string) => void;
  handleEditTicket: (item: Ticket) => void;
  loginUser: string;
  userRole: string;
}

interface Ticket {
  title: string;
  description: string;
  name: string;
  tags: string;
  priority: string;
  date: string;
  id: string;
  createdBy?: string;
}

const Details: React.FC<TicketDetails> = ({
  ticket,
  deleteTicket,
  userRole,
  show,
  handleShow,
  loginUser,
  handleEditTicket,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [deletModal, setDeleteModal] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>("");

  const itemsPerPage = 10;

  useEffect(() => {
    setTotalPages(Math.ceil(ticket.length / itemsPerPage));
  }, [ticket]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const handleDelete = (id: string) => {
    setDeleteModal(true);
    setTicketId(id);
  };

  const handleConfirmDelete = () => {
    deleteTicket(ticketId);
    setDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setDeleteModal(false);
  };

  const handleEdit = (item: Ticket) => {
    if (item.id) {
      handleShow(item);
    }
  };

  const displayedTickets =
    userRole === "User" ? ticket.filter((ticket) => ticket.createdBy === loginUser) : ticket.slice(startIndex, endIndex);

  return (
    <>
      <div className="ticket-cards">
        {displayedTickets.map((item: Ticket) => (
          <Card className="detail-card" key={item.id}>
            <Card.Body className="card-item">
              <Card.Title className="text-center">{item.tags}: Ticket</Card.Title>
              <div className="card-fields">
                <Card.Subtitle className=" text-muted">Title </Card.Subtitle>
                <Card.Text>{item.title}</Card.Text>
              </div>
              <div className="card-fields">
                <Card.Subtitle className=" text-muted">
                  Description{" "}
                </Card.Subtitle>
                <Card.Text>{item.description}</Card.Text>
              </div>
              <div className="card-fields">
                <Card.Subtitle className=" text-muted">User Name</Card.Subtitle>
                <Card.Text>{item.name}</Card.Text>
              </div>
              <div className="card-fields">
                <Card.Subtitle className=" text-muted">Tags </Card.Subtitle>
                <Card.Text>{item.tags}</Card.Text>
              </div>
              <div className="card-fields">
                <Card.Subtitle className=" text-muted">Priority</Card.Subtitle>
                <Card.Text>{item.priority}</Card.Text>
              </div>
              <div className="card-button">
                <div>
                  <Button
                    variant="primary"
                    className="btn card-btn edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                </div>


                {userRole === "User" ? ("") : (<Button variant="secondary" onClick={() => handleDelete(item.id)} className="btn card-btn">  Delete </Button>)}

              </div>
            </Card.Body>
          </Card>
        ))}

        {ticket.length === 0 ? (
          <div className="ticket-not-found">Ticket does not found !!!</div>
        ) : (
          ""
        )}



        <Modal show={deletModal} onHide={handleCancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this ticket?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="pt-3">
        <Pagination
          current={currentPage}
          total={ticket.length}
          pageSize={itemsPerPage}
          onChange={onPageChange}
        />
      </div>
    </>
  );
};

export default Details;
