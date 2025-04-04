import React, { createContext, useContext, useState } from "react";
import { fetchSummaryForNote, fetchSummaryForPDF } from "../api/summary.api"; // Adjust the import path as necessary
import { fetchFlashcardForNote, fetchFlashcardForPDF } from "../api/flashcard.api";

export const BrainContext = createContext();

export const BrainProvider = ({ children }) => {
    const [summary, setSummary] = useState();
    const [uploadedFile, setUploadedFile] = useState(null);
    const [flashcard, setFlashcard] = useState([]);

    const NotesBrain = async (noteKey, username) => {
        try {
            const result = await fetchSummaryForNote(noteKey, username);
            setSummary(result.Summary);
            const flashcardResult = await fetchFlashcardForNote(noteKey, username);
            setFlashcard(flashcardResult.flashcards); // Store flashcards
        } catch (error) {
            console.error("Failed to fetch summary:", error);
        }
    };

    const PDFBrain = async (file, username) => {
        try {
            const result = await fetchSummaryForPDF(file, username);
            setSummary(result.Summary); // Store the summary
            const flashcardResult = await fetchFlashcardForPDF(file, username);
            setFlashcard(flashcardResult.flashcards); // Store flashcards
            setUploadedFile(file.name);
        } catch (error) {
            console.error("Failed to summarize PDF:", error);
        }
    };

    return (
        <BrainContext.Provider value={{ summary, uploadedFile, NotesBrain, PDFBrain, flashcard }}>
            {children}
        </BrainContext.Provider>
    );
};

export const useBrain = () => {
    return useContext(BrainContext);
};
