import React, { useContext } from "react";
import "./BrainPage.css";
import "boxicons";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useBrain } from "../../contexts/BrainContext";  

const SummerizedNote = () => {
    const {summary} = useBrain();
    return (
           <div id="SummarizedNoteContent">
                <ReactMarkdown children={summary} remarkPlugins={[remarkGfm]} /> 
           </div>
    );
};

export default SummerizedNote;