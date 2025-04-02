import { createContext, useContext, useState, useEffect } from "react";
import { createNote, readNotes, deleteNoteByKey, updateNote } from "../api/notes.api";
import { useAuth } from "./AuthContext";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { username } = useAuth();

    useEffect(() => {
        if (username) {
            const fetchNotes = async () => {
                try {
                    const notesList = await readNotes(username);
                    const mappedNotesList = notesList.map((note) => ({
                        noteKey: note.noteKey,
                        noteTitle: note.noteTitle,
                        noteText: note.noteText,
                        creationDate: note.creationDate,
                    }));
                    setNotes(mappedNotesList);
                } catch (error) {
                    console.error("Error loading notes:", error);
                }
            };
            fetchNotes();
            
        } else return;
    }, [username]);

    const addNote = async (note) => {
        try {
            note = {
                ...note,
                username: username, // Add noteKey only in this block
            };
            const response = await createNote(note);
            const newNote = { 
                ...note, 
                noteKey: response.noteKey // Ensure the new note gets the noteKey from the backend response
            };
            setNotes((prev) => [...prev, newNote]);
            
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };
    
    

    const deleteNote = async (key) => {
        try {
            const deleteNoteSchema = { username, noteKey: key };
            await deleteNoteByKey(deleteNoteSchema);
            setNotes((prev) => prev.filter((note) => note.noteKey !== key));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const editNote = async (updatedNote) => {
        try {
            updatedNote = {
                ...updatedNote,
                username: username, // Add noteKey only in this block
            };
            await updateNote(updatedNote);
            setNotes((prev) =>
                prev.map((note) =>
                    note.noteKey === updatedNote.noteKey ? updatedNote : note
                )
            );
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    const filteredNotes = notes.filter((note) =>
        (note.noteTitle && note.noteTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (note.noteText && note.noteText.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <NotesContext.Provider
            value={{
                notes: filteredNotes,
                setNotes,
                addNote,
                deleteNote,
                editNote,
                searchQuery,
                setSearchQuery,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => {
    return useContext(NotesContext);
};