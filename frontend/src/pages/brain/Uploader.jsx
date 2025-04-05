import React, { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { useBrain } from "../../contexts/BrainContext";
import { useAuth } from "../../contexts/AuthContext"; // Import Auth context
import "./BrainPage.css";  

const Uploader = ({
  onNext
}) => {
  const { username } = useAuth(); // Get username from Auth context
  const { PDFBrain } = useBrain();
  const [error, setError] = useState("");
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [pdfName, setPdfName] = useState("");

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
  const handleNext = async () => {
    if (acceptedFiles.length === 0) {
      setError("Please upload a file before proceeding.");
      return;
    }
    try {
      await PDFBrain(acceptedFiles[0], username); // Replace with dynamic username
      onNext(); // Proceed to the next step
    } catch (error) {
      setError("Failed to process PDF. Please try again.");
  }
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
    <div id="pdfdropbox1">
      <div {...getRootProps()} id="droppdf1">
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