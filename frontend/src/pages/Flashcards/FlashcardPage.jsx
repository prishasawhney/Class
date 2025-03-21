
// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import "./FlashcardPage.css";
// import "boxicons";
// import Flashcard from "./Flashcard.jsx";
// import { generateFlashcardsWithGemini } from "../../API/flashcard.api.js";
// import { ThreeDots } from "react-loader-spinner";
// import Chatbot from "../Common/ChatBot/ChatBot.jsx";

// const Flashcards = ({ username, notes, setTasks }) => {
//   const colors = ["#ac92eb", "#4fc1e8", "#a0d568", "#ffce54", "#ed5564"];
//   const darkerColors = ["#9474c4", "#41a3c0", "#88b85a", "#d4a647", "#c24651"];
//   const [flashcards, setFlashcards] = useState([]);
//   const [acceptedFiles, setAcceptedFiles] = useState([]);
//   const [pdfName, setPdfName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [selectedNote, setSelectedNote] = useState('');
//   const [pdfuploadbox, openpdfuploadbox] = useState(false);
//   const [showError, setShowError] = useState('');

//   const setPdfBoxOpenClose = () => {
//     openpdfuploadbox(!pdfuploadbox);
//   };

//   const onDrop = useCallback((files) => {
//     setAcceptedFiles(files);

//     if (files.length > 0) {
//       setPdfName(files[0].name);
//       openpdfuploadbox(false);
//     }
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: "application/pdf",
//   });

//   const handleSelectChange = (event) => {
//     setSelectedNote(event.target.value);
//   };

//   const generateFlashcards = async (event) => {
//     event.preventDefault();
//     setShowError("");
  
//     if (acceptedFiles.length === 0 && !selectedNote) {
//       setShowError("Please either select a note or upload a PDF before submitting.");
//       return;
//     }
  
//     if (pdfName && selectedNote) {
//       setShowError("Please select either a note or a PDF, but not both.");
//       return;
//     }
  
//     setLoading(true);
  
//     const formData = new FormData();
//     if (pdfName) {
//       formData.append("file", acceptedFiles[0]);
//     } else if (selectedNote) {
//       formData.append("noteKey", selectedNote);
//       formData.append("username", username);
//     }
//     console.log("FormData being sent:", formData.get("file"), formData.get("username"), formData.get("noteKey"));
//     try {
//       const response = await generateFlashcardsWithGemini(formData);
//       console.log(response);
//       setFlashcards(response.flashcards);
//     } catch (error) {
//       console.error("Error generating flashcards:", error);
//       setShowError(error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div id="FlashCardPage">
//       <div id="flashcardmain">
//         <div id="instructionText" style={{ justifyContent: 'center', display: 'flex', color: 'red' }}>
//           <p>{showError}</p>
//         </div>
//         <form id="PDFForm" method="post" onSubmit={generateFlashcards}>
//           <div id="flashtop-bar">
//             <div id="addpdfbutton">
//               <button onClick={(e) => {
//                 e.preventDefault();
//                 setPdfBoxOpenClose();
//               }}>
//                 {pdfName ? (
//                   <p>Uploaded file: {pdfName.length > 15 ? pdfName.slice(0, 12) + "..." : pdfName}</p>
//                 ) : (
//                   <p>Add pdf</p>
//                 )}
//               </button>
//               {pdfuploadbox && (
//                 <div id="pdfuploadbox">
//                   <div {...getRootProps()} id="uploadpdf">
//                     <input {...getInputProps()} />
//                     Drag & drop some PDFs here, or click to select PDFs to create flashcards
//                   </div>
//                 </div>
//               )}
//             </div>
//             <select value={selectedNote} onChange={handleSelectChange} id="selectnotesbutton">
//               <option value="">Select a note</option>
//               {notes.map(note => (
//                 <option key={note.noteTitle} value={note.noteKey}>
//                   {note.noteTitle}
//                 </option>
//               ))}
//             </select>
//             <button type="submit" id="submitnote">Submit</button>
//           </div>
//         </form>
//         <div id="flashcards" style={{ top: pdfuploadbox ? '85px' : '0px' }}>
//           {loading ? (
//             <div id="loader">
//               <ThreeDots
//                 height={80}
//                 width={80}
//                 color="#0579CF"
//               />
//             </div>
//           ) : (
//             flashcards.map((card, index) => (
//               <Flashcard
//                 key={index}
//                 question={card.question}
//                 answer={card.answer}
//                 hint={card.hint}
//                 color={colors[index % colors.length]}
//                 darkerColors={darkerColors[index % darkerColors.length]}
//               />
//             ))
//           )}
//         </div>
//       </div>
//       <Chatbot username={username} setTasks={setTasks}/>
//     </div>
//   );
// };

