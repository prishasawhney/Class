import React, { createContext, useContext, useState } from "react";

export const FlashcardContext = createContext();

export const FlashcardProvider = ({ children }) => {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [selectedNote, setSelectedNote] = useState('');
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

    const [summary, setSummary] = useState(`# React: A Popular JavaScript Library  

**React** is a popular JavaScript library used for building user interfaces primarily for **single-page applications**.  
It provides:  
                
- **Components**  
- **Hooks**  
- **A Virtual DOM** for efficient updates  
                
---
                
**React** is a popular JavaScript library used for building user interfaces, primarily for **single-page applications**.  
It provides:  
                
- **Components**  
- **Hooks**  
- **A Virtual DOM** for efficient updates  
                
---
                
**React** is a popular JavaScript library used for building user interfaces, primarily for **single-page applications**.  
It provides:  
                
- **Components**  
- **Hooks**  
- **A Virtual DOM** for efficient updates  
                
---
                
**React** is a popular JavaScript library used for building user interfaces, primarily for **single-page applications**.  
It provides:  
                
- **Components**  
- **Hooks**  
- **A Virtual DOM** for efficient updates  
                
---
                
**React** is a popular JavaScript library used for building user interfaces, primarily for **single-page applications**.  
It provides:  
                
- **Components**  
- **Hooks**  
- **A Virtual DOM** for efficient updates  
                
---
                
**React** is a popular JavaScript library used for building user interfaces, primarily for **single-page applications**.  
It provides:  
                
- **Components**  
- **Hooks**  
- **A Virtual DOM** for efficient updates  
                
---
                
> React is a popular JavaScript library used for building user interfaces, primarily for **single-page applications**.  
                
It provides:  
                
- **Components**  
- **Hooks**  
- **A Virtual DOM** for efficient updates  
                
---
                
And so on... 🚀  
                `)

    return (
        <FlashcardContext.Provider value={{ flashcard, setFlashcard, acceptedFiles, setAcceptedFiles, selectedNote, setSelectedNote, summary }}>
            {children}
        </FlashcardContext.Provider>
    );
};
