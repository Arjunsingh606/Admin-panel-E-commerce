import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

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

interface TicketItems {
  ticket: Ticket[];
  show: boolean;
  handleClose: () => void;
  handleShow: (item: Ticket) => void;
  deleteTicket: (id: string) => void;
  handleEditTicket: (item: Ticket) => void;
  loginUser: string;
  userRole: string;
}

const List: React.FC<TicketItems> = ({
  ticket,
  userRole,
  handleShow,
  deleteTicket,
  handleEditTicket,
  loginUser,
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

  const deleteModal = (id: string) => {
    setTicketId(id);
    setDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteTicket(ticketId);
    setDeleteModal(false);
  };
  
  const handleEdit = (item: Ticket) => {
    if (item.id) {
      handleShow(item);
    }
  };

  const displayedTickets =
    userRole === "User" ? ticket.filter((ticket) => ticket.createdBy === loginUser): ticket.slice(startIndex, endIndex);

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>COMPLINE ID</th>
            <th>LATEST MESSAGE</th>
            <th>ASSIGNED</th>
            <th>PRIORITY</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {displayedTickets.map((item: Ticket, index: number) => {
            return (
              <tr key={item.id}>
                <td>{startIndex + index + 1}</td>
                <td>{item.name}</td>
                <td>TID : {item.id}</td>
                <td>
                  <span
                    className={`ticket-tags ${item.tags === "Replace"
                        ? "replace-tag"
                        : item.tags === "New"
                          ? "new-tag"
                          : item.tags === "Issue"
                            ? "issue-tag"
                            : item.tags === "Repair"
                              ? "repair-tag"
                              : ""
                      }`}
                  >
                    {item.tags}
                  </span>
                  <b>{item.title}</b> <p> {item.description}</p>
                </td>
                <td>{item.createdBy}</td>
                <td>
                  <span
                    className={`ticket-tags ${item.priority === "High"
                        ? "replace-tag"
                        : item.priority === "Low"
                          ? "new-tag"
                          : item.priority === "Medium"
                            ? "repair-tag"
                            : ""
                      }`}
                  >
                    {item.priority}
                  </span>
                </td>
                <td>
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
                    {userRole === "User" ? ("") : (<Button variant="secondary" onClick={() => deleteModal(item.id)} className="btn card-btn">  Delete </Button>)}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {ticket.length === 0 ? (
        <div className="ticket-not-found">Ticket does not found !!!</div>
      ) : (
        ""
      )}

      <Pagination
        current={currentPage}
        total={ticket.length}
        pageSize={itemsPerPage}
        onChange={onPageChange}
      />

      <Modal show={deletModal} onHide={() => setDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this ticket?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default List;