// export default Flashcards;
// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import "./FlashcardPage.css";
// import "boxicons";
// import Flashcard from "./Flashcard.jsx";
// import { ThreeDots } from "react-loader-spinner";
// // import Chatbot from "../Common/ChatBot/ChatBot.jsx";

// const Flashcards = ({ username, setTasks }) => {
//   const colors = ["#ac92eb", "#4fc1e8", "#a0d568", "#ffce54", "#ed5564"];
//   const darkerColors = ["#9474c4", "#41a3c0", "#88b85a", "#d4a647", "#c24651"];
//   const [flashcards, setFlashcards] = useState([]);
//   const [acceptedFiles, setAcceptedFiles] = useState([]);
//   const [pdfNames, setPdfNames] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [pdfuploadbox, openpdfuploadbox] = useState(false);
//   const [showError, setShowError] = useState('');
//   const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
//   const [currentPdfName, setCurrentPdfName] = useState('');

//   const setPdfBoxOpenClose = () => {
//     openpdfuploadbox(!pdfuploadbox);
//   };

//   const onDrop = useCallback((files) => {
//     setAcceptedFiles(files);
//     const newPdfNames = files.map(file => file.name);
//     setPdfNames([...pdfNames, ...newPdfNames]);
//     if (files.length > 0) {
//       openpdfuploadbox(false);
//       setCurrentPdfName(files[0].name);
//       setCurrentPdfIndex(pdfNames.length);
//       // Simulate adding flashcards when a PDF is added
//       addFlashcardsOnPdfUpload();
//     }
//   }, [pdfNames]);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: "application/pdf",
//   });

//   const addFlashcardsOnPdfUpload = () => {
//     // Simulate adding flashcards for frontend demonstration
//     const newFlashcards = [
//       { question: "What is React?", answer: "A JavaScript library for building user interfaces.", hint: "Frontend framework" },
//       { question: "What is JavaScript?", answer: "A programming language used for client-side scripting.", hint: "Programming language" },
//       { question: "What is a PDF?", answer: "Portable Document Format, used for documents.", hint: "File format" },
//     ];
//     setFlashcards([...flashcards, ...newFlashcards]);
//   };

//   const handleRemoveFlashcard = (index) => {
//     const updatedFlashcards = [...flashcards];
//     updatedFlashcards.splice(index, 1);
//     setFlashcards(updatedFlashcards);
//   };

//   const handlePdfSwitch = (event) => {
//     const selectedPdfIndex = event.target.selectedIndex;
//     setCurrentPdfIndex(selectedPdfIndex);
//     setCurrentPdfName(pdfNames[selectedPdfIndex]);
//     // Simulate clearing flashcards when switching PDFs
//     setFlashcards([]);
//     addFlashcardsOnPdfUpload(); // Simulate adding new flashcards for the selected PDF
//   };

