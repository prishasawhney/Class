import React, { useState, useRef, useEffect } from 'react';
import './OtpForm.css';

const OtpForm = ({setStep,setError}) => {

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    // Focus the first input when component mounts
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input if current input is filled
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };


  const handleOtpVerified = (isValid) => {
    if (isValid) {
        setStep(3); // Move to password reset
        setError('');
    } else {
        setError('Invalid OTP');
    }
};

  const handleResend = () => {
    // Logic to resend OTP
    console.log('Resending OTP...');
    // Reset OTP fields
    setOtp(['', '', '', '']);
    inputRefs[0].current.focus();
  };

  const handleExit = () => {
    // Logic to close the OTP form
    console.log('Exiting OTP form...');
    // You might want to use a state in parent component or router to handle this
  };

  return (
    <form className="otp-Form" onSubmit={handleOtpVerified}>
      <span className="mainHeading">Enter OTP</span>
      <p className="otpSubheading">We have sent a verification code to your mobile number</p>
      
      <div className="inputContainer">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            required
            maxLength={1}
            type="text"
            className="otp-input"
            id={`otp-input${index + 1}`}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>
      
      <button className="verifyButton" type="submit">Verify</button>
      <button className="exitBtn" type="button" onClick={handleExit}>×</button>
      
      <p className="resendNote">
        Didn't receive the code? 
        <button className="resendBtn" type="button" onClick={handleResend}>
          Resend Code
        </button>
      </p>
    </form>
  );
};

export default OtpForm;
