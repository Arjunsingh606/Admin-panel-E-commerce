import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/form.css";

interface Ticket {
  title: string;
  description: string;
  name: string;
  tags: string;
  priority: string;
  date: string;
  createdBy: string;
  id?: string;
}

interface FormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
  id?: string;
}

interface ModalFormProps {
  show: boolean;
  loginUser: string;
  userRole: string;
  ticketToEdit: Ticket;
  setTicketToEdit: any;
  handleClose: () => void;
  handleEditTicket: (values: any) => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  name: Yup.string().required("Please select name"),
  tags: Yup.string().required("Please select tag"),
  priority: Yup.string().required("Please select priority"),
});

const getDate = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
};
const ticketDate = getDate();

const AddTicket: React.FC<ModalFormProps> = ({
  show,
  handleClose,
  loginUser,
  handleEditTicket,
  ticketToEdit,
  userRole,
}) => {
  const [user, setUser] = useState<FormValues[]>([]);
  const [currentDate, setCurrentDate] = useState(ticketDate);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const users: FormValues[] = await response.json();
        setUser(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, [ticketToEdit]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      name: "",
      tags: "",
      priority: "",
      date: currentDate,
      createdBy: loginUser,
    },
    validationSchema: validationSchema,
    onSubmit: async (values: Ticket) => {
      handleEditTicket(values);
      formik.resetForm();
    },
  });

  useEffect(() => {
    formik.setFieldValue("title", ticketToEdit?.title || "");
    formik.setFieldValue("description", ticketToEdit?.description || "");
    formik.setFieldValue("name", ticketToEdit?.name || "");
    formik.setFieldValue("tags", ticketToEdit?.tags || "");
    formik.setFieldValue("priority", ticketToEdit?.priority || "")
    formik.setFieldValue("id", ticketToEdit?.id || "");;
    formik.setFieldValue("createdBy", ticketToEdit?.createdBy || "");
  }, [ticketToEdit]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {ticketToEdit?.title ? "Edit Ticket" : "Add Ticket"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="title" className="form-field">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={formik?.values?.title}
              className={
                formik.errors.title && formik.touched.title
                  ? "error-border"
                  : ""
              }
              onChange={formik?.handleChange}
            />
            <Form.Text className="text-danger">
              {formik.touched.title && formik.errors.title}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="description" className="form-field">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={formik?.values?.description}
              placeholder="Enter description"
              className={
                formik.errors.description && formik.touched.description
                  ? "error-border"
                  : ""
              }
              onChange={formik?.handleChange}
            />
            <Form.Text className="text-danger">
              {formik.touched.description && formik.errors.description}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="name" className="form-field">
            <Form.Label>Name</Form.Label>
            <Form.Control
              as="select"
              value={formik?.values?.name}
              className={
                formik.errors.name && formik.touched.name ? "error-border" : ""
              }
              onChange={formik?.handleChange}
            >
              <option>Select Name</option>
              {user &&
                user.map((user: FormValues) => {
                  return (
                    <option
                      value={`${user.firstName} ${user.lastName}`}
                      key={user.id}
                    >{`${user.firstName} ${user.lastName}`}</option>
                  );
                })}
            </Form.Control>
            <Form.Text className="text-danger">
              {formik.touched.name && formik.errors.name}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="tags" className="form-field">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              as="select"
              value={formik?.values?.tags}
              onChange={formik?.handleChange}
              className={
                formik.errors.tags && formik.touched.tags ? "error-border" : ""
              }
            >
              <option>Select Tags</option>
              <option value="Replace">Replace</option>
              <option value="New">New</option>
              <option value="Issue">Issue</option>
              <option value="Issue">Repair</option>
            </Form.Control>
            <Form.Text className="text-danger">
              {formik.touched.tags && formik.errors.tags}
            </Form.Text>
          </Form.Group>

          {
            userRole === "User" && ticketToEdit?.title ? "" : <Form.Group controlId="priority" className="form-field">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                value={formik?.values?.priority}
                onChange={formik?.handleChange}
                className={
                  formik.errors.priority && formik.touched.priority
                    ? "error-border"
                    : ""
                }
              >
                <option>Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Form.Control>
              <Form.Text className="text-danger">
                {formik.touched.priority && formik.errors.priority}
              </Form.Text>
            </Form.Group>
          }


          <div className="addticket-btn">
            <Button className="btn close-btn" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {ticketToEdit?.title ? "Update" : "Submit"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTicket;