//   return (
//     <div id="FlashCardPage">
//       <div id="flashcardmain">
//         <div id="instructionText" style={{ justifyContent: 'center', display: 'flex', color: 'red' }}>
//           <p>{showError}</p>
//         </div>
//         <div id="flashtop-bar">
//           <div id="addpdfbutton">
//             <button onClick={(e) => {
//               e.preventDefault();
//               setPdfBoxOpenClose();
//             }}>
//               Add PDF
//             </button>
//             {pdfuploadbox && (
//               <div id="pdfuploadbox">
//                 <div {...getRootProps()} id="uploadpdf">
//                   <input {...getInputProps()} />
//                   Drag & drop some PDFs here, or click to select PDFs to create flashcards
//                 </div>
//               </div>
//             )}
//           </div>
//           {pdfNames.length > 0 && (
//             <select value={currentPdfName} onChange={handlePdfSwitch} id="selectpdfbutton">
//               <option value="">Select a PDF</option>
//               {pdfNames.map((name, index) => (
//                 <option key={index} value={name}>
//                   {name}
//                 </option>
//               ))}
//             </select>
//           )}
//         </div>
//         <div id="flashcards" style={{ top: pdfuploadbox ? '85px' : '0px' }}>
//           {loading ? (
//             <div id="loader">
//               <ThreeDots
//                 height={80}
//                 width={80}
//                 color="#0579CF"
//               />
//             </div>
//           ) : (
//             flashcards.map((card, index) => (
//               <Flashcard
//                 key={index}
//                 question={card.question}
//                 answer={card.answer}
//                 hint={card.hint}
//                 color={colors[index % colors.length]}
//                 darkerColors={darkerColors[index % darkerColors.length]}
//                 onRemove={() => handleRemoveFlashcard(index)}
//               />
//             ))
//           )}
//         </div>
//       </div>
//       {/* <Chatbot username={username} setTasks={setTasks}/> */}
//     </div>
//   );
// };

// export default Flashcards;

// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import "./FlashcardPage.css";
// import "boxicons";
// import Flashcard from "./Flashcard.jsx";
// import SummerizedNote from "./SummarizedNote.jsx";
// import { ThreeDots } from "react-loader-spinner";
// // import Chatbot from "../Common/ChatBot/ChatBot.jsx";

// const FlashcardAndSummary = ({ username, setTasks }) => {
//   const colors = ["#ac92eb", "#4fc1e8", "#a0d568", "#ffce54", "#ed5564"];
//   const darkerColors = ["#9474c4", "#41a3c0", "#88b85a", "#d4a647", "#c24651"];
//   const [flashcards, setFlashcards] = useState([]);
//   const [acceptedFiles, setAcceptedFiles] = useState([]);
//   const [pdfNames, setPdfNames] = useState([]);
//   const [pdfName, setPdfName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [pdfuploadbox, openpdfuploadbox] = useState(false);
//   const [showError, setShowError] = useState('');
//   const [summarizedContent, setSummarizedContent] = useState("");
//   const [summarizedNote, setSummarizedNote] = useState('');
//   const [selectedPdf, setSelectedPdf] = useState('');

//   const setPdfBoxOpenClose = () => {
//     openpdfuploadbox(!pdfuploadbox);
//   };

//   const onDrop = useCallback((files) => {
//     setAcceptedFiles(files);
//     const newPdfNames = files.map(file => file.name);
//     setPdfNames([...pdfNames, ...newPdfNames]);
//     if (files.length > 0) {
//       openpdfuploadbox(false);
//       setPdfName(files[0].name);
//       setSelectedPdf(files[0].name);
//       // Simulate adding flashcards and summary when a PDF is added
//       addFlashcardsAndSummaryOnPdfUpload();
//     }
//   }, [pdfNames]);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: "application/pdf",
//   });

//   const addFlashcardsAndSummaryOnPdfUpload = () => {
//     // Simulate adding flashcards for frontend demonstration
//     const newFlashcards = [
//       { question: "What is React?", answer: "A JavaScript library for building user interfaces.", hint: "Frontend framework" },
//       { question: "What is JavaScript?", answer: "A programming language used for client-side scripting.", hint: "Programming language" },
//       { question: "What is a PDF?", answer: "Portable Document Format, used for documents.", hint: "File format" },
//     ];
//     setFlashcards(newFlashcards);

//     // Simulate summarization for frontend demonstration
//     const simulatedSummary = "This is a simulated summary of your PDF.";
//     setSummarizedContent(true);
//     setSummarizedNote(simulatedSummary);
//   };

//   const handleRemoveFlashcard = (index) => {
//     const updatedFlashcards = [...flashcards];
//     updatedFlashcards.splice(index, 1);
//     setFlashcards(updatedFlashcards);
//   };

