import React, { useContext } from "react";
import "./BrainPage.css";
import "boxicons";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FlashcardContext } from "../../contexts/FlashcardContext";  

const SummerizedNote = () => {
    const {summary} = useContext(FlashcardContext);
    return (
           <div id="SummarizedNoteContent">
                <ReactMarkdown children={summary} remarkPlugins={[remarkGfm]} /> 
           </div>
    );
};

export default SummerizedNote;