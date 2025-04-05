import React, { useState } from 'react';
import './ForgotPass.css';
import Lottie from 'lottie-react';
import forgotPass from '../../assets/ForgotPass.json';
import OtpForm from './OtpForm'; // Import OTP Form component
import ResetPassword from './ResetPassword'; // Import Reset Password component
import axios from 'axios'; // Import axios for API calls

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // Step state: 1 - Forgot Password, 2 - OTP Form, 3 - Reset Password
    const [emailId, setEmailId] = useState('');
    const [error, setError] = useState('');

    const handleForgotPass = async (event) => {
        event.preventDefault();
    
        if (emailId.trim() === '') {
            setError('Email is required');
            return;
        }
    
        try {
            const response = await axios.post('https://c-l-a-s-s-cognitive-learning-with-ai-for.onrender.com/forgot-password/request-otp', {
                email: emailId
            });
            setError('');
            setStep(2);  // Move to OTP Form
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                setError(error.response.data.detail || 'Something went wrong');
            } else {
                setError('Server not reachable. Please try again later.');
            }
            console.error('Forgot password error:', error);
        }
    };    

    return (
        <div className="forgetpage_container">
            {step === 1 && (
                <div className="data">
                    <div className="animationforget">
                        <Lottie animationData={forgotPass} />
                    </div>
                    <div className="title">
                        <h3>Forgot Password?</h3>
                        <p>Please enter your email</p>
                    </div>

                    {error && (
                        <p className="error-message" style={{ color: 'red', fontSize: '0.9rem', paddingBottom: '5px' }}>
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleForgotPass}>
                        <div className="emailInput">
                            <div className="inputclass">
                                <box-icon name="envelope" type="solid" color="#bbb"></box-icon>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="ForgotPassword">
                            SEND OTP
                        </button>
                    </form>
                </div>
            )}

            {step === 2 && (
                <OtpForm
                    setStep={setStep}
                    setError={setError}
                    emailId={emailId} // Pass emailId to OtpForm
                />
            )}

            {step === 3 && (
                <ResetPassword
                    email={emailId}
                />
            )}
        </div>
    );
};

export default ForgotPassword;