//   const handlePdfSwitch = (event) => {
//     setSelectedPdf(event.target.value);
//     // Simulate clearing flashcards and summary when switching PDFs
//     setFlashcards([]);
//     setSummarizedContent(false);
//     setSummarizedNote('');
//     // Simulate adding new flashcards and summary for the selected PDF
//     addFlashcardsAndSummaryOnPdfUpload();
//   };

//   return (
//     <div id="FlashCardPage">
//       <div id="flashcardmain">
//         <div id="header-quote">
//           <q>Tell me and I forget, teach me and I may remember, involve me and I learn. - Benjamin Franklin.</q><br />Upload your PDF to learn and grow!
//         </div>
//         <div id="instructionText" style={{ justifyContent: 'center', display: 'flex', color: 'red' }}>
//           <p>{showError}</p>
//         </div>
//         <div id="flashtop-bar">
//           <div id="addpdfbutton">
//             <button onClick={(e) => {
//               e.preventDefault();
//               setPdfBoxOpenClose();
//             }}>
//               Add PDF
//             </button>
//             {pdfuploadbox && (
//               <div id="pdfuploadbox">
//                 <div {...getRootProps()} id="uploadpdf">
//                   <input {...getInputProps()} />
//                   Drag & drop some PDFs here, or click to select PDFs to create flashcards and summary
//                 </div>
//               </div>
//             )}
//           </div>
//           {pdfNames.length > 0 && (
//             <select value={selectedPdf} onChange={handlePdfSwitch} id="selectpdfbutton">
//               <option value="">Select a PDF</option>
//               {pdfNames.map((name, index) => (
//                 <option key={index} value={name}>
//                   {name}
//                 </option>
//               ))}
//             </select>
//           )}
//         </div>
//         <div id="flashcards" style={{ top: pdfuploadbox ? '85px' : '0px' }}>
//           {loading ? (
//             <div id="loader">
//               <ThreeDots
//                 height={80}
//                 width={80}
//                 color="#0579CF"
//               />
//             </div>
//           ) : (
//             flashcards.map((card, index) => (
//               <Flashcard
//                 key={index}
//                 question={card.question}
//                 answer={card.answer}
//                 hint={card.hint}
//                 color={colors[index % colors.length]}
//                 darkerColors={darkerColors[index % darkerColors.length]}
//                 onRemove={() => handleRemoveFlashcard(index)}
//               />
//             ))
//           )}
//         </div>
//         <div id="noteSummary">
//           {summarizedContent && <SummerizedNote content={summarizedNote} />}
//         </div>
//       </div>
//       {/* <Chatbot username={username} setTasks={setTasks}/> */}
//     </div>
//   );
// };

// export default FlashcardAndSummary;
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./FlashcardPage.css";
import "boxicons";
import Flashcard from "./Flashcard.jsx";
import SummerizedNote from "./SummarizedNote.jsx";
import { ThreeDots } from "react-loader-spinner";
import AnimationContainer from "./AnimationContainer.jsx";

