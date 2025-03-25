import React, { createContext, useState, useEffect } from "react";
// import { readNotes, createNote, updateNote, deleteNoteByKey } from "../API/note.api.js";

export const NotesContext = createContext();

export const NotesProvider = ({ children, username }) => {
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (username) {
            loadNotes(username);
        }
    }, [username]);

    const loadNotes = async (username) => {
        try {
            //   const notesList = await readNotes(username);
            const notesList = [
                {
                    noteKey: "1",
                    noteTitle: "Meeting Notes",
                    noteText: "Discussed project milestones and deadlines.",
                    creationDate: "25-03-2025",
                },
                {
                    noteKey: "2",
                    noteTitle: "Shopping List",
                    noteText: "Milk, Eggs, Bread, Butter, Coffee.",
                    creationDate: "24-03-2025",
                },
                {
                    noteKey: "3",
                    noteTitle: "Workout Plan",
                    noteText: "Monday - Chest & Triceps, Tuesday - Back & Biceps.",
                    creationDate: "23-03-2025",
                },
                {
                    noteKey: "4",
                    noteTitle: "Coding To-Do",
                    noteText: "Refactor API calls, Optimize database queries, Fix UI bugs.",
                    creationDate: "22-03-2025",
                },
            ];
            const mappedNotesList = notesList.map((note) => {
                return {
                    noteKey: note.noteKey,
                    noteTitle: note.noteTitle,
                    noteText: note.noteText,
                    creationDate: note.creationDate,
                };
            });
            setNotes(mappedNotesList);
        } catch (error) {
            console.error("Error loading task types:", error);
        }
    };

    const addNote = async (note) => {
        try {
            // const response = await createNote(note);
            const response = { ...note }; // Mock response
            setNotes((prev) => [...prev, response]);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    const deleteNote = async (key) => {
        console.log("delete");
        const deleteNoteSchema = {
            username: username,
            noteKey: key,
        };
        // await deleteNoteByKey(deleteNoteSchema);
        const newNotes = notes.filter((note) => note.noteKey !== key);
        setNotes(newNotes);
    };

    const filteredNotes = notes.filter((note) =>
        note.noteTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.noteText.toLowerCase().includes(searchQuery.toLowerCase())
      );      

    return (
        <NotesContext.Provider
            value={{
                notes: filteredNotes,
                setNotes,
                addNote,
                deleteNote,
                searchQuery,
                setSearchQuery,
                loadNotes,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};
