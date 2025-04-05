import React, { useState } from 'react';
import axios from 'axios';
import './ResetPassword.css';
import { useNavigate } from "react-router-dom";
import { useError } from '../../contexts/ErrorContext';

const ResetPassword = ({ email }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { showError } = useError(); // Use the error context to show errors
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/forgot-password/reset-password', {
        email,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      if (response.data.status) {
        setSuccess('Password reset successfully!');
        showError('Password reset successfully! Please Login Again using new password.'); 
        setError('');
        navigate('/login-signup'); // Redirect to login page after successful reset
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.detail || 'Error resetting password');
      } else {
        setError('Server unreachable');
      }
      setSuccess('');
    }
  };

  return (
    <div className="resetpage_container">
      <div className="data">
        <div className="title">
          <h3>Reset Password</h3>
          <p>Please enter your details below</p>
        </div>

        {error && (
          <p className="error-message" style={{ color: 'red', fontSize: '0.9rem', paddingBottom: '5px' }}>
            {error}
          </p>
        )}
        {success && (
          <p className="success-message" style={{ color: 'green', fontSize: '0.9rem', paddingBottom: '5px' }}>
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="inputclass">
            <box-icon name="envelope" type="solid" color="#bbb"></box-icon>
            <input type="email" placeholder="Email" value={email} disabled />
          </div>

          <div className="inputclass">
            <box-icon name="lock" type="solid" color="#bbb"></box-icon>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="inputclass">
            <box-icon name="lock" type="solid" color="#bbb"></box-icon>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="ResetPasswordButton">
            RESET PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
