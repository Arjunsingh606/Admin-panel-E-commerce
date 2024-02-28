import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { Card } from "react-bootstrap";
import { NoteData, labelColors } from "../interface/Interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";

interface NoteSliderProps {
  loggedInUserNotes: NoteData[];
  handleEditNote: (note: NoteData) => void;
  selectedNote: NoteData | null;
  currentDate: string;
  loggedInUserId: string
}

const NoteSlider: React.FC<NoteSliderProps> = ({ selectedNote, handleEditNote, loggedInUserNotes, currentDate, loggedInUserId }) => {
  return (
    <div className="slider-notes">
      <AwesomeSlider>
        {loggedInUserNotes &&
          loggedInUserNotes.map((note: NoteData) => {
            const labelColor = note.label && (labelColors as Record<string, string>)[note.label]
              ? (labelColors as Record<string, string>)[note.label]
              : "";
            return (
              <div key={note.id}>
                {note.creatByUserId === loggedInUserId && (
                  <Card
                    key={note.id}
                    className={`notes-card ${selectedNote?.id === note.id && "edit-border"}`}
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
                          <FontAwesomeIcon icon={faArrowTrendUp} />
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
       
      </AwesomeSlider>
    </div>
  );
};

export default NoteSlider;
