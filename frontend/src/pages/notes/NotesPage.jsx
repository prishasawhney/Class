import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./NotesPage.css";
import "boxicons";
import NoteSticker from "./NoteSticker";
import NoteWriter from "./NoteWriter.jsx";
import NoteViewer from "./NoteViewer.jsx";
import SidePanel from "./SidePanel.jsx";
import Lottie from 'react-lottie';
import NotesAnimation from '../../assets/notes.json';
import ImageAnimation from '../../assets/Image Solver.json';
import VideoAnimation from '../../assets/Interview Prep.json';
import { useNotes } from "../../contexts/NotesContext";

const NotesPage = () => {
  const colors = ["#BAE1FF", "#f5ee89"];
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [editingNoteKey, setEditingNoteKey] = useState("");
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [viewingNote, setViewingNote] = useState(false);
  const [isNoteWriterVisible, setIsNoteWriterVisible] = useState(false);
  const [isNoteViewerVisible, setIsNoteViewerVisible] = useState(false);
  const [isGlassEffectVisible, setIsGlassEffectVisible] = useState(false);
  const { notes, setNotes, addNote, editNote, searchQuery, setSearchQuery } = useNotes();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const addnotewriter = () => {
    setIsNoteWriterVisible(true);
    setIsNoteViewerVisible(false);
    setIsGlassEffectVisible(true);
    setNoteTitle("");
    setNoteText("");
    setIsEditingNote(false);
  };

  const editNoteFunction = (noteKey) => {
    const noteToEdit = notes.find((note) => note.noteKey === noteKey);
    setEditingNoteKey(noteKey);
    if (noteToEdit) {
      setNoteTitle(noteToEdit.noteTitle);
      setNoteText(noteToEdit.noteText);
      setIsEditingNote(noteKey);
    }
    setIsNoteWriterVisible(true);
    setIsNoteViewerVisible(false);
    setIsGlassEffectVisible(true);
  };

  const viewnote = (key) => {
    setIsNoteViewerVisible(!isNoteViewerVisible);
    setIsGlassEffectVisible(!isGlassEffectVisible);
    setViewingNote(key);
  };

  const closeNoteViewer = () => {
    setIsNoteViewerVisible(!isNoteViewerVisible);
    setIsGlassEffectVisible(!isGlassEffectVisible);
    setIsEditingNote(false);
    setViewingNote(false);
  };

  const closeNoteWriter = () => {
    setIsNoteWriterVisible(!isNoteWriterVisible);
    setIsGlassEffectVisible(!isGlassEffectVisible);
    setIsEditingNote(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (noteTitle === "" || noteText === "") return;

    let noteData = {
      noteTitle: noteTitle,
      noteText: noteText
    };

    try {
      if (isEditingNote) {
        // Update existing note using context
        noteData = {
          ...noteData,
          noteKey: editingNoteKey, // Add noteKey only in this block
      };
        await editNote(noteData); // Updating note through context function
      } else {
        // Create a new note using context
        addNote(noteData); // Adding note through context function
      }

      // Reset form and close note writer
      setNoteTitle("");
      setNoteText("");
      setIsGlassEffectVisible(false);
      setIsNoteWriterVisible(false);
      setIsEditingNote(false);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const discardNote = () => {
    setNoteTitle("");
    setNoteText("");
  };

  const addNoteButtonAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: NotesAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const ImageSolverButtonAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: ImageAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const InterviewPrepButtonAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: VideoAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <>
      {isGlassEffectVisible && <div id="glasseffect"></div>}
      {isNoteWriterVisible && (
        <NoteWriter
          noteTitle={noteTitle}
          noteText={noteText}
          setNoteTitle={setNoteTitle}
          setNoteText={setNoteText}
          handleSubmit={handleSubmit}
          discardNote={discardNote}
          closeNoteWriter={closeNoteWriter}
          isEditingNote={isEditingNote}
        />
      )}
      {isNoteViewerVisible && (
        <NoteViewer
          notes={notes}
          ViewingNoteKey={viewingNote}
          closeNoteViewer={closeNoteViewer}
          editNote={editNoteFunction}
        />
      )}

      <div id="notespage">
        <div id="notes-main">
          <div id="top-bar">
            <div id="search-bar">
              <box-icon name="search"></box-icon>
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div id="notescontainer">
            <div id="notesbuttons">
              <Link to="/notes" id="takeanoteid" className="nav-link">
                <button id="takeanote" className="thisButton" onClick={addnotewriter}>
                  <Lottie
                    options={addNoteButtonAnimationOptions}
                    height={60}
                    width={60}
                  />
                  <div className="button-text">
                    Create a New Note
                  </div>
                </button>
              </Link>
              <Link to="/imagechat" id="withdrawingid" className="nav-link">
                <button id="withdrawing" className="thisButton">
                  <Lottie
                    options={ImageSolverButtonAnimationOptions}
                    height={60}
                    width={60}
                  />
                  <div className="button-text">
                    Solve Your Questions
                  </div>
                </button>
              </Link>
              <Link to="/interview-prep" id="withimageid" className="nav-link">
                <button id="withimage" className="thisButton">
                  <Lottie
                    options={InterviewPrepButtonAnimationOptions}
                    height={60}
                    width={60}
                  />
                  <div className="button-text">
                    Professionalism check
                  </div>
                </button>
              </Link>
            </div>
            <div id="notes">
              {notes.map((note, index) => (
                <NoteSticker
                  note={note}
                  color={colors[index % colors.length]}
                  editNoteFunction={editNoteFunction}
                  viewnote={viewnote}
                />
              ))}
            </div>
          </div>
        </div>
        <SidePanel />
      </div>
    </>
  );
};

export default NotesPage;
