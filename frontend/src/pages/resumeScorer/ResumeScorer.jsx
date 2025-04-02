import React, { useState, useEffect } from "react";
import JobDesc from "./JobDesc";
import Analyzer from "./Analyzer";
import "./ResumeScorer.css";
import Uploader from "./Uploader";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useError } from "../../contexts/ErrorContext";
import { useAuth } from "../../contexts/AuthContext";

import { ThreeDots } from "react-loader-spinner";
import { generateResumeScoreWithGemini } from "../../api/resume.api";

const workerUrl = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

const ResumeScorer = () => {
  const { username } = useAuth();
  const { showError } = useError();
  const [step, setStep] = useState(1); // 1 for Uploader, 2 for JobDesc, 3 for Analyzer
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [pdfName, setPdfName] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [resumeResponse, setResponse] = useState({});

  useEffect(() => {
    // Set the PDF URL only when `acceptedFiles` changes
    if (acceptedFiles.length > 0) {
      const fileUrl = URL.createObjectURL(acceptedFiles[0]);
      setPdfUrl(fileUrl);

      // Cleanup the object URL when the component unmounts or when a new file is uploaded
      return () => URL.revokeObjectURL(fileUrl);
    }
  }, [acceptedFiles]);



  useEffect(() => {
    setStep(1);
  }, []);

  const goToJobDesc = () => {
    setStep(2); // Move to JobDesc
  };

  const goToAnalyzer = () => {
    setStep(3); // Move to Analyzer
  };


  const generateResumeAnalysis = async (event) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData();
    if (pdfName) {
      formData.append("file", acceptedFiles[0]);
    }
    formData.append("jobDescription", jobDesc);
    try {
      const response = await generateResumeScoreWithGemini(formData);
      setResponse(response);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      setLoading(false);
      showError("An error occurred while generating the analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="page-outside">
      {step === 1 && (
        <div className="pdf-upload">
          <Uploader
            onNext={goToJobDesc}
            acceptedFiles={acceptedFiles}
            setAcceptedFiles={setAcceptedFiles}
            pdfName={pdfName}
            setPdfName={setPdfName}
          />
        </div>
      )}
      {step === 2 && (
        <div className="describe">
          <JobDesc onSubmit={goToAnalyzer} jobDesc={jobDesc} setJobDesc={setJobDesc} generateResumeAnalysis={generateResumeAnalysis} />
        </div>
      )}
      {step === 3 && (
        <>
          {loading ? (
            <div className="loader-container" style={{height:'100%', width:'100%',display:'flex',alignItems:'center',justifyContent:'center',}}>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#184ccf"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            </div>
          ) : (
            <>
            <div className="Analyze">
              <Analyzer
                username={username}
                overallScore={resumeResponse.overallAlignmentScore}
                impactScore={resumeResponse.impactOfAchievements}
                brevityScore={resumeResponse.keywordTerminologyMatching}
                styleScore={resumeResponse.formatAndReadability}
                skillsScore={resumeResponse.skillsRelevancyScore}
                roleAlignmentScore={resumeResponse.roleAlignmentScore}
                recommendations={resumeResponse.recommendations}
              />
            </div>
            <div id="displayResume">
            {pdfUrl && (
              <div style={{ height: "100vh" }}>
                <Worker workerUrl={workerUrl}>
                  <Viewer fileUrl={pdfUrl} />
                </Worker>
              </div>
            )}
          </div>
          </>
          )}
          
        </>
      )}
    </div>
  );
};

export default ResumeScorer;

