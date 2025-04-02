import React, { useState } from 'react';
import './ResetPassword.css';

const ResetPassword = ({email}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    console.log('Password reset successfully for:', email);
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

        <form onSubmit={handleSubmit}>
          <div className="inputclass">
            <box-icon name="envelope" type="solid" color="#bbb"></box-icon>
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
            />
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
