import React, { useState, useEffect } from "react";
import ContentContainer from "./ContentContainer";
import "./BrainPage.css";
import Toggler from "./toggle"; 

const BrainPage = () => {

    const [showFluid, setShowFluid] = useState(false);
    useEffect(() => {
        const pdfButton = document.getElementById("pdf");
        const noteButton = document.getElementById("note");
        const container = document.getElementById("upload-section");

        if (pdfButton && noteButton && container) {
            const handlePdfClick = () => container.classList.add("right-panel-active");
            const handleNoteClick = () => container.classList.remove("right-panel-active");

            pdfButton.addEventListener("click", handlePdfClick);
            noteButton.addEventListener("click", handleNoteClick);
            return () => {
                pdfButton.removeEventListener("click", handlePdfClick);
                noteButton.removeEventListener("click", handleNoteClick);
            };
        }
    }, []);

    return (
        <div className="flashcard-summary-container">

            {!showFluid && (<div id="headingg">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src="/opportunities.gif" style={{ height: "90px" }}></img>
                    <h1 style={{padding:"0"}}>Boosting Resources for AI-driven Knowledge </h1>
                </div>
                <div id="head_para">
                    <p>
                    Upload your notes or PDFs and let our AI transform them into concise summaries and interactive flashcards, making learning faster, smarter, and more engaging! 
                    </p>
                </div>
            </div>)}


            {/* Content Section */}
            <div className="content-container" id='content-container'> 
                {/* <div id="slider"> */}

                {/* </div> */}

                {!showFluid ? (
                    <Toggler
                        setShowFluid={setShowFluid}

                    />

                ) : (
                    <ContentContainer showFluid={showFluid}> </ContentContainer>

                )}

            </div>
        </div >
    );
};

export default BrainPage;
