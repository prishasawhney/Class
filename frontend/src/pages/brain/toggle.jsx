import React, { useState } from "react";
import "./BrainPage.css";
import Uploader from "./Uploader";
import Lottie from "lottie-react";
import NotesAnimation from "../../assets/notes.json"; 
import { useNotes } from "../../contexts/NotesContext"; 
import { useBrain } from "../../contexts/BrainContext";
import { useAuth } from "../../contexts/AuthContext"; // Import Auth context

const Toggler = ({ setShowFluid }) => {
    const { username } = useAuth(); // Get username from Auth context
    const [errorMsg, setErrorMsg] = useState("");
    const {notes} = useNotes();
    const [selectedNote, setSelectedNote]=useState("");
    const { NotesBrain } = useBrain(); // Fetch summary function from context

    const handleNextWrapper = async () => {
        if (!selectedNote) {
            setErrorMsg("Please upload a file before proceeding.");
            return;
        }
    
        try {
            await NotesBrain(selectedNote, username); // Replace with dynamic username
            setShowFluid(true);
        } catch (error) {
            setErrorMsg("Failed to fetch summary. Please try again.");
        }
    };

    const handleNext = () => {
        setShowFluid(true);
    };

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
                            onNext={handleNext} />

                    </div>
                </div>
            </div>
        </span>
    );
};
export default Toggler;




