import { useState, useEffect } from "react";
import Header from "./Header";
import TextEditor from "./TextEditor";
import LableDropdown from "./LableDropdown";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "../styles/notes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMagnifyingGlass,
  faTrashCan,
  faArrowTrendUp
} from "@fortawesome/free-solid-svg-icons";

import { FormValues, colorOptions, NoteData, initialNotesValues, labelColors } from "../interface/Interfaces";
import NoteSlider from "./NoteSlider";
import DeleteModal from "./DeleteModal";

const NotesDashboard = () => {
  const [notesFields, setNotesFields] = useState(initialNotesValues);
  const getColor = notesFields.label?.color;
  const getLable = notesFields.label?.label;

  const getNotesData = async () => {
    try {
      const getResponse = await fetch("http://localhost:3001/notes");
      const getNotes: NoteData[] = await getResponse.json();
      const filteredNotes = getNotes.filter((item) =>
        item.title?.toLowerCase().includes(notesFields.searchNote.toLowerCase())
      );
      setNotesFields((prevData) => ({ ...prevData, allNotes: filteredNotes }));
    } catch (error) {
      console.log(error, "getting error while fetching data");
    }
  };

  useEffect(() => {
    getNotesData();
  }, [notesFields.searchNote]);

  const handleChangeInput = (e: React.SyntheticEvent<EventTarget>) => {
    setNotesFields((prevData) => ({
      ...prevData,
      changeInput: true,
      title: (e.target as HTMLInputElement).value,
    }));
  };
  const handleChangeText = (e: React.SyntheticEvent<EventTarget>) => {
    setNotesFields((prevData) => ({
      ...prevData,
      changeInput: false,
      title: prevData.title ? (e.target as HTMLInputElement).value : "Title",
    }));
  };

  const user = sessionStorage.getItem("loginUser");
  let getName;
  let userFullName: string;
  let loggedInUserId: any;
  if (user) {
    const getUser: FormValues = JSON.parse(user);
    loggedInUserId = getUser.id;
    userFullName = `${getUser.firstName} ${getUser.lastName}`;
    getName = `${getUser.firstName?.charAt(0).toUpperCase()}${getUser.lastName
      ?.charAt(0)
      .toUpperCase()}`;
  }
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const handlePlusIconClick = () => {
    if (notesFields.selectedNote) {
      setNotesFields((prevData: any) => ({
        ...prevData,
        label: {
          label: notesFields.selectedNote?.label,
          color: notesFields.selectedNote?.color,
        },
        title: notesFields.selectedNote?.title,
        noteText: notesFields.selectedNote?.textData,
        editNote: true,
        showEditor: true,
      }));
    } else {
      setNotesFields((prevData) => ({
        ...prevData,
        showEditor: !prevData?.showEditor,
        editNote: false,
        label: {},
        title: "Title",
        noteText: "",
        selectedNote: null,
      }));
    }
  };

  const handleEditNote = (note: NoteData) => {
    setNotesFields((prevData: any) => ({
      ...prevData,
      selectedNote: note,
      showEditor: true,
      label: {
        label: note.label,
        color: note.color,
      },
      title: note.title,
      noteText: note.textData,
      editNote: true,
    }));
  };

  const postNotesData = async () => {
    try {
      if (notesFields.editNote && notesFields.selectedNote) {
        const response = await fetch(
          `http://localhost:3001/notes/${notesFields.selectedNote.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: notesFields.title,
              label: getLable,
              color: getColor,
              date: currentDate,
              time: currentTime,
              creatByUserId: loggedInUserId,
              textData: notesFields.noteText,
            }),
          }
        );
        if (response.ok) {
          setNotesFields((prevData) => ({
            ...prevData,
            showEditor: !notesFields.showEditor,
            selectedNote: null,
            editNote: false,
          }));
        }
      } else {
        const response = await fetch("http://localhost:3001/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: notesFields.title,
            label: getLable,
            color: getColor,
            date: currentDate,
            time: currentTime,
            creatByUserId: loggedInUserId,
            textData: notesFields.noteText,
          }),
        });
        if (response.ok) {
          setNotesFields((prevData) => ({
            ...prevData,
            showEditor: !notesFields.showEditor,
          }));
        }
      }
      getNotesData();
    } catch (error) {
      console.error("Error in adding note", error);
    }
  };

  const deleteNote = async (id: string) => {
    const deleteResponse = await fetch(`http://localhost:3001/notes/${id}`, {
      method: "DELETE",
    });
    if (deleteResponse.ok) {
      const updatedNotes = notesFields.allNotes.filter(
        (note) => note.id !== id
      );
      setNotesFields((prevData) => ({
        ...prevData,
        allNotes: updatedNotes,
        showEditor: false,
        selectedNote: null,
      }));
    }
  };

  const deleteModal = (id: string) => {
    setNotesFields((prevData) => ({
      ...prevData,
      deletModal: true,
      noteId: id,
    }));
  };

  const loggedInUserNotes = notesFields.allNotes.filter((note) => {
    return note.creatByUserId === loggedInUserId;
  });

  return (
    <>
      <section>
        <Container fluid>
          <Row>
            <Col className="note-haeder">
              <Header currentUser={getName} />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="notes-dashboard">
        <Container fluid>
          <Row className="notes-content">
            <Col className="col-lg-3 notes-content">
              <Form.Group className="search-input">
                <Form.Control
                  type="text"
                  name="search"
                  value={notesFields.searchNote}
                  placeholder="Search notes"
                  onChange={(e) =>
                    setNotesFields((prevData) => ({
                      ...prevData,
                      searchNote: e.target.value,
                    }))
                  }
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="search-icon"
                />
              </Form.Group>
              <div className="plus-icon">
                <p>MY NOTES</p>
                <span className="icon">
                  <FontAwesomeIcon
                    icon={faPlus}
                    onClick={handlePlusIconClick}
                  />
                </span>
              </div>
              <div className="notes">
                <div className="notes-cards">
                  {loggedInUserNotes &&
                    loggedInUserNotes.map((note: NoteData) => {
                      const labelColor = note.label && (labelColors as Record<string, string>)[note.label]
                        && (labelColors as Record<string, string>)[note.label];
                      return (
                        <div key={note.id}>
                          {note.creatByUserId === loggedInUserId && (
                            <Card
                              key={note.id}
                              className={`notes-card ${notesFields.selectedNote?.id === note.id && "edit-border"}`}
                              onClick={() => handleEditNote(note)}
                            >
                              <Card.Body>
                                <Card.Title className="note-cards-title">
                                  {note.title && note.title.length > 20 ? `${note.title.substring(0, 15)}...` : note.title}
                                </Card.Title>
                                <Card.Text>
                                  {note.textData && note.textData.length < 150
                                    ? ` ${note.textData
                                      ?.replace(/<[^>]+>/g, "")
                                      .substring(0, 170)} `
                                    : `${note.textData
                                      ?.replace(/<[^>]+>/g, "")
                                      .substring(0, 170)} ....`}
                                </Card.Text>
                                <Card.Subtitle className="card-label-date">
                                  <span
                                    className="label-card"
                                    style={{
                                      backgroundColor: note.color,
                                      color: labelColor,
                                    }}
                                  >
                                    {!note.label ? "" : <FontAwesomeIcon icon={faArrowTrendUp} />}
                                    {note.label}
                                  </span>
                                  <span className="note-created-date">
                                    {currentDate === note.date ? <p>Today {note.time}</p> : note.date && note.time}
                                  </span>
                                </Card.Subtitle>
                              </Card.Body>
                            </Card>
                          )}
                        </div>
                      );
                    })}
                </div>
                <NoteSlider
                  loggedInUserNotes={loggedInUserNotes}
                  handleEditNote={handleEditNote}
                  selectedNote={notesFields.selectedNote}
                  currentDate={currentDate}
                  loggedInUserId={loggedInUserId}
                />
              </div>
            </Col>
            <Col className="col-lg-9 notes-editor">
              {notesFields.showEditor ? (
                <div>
                  <div className="note-title">
                    <div>
                      <div className="note-headings">
                        <h3>#</h3>
                        <LableDropdown
                          labelNameColor={colorOptions}
                          setLabel={(label) =>
                            setNotesFields((prevdata) => ({
                              ...prevdata,
                              label,
                            }))
                          }
                          selectedNote={notesFields.selectedNote}
                        />
                        <h3>/</h3>
                        <div>
                          {notesFields.changeInput ? (
                            <Form.Control
                              type="text"
                              id="inputTitle"
                              aria-describedby="inputTitle"
                              placeholder="Write title"
                              value={notesFields.title || ""}
                              onChange={handleChangeInput}
                              onBlur={handleChangeText}
                            />
                          ) : (
                            <div onClick={handleChangeInput} className="title">
                              {notesFields.title}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="date-label">
                        <h6>{userFullName!}</h6>
                        <div className="time-lable">
                          <span>{currentDate}</span>
                          <span>{currentTime}</span>
                        </div>
                      </div>
                    </div>
                    {notesFields.selectedNote && (
                      <div
                        className="delete-icon"
                        onClick={() =>
                          deleteModal(notesFields?.selectedNote?.id!)
                        }
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </div>
                    )}
                  </div>
                  <div>
                    <TextEditor
                      setNoteText={(text) =>
                        setNotesFields((prevData) => ({
                          ...prevData,
                          noteText: text,
                        }))
                      }
                      noteText={notesFields.noteText}
                    />
                  </div>
                  <div className="note-save-btn">
                    <Button onClick={postNotesData}>Save</Button>
                  </div>
                </div>
              ) : loggedInUserNotes.length === 0 ? (
                <div className="no-notes-msg">
                  <h3>No notes available !!!</h3>
                </div>
              ) : (
                <div className="no-notes-msg">
                  <h3>Please select note !!!</h3>
                </div>
              )}
              <DeleteModal
                deleteNote={deleteNote}
                setDeleteModal={(value) =>
                  setNotesFields((prevData) => ({
                    ...prevData,
                    deletModal: value,
                  }))
                }
                noteId={notesFields.noteId}
                deletModal={notesFields.deletModal}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default NotesDashboard;