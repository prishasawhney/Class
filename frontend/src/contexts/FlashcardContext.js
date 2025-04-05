import React, { createContext, useContext, useState } from "react";

export const FlashcardContext = createContext();

export const FlashcardProvider = ({ children }) => {
    const [flashcard, setFlashcard] = useState([
        { question: "What is j? ", answer: "A JavaScript library for building UI.", hint: "Library by Facebook" },
        { question: "What is a Hook?", answer: "A special function in React.", hint: "useState is one of them" },
        { question: "What is JSX?", answer: "A syntax extension for JavaScript.", hint: "Looks like HTML inside JS" }, { question: "What is j? ", answer: "A JavaScript library for building UI.", hint: "Library by Facebook" },
        { question: "What is a Hook?", answer: "A special function in React.", hint: "useState is one of them" },
        { question: "What is JSX?", answer: "A syntax extension for JavaScript.", hint: "Looks like HTML inside JS" }, , { question: "What is j? ", answer: "A JavaScript library for building UI.", hint: "Library by Facebook" },
        { question: "What is a Hook?", answer: "A special function in React.", hint: "useState is one of them" },
        { question: "What is JSX?", answer: "A syntax extension for JavaScript.", hint: "Looks like HTML inside JS" },
        { question: "What is a Hook?", answer: "A special function in React.", hint: "useState is one of them" },
        { question: "What is JSX?", answer: "A syntax extension for JavaScript.", hint: "Looks like HTML inside JS" }

    ]);

    return (
        <FlashcardContext.Provider value={{ flashcard, setFlashcard }}>
            {children}
        </FlashcardContext.Provider>
    );
};

export const useFlashcard = () => {
    return useContext(FlashcardContext);
};
