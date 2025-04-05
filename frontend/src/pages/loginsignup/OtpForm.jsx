import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './OtpForm.css';

const OtpForm = ({ setStep, setError, emailId }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleOtpVerified = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 4) {
      setError('Please enter the complete 4-digit OTP');
      return;
    }

    try {
      const response = await axios.post('https://c-l-a-s-s-cognitive-learning-with-ai-for.onrender.com/forgot-password/verify-otp', {
        email: emailId,
        otp: enteredOtp,
      });

      if (response.data.status) {
        setStep(3); // Move to reset password
        setError('');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        const detail = error.response.data.detail;
        if (typeof detail === 'string') {
          setError(detail);
        } else if (Array.isArray(detail)) {
          setError(detail[0]?.msg || 'Validation error');
        } else {
          setError('Something went wrong');
        }
      } else {
        setError('Server not reachable. Please try again later.');
      }
      console.error('OTP verification error:', error);
    }
  };

  const handleResend = () => {
    console.log('Resending OTP...');
    setOtp(['', '', '', '']);
    inputRefs[0].current.focus();
  };

  const handleExit = () => {
    console.log('Exiting OTP form...');
  };

  return (
    <form className="otp-Form" onSubmit={handleOtpVerified}>
      <span className="mainHeading">Enter OTP</span>
      <p className="otpSubheading">We have sent a verification code to your email address</p>

      <div className="inputContainer">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            required
            maxLength={1}
            type="text"
            className="otp-input"
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
