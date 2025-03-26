import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./Uploader.css";

const Uploader = ({
  onNext,
  acceptedFiles,
  setAcceptedFiles,
  pdfName,
  setPdfName,
}) => {
  const [error, setError] = useState("");

  // Handle file drop
  const onDrop = useCallback(
    (files) => {
      if (files.length > 0) {
        // Validate that only PDFs are accepted
        if (files[0].type === "application/pdf") {
          setAcceptedFiles(files);
          setPdfName(files[0].name);
          setError("");
        } else {
          setError("Only PDF files are allowed.");
        }
      }
    },
    [setAcceptedFiles]
  );

  // Proceed to next step
  const handleNext = () => {
    if (acceptedFiles.length === 0) {
      setError("Please upload a file before proceeding.");
      return;
    }
    onNext(); // Proceed to the next step
  };

  // Remove the PDF
  const handleRemove = () => {
    setAcceptedFiles([]);
    setPdfName("");
    setError("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf", // Restrict to PDF files
  });

  return (
      <div id="pdfdropbox">
        <div {...getRootProps()} id="droppdf">
          <input
            multiple=""
            className="file-input"
            id="fileInput"
            type="file"
            {...getInputProps()}
          />
          <label className="file-label" htmlFor="fileInput">
            <p>Drag & Drop your PDF files here or click to upload</p>
          </label>
        </div>
        {pdfName && (
          <div className="pdf-info">
            <p>Uploaded PDF: {pdfName}</p>
            <button className="remove-button" onClick={handleRemove}>
              Remove PDF
            </button>
          </div>
        )}
        <button id="next_button" onClick={handleNext}>
          Next
        </button>
        {error && <p className="error">{error}</p>}
      </div>
  );
};

export default Uploader;