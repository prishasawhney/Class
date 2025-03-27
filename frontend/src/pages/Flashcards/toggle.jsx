import React, { useState } from "react";
import "./toggle.css";
import Uploader from "./Uploader";
import Lottie from "lottie-react";
import NotesAnimation from "../../assets/notes.json";
const Toggler = ({ setShowFluid, setFlashcards, setSummary }) => {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [pdfName, setPdfName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
 

    const notes = [
        { noteKey: "1", noteTitle: "Meeting Notes" },
        { noteKey: "2", noteTitle: "Project Ideas" },
        { noteKey: "3", noteTitle: "To-Do List" },
        { noteKey: "4", noteTitle: "Brainstorming Session" },
        { noteKey: "5", noteTitle: "Shopping List" }
    ];


    const handleNextWrapper = () => {
        if (!selectedNote) {
            setErrorMsg("Please upload a file before proceeding.");
            return;
        }
        handleNext(); // Call the original handleNext function if a note is selected
    };



    const handleNext = () => {
        setTimeout(() => {
            // Simulated data for now
            setFlashcards([
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
            setSummary(`# React: A Popular JavaScript Library  

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
                `);
            setShowFluid(true);
        }, 1000); // Simulated processing time
    };




    const [selectedNote, setSelectedNote] = useState('');
    const handleSelectChange = (event) => {
        setSelectedNote(event.target.value);
    };

    const moveSliderLeft = () => {
        document
            .getElementById("overlayS")
            .classList.remove("overlayS-moveHalfRight");
        document
            .getElementById("overlayInnerS")
            .classList.remove("overlayInnerS-moveHalfLeft");
        document.getElementById("pdfContent").classList.remove("leftSideContent");

        document.getElementById("overlayS").classList.add("overlayS-moveHalfLeft");
        document
            .getElementById("overlayInnerS")
            .classList.add("overlayInnerS-moveHalfRight");
        document.getElementById("noteContent").classList.add("rightSideContent");

        setErrorMsg("");
    };


    const moveSliderRight = () => {
        document.getElementById("overlayS").classList.remove("overlayS-moveHalfLeft");
        document
            .getElementById("overlayInnerS")
            .classList.remove("overlayInnerS-moveHalfRight");
        document.getElementById("noteContent").classList.remove("rightSideContent");

        document.getElementById("overlayS").classList.add("overlayS-moveHalfRight");
        document
            .getElementById("overlayInnerS")
            .classList.add("overlayInnerS-moveHalfLeft");
        document.getElementById("pdfContent").classList.add("leftSideContent");
    };

    return (
        <span id="slide-box">
            {/* card bnana hai ye */}
            <div id="overlayS">
                <div id="overlayInnerS">
                    <div id="addNote">
                        <h1>Welcome Back!</h1>
                        <p>
                            Access your notes here to start learning.
                        </p>
                        <button onClick={moveSliderRight}>Add Note</button>
                    </div>
                    <div id="uploadDoc">
                        <h1>Still Worried about your studies??</h1>
                        <p>
                            Start learning by uploading pdf of your chapters.
                        </p>
                        <button onClick={moveSliderLeft}>Add pdf</button>
                    </div>
                </div>
            </div>
            <div id="content">
                <div id="noteContent" className="rightSideContent">
                    <div className="holderS">
                        <div style={{height:"50px",display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"40px"}}>
                            <div id="animation-card1"> <Lottie animationData={NotesAnimation} />
                            </div>
                            <span style={{fontSize:"30px", fontWeight:"600"}}>Upload Note</span>
                        </div>
                        <select value={selectedNote} onChange={handleSelectChange} id="selectnotesbutton">
                            <option value="">Select a note</option>
                            {notes.map(note => (
                                <option key={note.noteKey} value={note.noteKey}>
                                    {note.noteTitle}
                                </option>
                            ))}
                        </select>
                        <button type="submit" id="submitnote" onClick={handleNextWrapper}>Next</button>
                        {errorMsg && <p className="error">{errorMsg}</p>}
                    </div>
                </div>
                <div id="pdfContent" className="leftSideContent">
                    <div className="holderS">
                        <Uploader
                            onNext={handleNext}
                            acceptedFiles={acceptedFiles}
                            setAcceptedFiles={setAcceptedFiles}
                            pdfName={pdfName}
                            setPdfName={setPdfName} />

                    </div>
                </div>
            </div>
        </span>
    );
};
export default Toggler;




