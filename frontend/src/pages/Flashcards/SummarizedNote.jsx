import React, { useState, useEffect, useCallback } from "react";
import "./NoteSummarizer.css";
import "boxicons";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SummerizedNote = ({summary}) => {
    return (
           <div id="SummarizedNoteContent">
                <ReactMarkdown children={summary} remarkPlugins={[remarkGfm]} /> 
           </div>
    );
};

export default SummerizedNote;