import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./NotesPage.css";
import "boxicons";
import NoteSticker from "./NoteSticker";
import NoteWriter from "./NoteWriter.jsx";
import NoteViewer from "./NoteViewer.jsx";
import SidePanel from "./SidePanel.jsx";
// import { readTodos, readTaskType } from "../../API/todo.api.js";
// import { createNote, readNotes, deleteNoteByKey, updateNote } from "../../API/note.api.js";
import Lottie from 'react-lottie';
import NotesAnimation from '../../assets/notes.json';
import ImageAnimation from '../../assets/Image Solver.json';
import VideoAnimation from '../../assets/Interview Prep.json';
import { NotesContext } from "../../contexts/NotesContext"; 

const NotesPage = ({
  username,
}) => {
  const colors = ["#BAE1FF", "#f5ee89"];
  const [editingNoteKey, setEditingNoteKey] = useState(false);
  // const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [viewingNote, setViewingNote] = useState(false);
  const [isNoteWriterVisible, setIsNoteWriterVisible] = useState(false);
  const [isNoteViewerVisible, setIsNoteViewerVisible] = useState(false);
  const [isGlassEffectVisible, setIsGlassEffectVisible] = useState(false);
  const { notes, setNotes, addNote, searchQuery,setSearchQuery, loadNotes} = useContext(NotesContext);
  // const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadNotes(username);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const addnotewriter = () => {
    setIsNoteWriterVisible(true);
    setIsNoteViewerVisible(false);
    setIsGlassEffectVisible(true);
    setNoteTitle("");
    setNoteText("");
    setEditingNoteKey(false);
  };

  const editNoteFunction = (noteKey) => {
    const noteToEdit = notes.find((note) => note.noteKey === noteKey);
    if (noteToEdit) {
      setNoteTitle(noteToEdit.noteTitle);
      setNoteText(noteToEdit.noteText);
      setEditingNoteKey(noteKey); 
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
    setEditingNoteKey(false);
    setViewingNote(false);
  };

  const closeNoteWriter = () => {
    setIsNoteWriterVisible(!isNoteWriterVisible);
    setIsGlassEffectVisible(!isGlassEffectVisible);
    setEditingNoteKey(false);
  };

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (noteTitle === "" || noteText === "") return;

    const noteData = {
      username: username,
      noteTitle: noteTitle,
      noteText: noteText,
      noteKey: editingNoteKey || undefined,
    };

    try {
      if (editingNoteKey) {
        // Update existing note
        // await updateNote(noteData);
        setNotes(prevNotes =>
          prevNotes.map(note =>
            note.noteKey === editingNoteKey
              ? { ...note, noteTitle: noteTitle, noteText: noteText }
              : note
          )
        );
      } else {
        // Create a new note
        delete noteData.noteKey;
        noteData.creationDate = getCurrentDate();
        // const response = await createNote(noteData);
        const response = "hello";
        noteData.noteKey = response.noteKey; // Get the noteKey from the response
        delete noteData.username;
        addNote(noteData);
      }

      // Reset form and close note writer
      setNoteTitle("");
      setNoteText("");
      setIsGlassEffectVisible(false);
      setIsNoteWriterVisible(false);
      setEditingNoteKey(false);
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
          editingNoteKey={editingNoteKey}
          username={username}
        />
      )}
      {isNoteViewerVisible && (
        <NoteViewer
          notes={notes}
          ViewingNoteKey={viewingNote}
          closeNoteViewer={closeNoteViewer}
          editNote={editNoteFunction}
          setEditingNoteKey={setEditingNoteKey}
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
