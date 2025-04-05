import React from "react";
import "./Alert.css";
import { useError } from "../../contexts/ErrorContext"; // Import context

const Alert = () => {
    const { error } = useError();

    if (!error) return null;

        return (
            <div className="warning-container">
            <div class="warning">
                <div class="warning__icon">
                    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 14h-2v-5h2zm0 4h-2v-2h2zm-12 3h22l-11-19z" fill="#393a37"></path></svg>
                </div>
                <div class="warning__title">{error}</div>
                <div class="warning__close"><svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#393a37"></path></svg></div>
            </div>
            </div>
        );
};

export default Alert;