// import React, { useEffect, useState } from 'react';
// import './ForgotPass.css';
// import Lottie from 'lottie-react';
// import forgotPass from '../../assets/ForgotPass.json';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = ({ 
//     error = "", 
//     setError = () => {}, 
//     setSuccessfulMessage = () => {}, 
//     setSuccess = () => {} 
// }) => {
//     const navigate = useNavigate();
//     const [emailId, setEmailId] = useState('');

//     useEffect(() => {
//         if (setError) setError("");
//     }, [emailId, setError]); 

//     const handleForgotPass = async (event) => {
//         event.preventDefault();

//         try {
//             // API request to reset password
//             const response = await axios.post("https://playwright-backend-m02j.onrender.com/reset-password", { email: emailId });
//             setError('');
//             setSuccess(true);
//             setSuccessfulMessage("Password reset email sent successfully. Please login after resetting your password.");
//             console.log("Success!");
//             navigate('/login-signup');
//         } catch (err) {
//             console.error("Error resetting password: ", err);
//             if (err.response && err.response.status === 404) {
//                 setError('This account is not registered.');
//             } else {
//                 setError('An error occurred. Please try again later.');
//             }
//         }
//     };

//     return (
//         <div className="forgetpage_container">
//             <div className="animation">
//                 <Lottie animationData={forgotPass} style={{ width: '400px' }} />
//             </div>

//             <div className="data">
//                 <div className="title">
//                     <h3>Forgot Password?</h3>
//                     <p>Please enter your email</p> 
//                 </div>

//                 {error && <p className="error-message" style={{color:'red', fontSize:'0.9rem', paddingBottom:'5px'}}>{error}</p>}

//                 <form onSubmit={handleForgotPass} method='POST'>
//                     <div className="emailInput">
//                         <div className="inputclass">
//                             <box-icon name='envelope' type='solid' color="#bbb"></box-icon>
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 value={emailId}
//                                 name="emailId"
//                                 onChange={(e) => setEmailId(e.target.value)}
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <button type="submit" className="ForgotPassword">
//                         RESET
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword;
import React, { useState } from 'react';
import './ForgotPass.css';
import Lottie from 'lottie-react';
import forgotPass from '../../assets/ForgotPass.json';
import OtpForm from './OtpForm'; // Import OTP Form component
import ResetPassword from './ResetPassword'; // Import Reset Password component

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // Step state: 1 - Forgot Password, 2 - OTP Form, 3 - Reset Password
    const [emailId, setEmailId] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleForgotPass = (event) => {
        event.preventDefault();

        // Simulate API call success (no backend connected yet)
        if (emailId.trim() === '') {
            setError('Email is required');
            return;
        }

        setError('');
        console.log('Email submitted:', emailId);
        setStep(2); // Move to OTP Form
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
                />
            )}

            {step === 3 && (
                <ResetPassword
                    email={emailId}
                />
            )}

            {successMessage && (
                <div className="success-message" style={{ marginTop: '20px', color: 'green' }}>
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