const FlashcardAndSummary = ({ username, setTasks }) => {
  const colors = ["#ac92eb", "#4fc1e8", "#a0d568", "#ffce54", "#ed5564"];
  const darkerColors = ["#9474c4", "#41a3c0", "#88b85a", "#d4a647", "#c24651"];
  const [flashcards, setFlashcards] = useState([]);
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [pdfNames, setPdfNames] = useState([]);
  const [pdfName, setPdfName] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfuploadbox, openpdfuploadbox] = useState(false);
  const [showError, setShowError] = useState('');
  const [summarizedContent, setSummarizedContent] = useState("");
  const [summarizedNote, setSummarizedNote] = useState('');
  const [selectedPdf, setSelectedPdf] = useState('');
  const [showFlashcards, setShowFlashcards] = useState(false);

  const setPdfBoxOpenClose = () => {
    openpdfuploadbox(!pdfuploadbox);
  };

  const onDrop = useCallback((files) => {
    setAcceptedFiles(files);
    const newPdfNames = files.map(file => file.name);
    setPdfNames([...pdfNames, ...newPdfNames]);
    if (files.length > 0) {
      openpdfuploadbox(false);
      setPdfName(files[0].name);
      setSelectedPdf(files[0].name);
      // Simulate adding flashcards and summary when a PDF is added
      addFlashcardsAndSummaryOnPdfUpload();
    }
  }, [pdfNames]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf",
  });

  const addFlashcardsAndSummaryOnPdfUpload = () => {
    // Simulate adding flashcards for frontend demonstration
    const newFlashcards = [
      { question: "What is React?", answer: "A JavaScript library for building user interfaces.", hint: "Frontend framework" },
      { question: "What is JavaScript?", answer: "A programming language used for client-side scripting.", hint: "Programming language" },
      { question: "What is a PDF?", answer: "Portable Document Format, used for documents.", hint: "File format" },
    ];
    setFlashcards(newFlashcards);

    // Simulate summarization for frontend demonstration
    const simulatedSummary = "This is a simulated summary of your PDF.";
    setSummarizedContent(true);
    setSummarizedNote(simulatedSummary);
  };

  const handleRemoveFlashcard = (index) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards.splice(index, 1);
    setFlashcards(updatedFlashcards);
  };

  const handlePdfSwitch = (event) => {
    setSelectedPdf(event.target.value);
    // Simulate clearing flashcards and summary when switching PDFs
    setFlashcards([]);
    setSummarizedContent(false);
    setSummarizedNote('');
    // Simulate adding new flashcards and summary for the selected PDF
    addFlashcardsAndSummaryOnPdfUpload();
  };

  const handleShowFlashcards = () => {
    setShowFlashcards(true);
    document.getElementById('flashcardmain').style.filter = "blur(5px)";
  };

  const handleCloseFlashcards = () => {
    setShowFlashcards(false);
    document.getElementById('flashcardmain').style.filter = "blur(0)";
  };

  return (
    <div id="FlashCardPage">
      <div id="flashcardmain">
        <div id="header-quote">
          <q>Tell me and I forget, teach me and I may remember, involve me and I learn.</q> - Benjamin Franklin.
          <br/> Upload your PDF to learn and grow!
        </div>
        <div id="instructionText" style={{ justifyContent: 'center', display: 'flex', color: 'red' }}>
          <p>{showError}</p>
        </div>
        <div id="flashtop-bar">
          <div id="addpdfbutton">
            <button onClick={(e) => {
              e.preventDefault();
              setPdfBoxOpenClose();
            }}>
              Add PDF
            </button>
            {pdfuploadbox && (
              <div id="pdfuploadbox">
                <div {...getRootProps()} id="uploadpdf">
                  <input {...getInputProps()} />
                  Drag & drop some PDFs here, or click to select PDFs to create flashcards and summary
                </div>
              </div>
            )}
          </div>
          {pdfNames.length > 0 && (
            <select value={selectedPdf} onChange={handlePdfSwitch} id="selectpdfbutton">
              <option value="">Select a PDF</option>
              {pdfNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div id="noteSummary">
          {summarizedContent && <SummerizedNote content={summarizedNote} />}
        </div>
        {summarizedContent && (
          <div id="animation-container">
            <AnimationContainer onClick={handleShowFlashcards} />
          </div>
        )}
      </div>
      {showFlashcards && (
        <div id="flashcard-overlay" onClick={(e) => {
          if (e.target.id === 'flashcard-overlay') {
            handleCloseFlashcards();
          }
        }}>
          <div id="flashcards-container">
            <div id="close-button" onClick={handleCloseFlashcards}>
              <i class='bx bx-x' style={{ fontSize: '24px', cursor: 'pointer' }}></i>
            </div>
            {loading ? (
              <div id="loader">
                <ThreeDots
                  height={80}
                  width={80}
                  color="#0579CF"
                />
              </div>
            ) : (
              flashcards.length > 0 && (
                <div id="flashcard-grid">
                  {flashcards.map((card, index) => (
                    <Flashcard
                      key={index}
                      question={card.question}
                      answer={card.answer}
                      hint={card.hint}
                      color={colors[index % colors.length]}
                      darkerColors={darkerColors[index % darkerColors.length]}
                      onRemove={() => handleRemoveFlashcard(index)}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardAndSummary;
