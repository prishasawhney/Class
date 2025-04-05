import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useError } from "../../contexts/ErrorContext";
import "./InterviewPreparationAnalyzer.css";

const InterviewPrepAnalyzer = () => {
  const { username } = useAuth();
  const { showError } = useError();
  const [step, setStep] = useState(1);
  const [videoSrc, setVideoSrc] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [scores, setScores] = useState({
    vocabulary: 0,
    confidence: 0,
    engaging: 0,
    speakingStyle: 0,
    overallPerformance: 0,
  });
  const [review, setReview] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const displayNames = {
    vocabulary: 'Vocabulary',
    confidence: 'Confidence',
    engaging: 'Engaging Ability',
    speakingStyle: 'Speaking Style',
    overallPerformance: 'Overall Performance',
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoSrc(videoUrl);
      setVideoFile(file);
    }
  };

  const handleRemove = () => {
    setVideoSrc("");
    setVideoFile(null);
  };

  const getBarColor = (score) => {
    if (score <= 2) return '#FE9903';
    if (score <= 5) return '#FECE00';
    if (score <= 8) return '#8ED203';
    return '#00BF11';
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      showError("Please provide a valid video file.");
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append("file", videoFile);

    try {
      const { data } = await axios.post("http://localhost:8000/upload-video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (!data) {
        throw new Error("Invalid response structure.");
      }
      
      setScores({
        vocabulary: data.vocabulary,
        confidence: data.confidence_level,
        engaging: data.engaging_ability,
        speakingStyle: data.speaking_style,
        overallPerformance: data.overall_average,
      });
      setReview(data.review);
      setResponse("Video processed successfully!");
      setStep(2);
    } catch (error) {
      console.error("Error:", error);
      setResponse('');
      showError("Error occurred while processing the video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-outside">
      <div className="container">
        {step === 1 && (
          <div className="Uploadscreen">
            <div id="headingg">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="/online-interview.gif" style={{ height: "60px", gap: "5px" }} alt="Interview" />
                <h1>Master Your Interview Performance</h1>
              </div>
              <div id="head_para">
                <p>
                  Upload your interview video to receive a detailed analysis and personalized feedback. Our tool evaluates your confidence, vocabulary, engagement, and speaking style—helping you leave a lasting impression and ace your next interview!
                </p>
              </div>
            </div>
            <div id="pdfdropbox">
              <div id="droppdf" onClick={() => document.getElementById("video-input").click()}>
                <input
                  type="file"
                  id="video-input"
                  accept="video/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <label className="file-label" htmlFor="video-input">
                  <p>Drag & Drop or Click to Upload Video</p>
                </label>
              </div>
              {videoFile && (
                <div className="pdf-info">
                  <p>Uploaded Video: {videoFile.name}</p>
                  <button className="remove-button" onClick={handleRemove}>Remove Video</button>
                </div>
              )}
              <button id="next_button" onClick={handleSubmit} disabled={!videoFile || loading}>{loading ? 'Processing...' : 'Next'}</button>
            </div>
          </div>
        )}
        {step === 2 && videoSrc && (
          <div className="video-preview">
            <div>
              <video src={videoSrc} controls className="uploaded-video" />
              <div className="meter-container">
                {Object.keys(scores).map((key) => (
                  <div key={key} className="meter">
                    <span className="meter-label">{displayNames[key]}</span>
                    <div className="meter-bar">
                      <div
                        className="meter-fill"
                        style={{
                          width: `${scores[key] * 10}%`,
                          backgroundColor: getBarColor(scores[key]),
                        }}
                      ></div>
                    </div>
                    <span className="meter-score">{scores[key]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="review-box">
              <h3>Review</h3>
              <p>{review}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPrepAnalyzer;
