
import React, { useState, useEffect } from "react";
import Uploader from "./Uploader";
import Fluid from "./Fluid";
import "./FlashcardPage.css";
import Toggler from "./toggle";

const FlashCardSummary = () => {
   
    const [showFluid, setShowFluid] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const [summary, setSummary] = useState("");

  

    useEffect(() => {
        const pdfButton = document.getElementById("pdf");
        const noteButton = document.getElementById("note");
        const container = document.getElementById("upload-section");

        if (pdfButton && noteButton && container) {
            const handlePdfClick = () => container.classList.add("right-panel-active");
            const handleNoteClick = () => container.classList.remove("right-panel-active");

            pdfButton.addEventListener("click", handlePdfClick);
            noteButton.addEventListener("click", handleNoteClick);

            // Cleanup event listeners on component unmount
            return () => {
                pdfButton.removeEventListener("click", handlePdfClick);
                noteButton.removeEventListener("click", handleNoteClick);
            };
        }
    }, []);

    return (
        <div className="flashcard-summary-container">

            <div id="headingg">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src="/brain.gif" style={{ height: "160px" }}></img>
                    <h1>B.R.A.I.N - Behavior Replication by Analog Instruction of the Nervous System</h1>
                </div>
                <div id="head_para">
                    {/* <p>
            Upload your resume to receive a detailed analysis and personalized
            feedback. Our tool will help you enhance your resume's impact,
            brevity, and style, showcasing your skills in the best possible way.
          </p> */}
                </div>
            </div>


            {/* Content Section */}
            <div className="content-container" id='content-container'>
                {/* <div id="slider"> */}
                    
                {/* </div> */}
                
                {!showFluid ? (
                     <Toggler 
                     setShowFluid={setShowFluid} 
                     setFlashcards={setFlashcards} 
                     setSummary={setSummary} 
                     />
    

           
                        // <Uploader
                        // onNext={handleNext}
                        // acceptedFiles={acceptedFiles}
                        // setAcceptedFiles={setAcceptedFiles}
                        // pdfName={pdfName}
                        // setPdfName={setPdfName}/>
         
    ) : (
    <Fluid flashcards={flashcards} summary={summary}> </Fluid>
            
        )}

            </div>
        </div >
    );
};

export default FlashCardSummary;
