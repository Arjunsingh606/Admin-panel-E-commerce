import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Container, Row, Col, Nav, Tab, Button, Form } from "react-bootstrap";
import "../styles/dashboard.css";
import AddTicket from "./AddTicket";
import List from "./List";
import Details from "./Details";
import DateRangePicker from "./DateRangePicker";

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

const getDate = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
};
const ticketDate = getDate()

const Dashboard = () => {
  const [show, setShow] = useState<boolean>(false);
  const [ticket, setTicket] = useState<Ticket[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [filterTicket, setfilterTicket] = useState<Ticket[]>([]); // for filter fn
  const [ticketToEdit, setTicketToEdit] = useState<any>();
  const [currentDate, setCurrentDate] = useState(ticketDate);

  const user = JSON.parse(`${sessionStorage.getItem("loginUser")}`);
  const loggedInUser = `${user.firstName} ${user.lastName}`;
  const userRole = user.role;


  const handleShow = (item: Ticket) => {
    setTicketToEdit(item);
    setShow(true);
  };

  const handleOpen = () => {
    setTicketToEdit({});
    setShow(true);
  };

  const handleClose = () => setShow(false);
  const resetForm = () => setShow;

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/ticket");
      const tickets: Ticket[] = await response.json();
      setTicket(tickets);
      setfilterTicket(tickets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchTicket = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value.toLowerCase();
    setSearch(searchInput);

    if (!searchInput) {
      fetchData();
    } else {
      const searchedTickets = ticket.filter((ticket) =>
        `${ticket.name} ${ticket.title} ${ticket.tags} ${ticket.priority} ${ticket.createdBy}`
          .toLowerCase()
          .includes(searchInput)
      );
      setTicket(searchedTickets);
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const searchFilter = e.target.value;
    setFilter(searchFilter);

    const filteredTicket = !searchFilter
      ? filterTicket
      : filterTicket.filter(
        (item) => item.priority.toLowerCase() === searchFilter.toLowerCase()
      );

    setTicket(filteredTicket);
  };

  const deleteTicket = async (id: string) => {
    try {
      const deleteResponse = await fetch(`http://localhost:3001/ticket/${id}`, {
        method: "DELETE",
      });
      if (deleteResponse.ok) {
        const updatedTickets = ticket.filter((ticket) => ticket.id !== id);
        setTicket(updatedTickets);
      }
    } catch (error) {
      alert(`${error}, "Failed to delete ticket" `);
    }
  };


  const handleEditTicket = async (values: Ticket) => {
    try {
      let response;
      if (values.id) {
        response = await fetch(`http://localhost:3001/ticket/${values.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      } else {
        response = await fetch("http://localhost:3001/ticket", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        setCurrentDate(ticketDate);
        resetForm();
        handleClose();
      }

      if (response.ok) {
        fetchData();
        handleClose();
      }
    } catch (error) {
      alert(`${error}: Error while updating/adding ticket data`);
    }
  };

  //   date picker
  const handleDatesChange = (startDate: Date, endDate: Date) => {

    const filteredTickets = filterTicket.filter((ticket) => {
      const ticketDate = new Date(ticket.date);

      return ticketDate >= startDate && ticketDate <= endDate;
    });
    setTicket(filteredTickets);
  };

  const handleResetFilters = () => {
    setSearch("")
    setFilter("")
    // setfilterTicket([])
    fetchData()
  };

  return (
    <Container fluid className="dashboard-main">
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className="dashboard">
          <Col className="dashboard-items">
            <div>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="search-ticket"
                  placeholder="Search here..."
                  value={search}
                  onChange={handleSearchTicket}
                />

              </Form.Group>
            </div>

            <div className="filter-items">
              <div className="d-flex">
                <Form.Group className="mb-3">
                  <DateRangePicker onDatesChange={handleDatesChange} />
                </Form.Group>
                <Button variant="primary" className="reset-btn" onClick={handleResetFilters}>Reset Filter </Button>
              </div>
              <div>
                <Form.Select
                  name="filter"
                  className="filter"
                  aria-label="filter-search"
                  onChange={handleFilter}
                  value={filter}
                >
                  <option value="">All Ticket</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Form.Select>
              </div>

              <div>
                <Button
                  variant="primary"
                  onClick={handleOpen}
                >
                  Add Ticket
                </Button>

                <AddTicket
                  show={show}
                  userRole={userRole}
                  handleClose={handleClose}
                  loginUser={loggedInUser}
                  ticketToEdit={ticketToEdit}
                  handleEditTicket={handleEditTicket}
                  setTicketToEdit={setTicketToEdit}
                />
              </div>
              <div>
                <Nav variant="pills" className="list-details-btn">
                  <Nav.Item>
                    <Nav.Link eventKey="first" className="tabs-btn">List</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second" className="tabs-btn">Details</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
          </Col>
          <Row className="table-row">
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <List
                    ticket={ticket}
                    userRole={userRole}
                    show={show}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    loginUser={loggedInUser}
                    deleteTicket={deleteTicket}
                    handleEditTicket={handleEditTicket}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Details
                    ticket={ticket}
                    userRole={userRole}
                    show={show}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    loginUser={loggedInUser}
                    deleteTicket={deleteTicket}
                    handleEditTicket={handleEditTicket}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Row>
      </Tab.Container>
    </Container>

  );
};

export default Dashboard;
