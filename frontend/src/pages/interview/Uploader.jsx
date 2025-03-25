import React, { useState } from "react";

const VideoUploader = ({ videoSrc, setVideoSrc, onNext }) => {
    const [videoName, setVideoName] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const videoUrl = URL.createObjectURL(file);
            setVideoSrc(videoUrl);
            setVideoName(file.name);
        }
    };

    const handleRemove = () => {
        setVideoSrc("");
        setVideoName("");
    };

    return (
        <div className="Uploadscreen">
            <div id="headingg">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src="/online-interview.gif" style={{height:"60px", gap:"5px"}}></img>
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
                {videoName && (
                    <div className="pdf-info">
                        <p>Uploaded Video: {videoName}</p>
                        <button className="remove-button" onClick={handleRemove}>
                            Remove Video
                        </button>
                    </div>
                )}
                <button id="next_button" onClick={onNext} disabled={!videoSrc}>Next</button>
            </div>
        </div>

    );
};

export default VideoUploader;
