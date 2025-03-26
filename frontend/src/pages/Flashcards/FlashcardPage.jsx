
import React, { useState,useEffect } from "react";
import Uploader from "./Uploader";
import Fluid from "./Fluid";
import "./FlashcardPage.css";

const FlashCardSummary = () => {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [pdfName, setPdfName] = useState("");
    const [showFluid, setShowFluid] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const [summary, setSummary] = useState("");

    const handleNext = () => {
        setTimeout(() => {
            // Simulated data for now
            setFlashcards([
                { question: "What is jvefb ghrsgv kfsjh  vsh dvkjb dfskbg vdfkjbgvkjdb vkjdfk lbjvgfj uvhf hfeveh hfjfe hfhg hhjgefeg hjvfjvwdfh vjd hjvd gyggyg ygryeg yey ", answer: "A JavaScript library for building UI.", hint: "Library by Facebook" },
                { question: "What is a Hook?", answer: "A special function in React.", hint: "useState is one of them" },
                { question: "What is JSX?", answer: "A syntax extension for JavaScript.", hint: "Looks like HTML inside JS" }, { question: "What is jvefb ghrsgv kfsjh  vsh dvkjb dfskbg vdfkjbgvkjdb vkjdfk lbjvgfj uvhf hfeveh hfjfe hfhg hhjgefeg hjvfjvwdfh vjd hjvd gyggyg ygryeg yey ", answer: "A JavaScript library for building UI.", hint: "Library by Facebook" },
                { question: "What is a Hook?", answer: "A special function in React.", hint: "useState is one of them" },
                { question: "What is JSX?", answer: "A syntax extension for JavaScript.", hint: "Looks like HTML inside JS" }, { question: "What is jvefb ghrsgv kfsjh  vsh dvkjb dfskbg vdfkjbgvkjdb vkjdfk lbjvgfj uvhf hfeveh hfjfe hfhg hhjgefeg hjvfjvwdfh vjd hjvd gyggyg ygryeg yey ", answer: "A JavaScript library for building UI.", hint: "Library by Facebook" },
                { question: "What is a Hook?", answer: "A special function in React.", hint: "useState is one of them" },
                { question: "What is JSX?", answer: "A syntax extension for JavaScript.", hint: "Looks like HTML inside JS" }, { question: "What is jvefb ghrsgv kfsjh  vsh dvkjb dfskbg vdfkjbgvkjdb vkjdfk lbjvgfj uvhf hfeveh hfjfe hfhg hhjgefeg hjvfjvwdfh vjd hjvd gyggyg ygryeg yey ", answer: "A JavaScript library for building UI.", hint: "Library by Facebook" },
                { question: "What is a Hook?", answer: "A special function in React.", hint: "useState is one of them" },
                { question: "What is JSX?", answer: "A syntax extension for JavaScript.", hint: "Looks like HTML inside JS" }

            ]);
            setSummary("React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.React is a popular JavaScript library used for building user interfaces, primarily for single-page applications. It provides components, hooks, and a virtual DOM for efficient updates.");
            setShowFluid(true);
        }, 1000); // Simulated processing time
    };

    // const pdfButton = document.getElementById('pdf');
    // const noteButton = document.getElementById('note');
    // const container = document.getElementById('upload-section');
    
   // pdfButton.addEventListener('click', () => {
    //     container.classList.add('right-panel-active');
    // });
    
    // noteButton.addEventListener('click', () => {
    //     container.classList.remove('right-panel-active');
    // });

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
    //     <div className="flashcard-summary-container">
            
    //         <div className="heading-container">
    //             <h1>"Tell me and I forget, teach me and I may remember, involve me and I learn" - Benjamin Franklin         <br /> Upload your PDF to learn and grow!</h1>
    //         </div>

    //         {/* Content Section */}
    //         <div className="content-container" id='content-container'>
    //             {!showFluid ? (
    //                 <div className="upload-secton" id="upload-section">
    //                 <div className="tasks uploadPdf-container" >

                   
    //                             <Uploader
    //                             onNext={handleNext}
    //                             acceptedFiles={acceptedFiles}
    //                             setAcceptedFiles={setAcceptedFiles}
    //                             pdfName={pdfName}
    //                             setPdfName={setPdfName}
    //                         />
    //                 </div>
    //                 <div className="tasks uploadNote-container">
    //                     <p>Come Upload a note . select here</p>
    //                 </div>
    //                 <div className="overlays-container">
    //                     <div className="overlayS">
    //                         <div className="overlayS-left">

    //                             <h1>Upload Note??</h1>
    //                             <button className="ghost" id="note">UPLOAD NOTE</button>
    //                         </div>
    //                         <div className="overlayS-right">
    //                             <h1>wanna upload pdf?</h1>
    //                             <button className="ghost" id="pdf">UPLOAD PDF</button>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 </div>
                 
    //         ) : (
    //         <Fluid flashcards={flashcards} summary={summary}> </Fluid>
                    
    //             )}
    //     </div>
    //  </div >
    // );
    <div className="flashcard-summary-container">
            
    <div id="headingg">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src="/brain.gif" style={{height:"160px"}}></img>
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
        {!showFluid ? (
    

           
                        <Uploader
                        onNext={handleNext}
                        acceptedFiles={acceptedFiles}
                        setAcceptedFiles={setAcceptedFiles}
                        pdfName={pdfName}
                        setPdfName={setPdfName}/>
         
    ) : (
    <Fluid flashcards={flashcards} summary={summary}> </Fluid>
            
        )}
</div>
</div >
);
};

export default FlashCardSummary;
