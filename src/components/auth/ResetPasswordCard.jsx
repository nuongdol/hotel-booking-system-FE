import React, { useState } from 'react';

export const ResetPasswordCard = ({ onBackToLogin, onClose }) => {
  const [identifier, setIdentifier] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative">
      {/* 1. Header */}
      <header className="d-flex align-items-center justify-content-between p-3 px-4 bg-white border-bottom">
        <div className="d-flex align-items-center gap-2">
          <div className="text-primary fs-5 d-flex align-items-center">
            <i className="bi bi-airplane-fill" style={{ color: '#0062a3' }}></i>
          </div>
          <span className="fw-bold fs-6" style={{ color: '#0062a3', letterSpacing: '-0.2px' }}>
            Azure Horizon
          </span>
        </div>

        {onClose && (
          <button
            type="button"
            className="btn btn-link text-secondary p-0 text-decoration-none"
            onClick={onClose}
            aria-label="Đóng"
          >
            <i className="bi bi-x-lg fs-5"></i>
          </button>
        )}
      </header>

      {/* 2. Top Graphic Banner */}
      <div
        className="position-relative d-flex align-items-center justify-content-center overflow-hidden"
        style={{
          height: '140px',
          background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #e2e8f0 100%)',
        }}
      >
        <div
          className="bg-white p-2 rounded-3 shadow-sm border d-flex flex-column align-items-center justify-content-center"
          style={{ width: '130px', height: '90px', transform: 'rotate(-2deg)' }}
        >
          <div className="bg-primary-subtle p-1 rounded-circle mb-1 text-primary">
            <i className="bi bi-shield-lock text-primary" style={{ fontSize: '18px' }}></i>
          </div>
          <div className="bg-secondary opacity-25 rounded w-75 mb-1" style={{ height: '4px' }}></div>
          <div className="bg-secondary opacity-25 rounded w-50" style={{ height: '3px' }}></div>
        </div>
      </div>

      {/* 3. Form Content */}
      <div className="p-4">
        {/* Reset Icon Badge */}
        <div
          className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3 text-white shadow-sm"
          style={{ width: '42px', height: '42px', backgroundColor: '#0062a3' }}
        >
          <i className="bi bi-arrow-repeat fs-5"></i>
        </div>

        {/* Title & Description */}
        <h1 className="h5 fw-bold text-dark mb-2" style={{ fontSize: '1.3rem' }}>
          Reset Password
        </h1>
        <p className="text-secondary small mb-4" style={{ lineHeight: '1.5' }}>
          Enter the email address or phone number associated with your account, and we'll send you a link to securely reset your password.
        </p>

        {isSubmitted ? (
          <div className="bg-light p-3 rounded-3 border text-center mb-4">
            <div className="text-success mb-2">
              <i className="bi bi-check-circle-fill fs-3"></i>
            </div>
            <h6 className="fw-bold text-dark mb-1">Check your inbox!</h6>
            <p className="text-secondary small mb-3">
              We've sent a password reset link to: <br />
              <strong className="text-dark">{identifier}</strong>
            </p>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm rounded-3 fw-medium w-100"
              onClick={() => setIsSubmitted(false)}
            >
              Send again or change email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Input Email or Phone */}
            <div className="mb-4">
              <label htmlFor="reset-identifier" className="form-label text-dark small fw-medium mb-1">
                Email or Phone Number
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white text-secondary border-end-0">
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="text"
                  id="reset-identifier"
                  className="form-control border-start-0 ps-0"
                  placeholder="name@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="btn-send-reset"
              className="btn btn-primary w-100 py-2.5 fw-bold rounded-3 mb-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: '#0062a3', borderColor: '#0062a3' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </span>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <i className="bi bi-arrow-right"></i>
                </>
              )}
            </button>
          </form>
        )}

        {/* Back to Login */}
        <button
          type="button"
          id="btn-back-login"
          className="btn btn-outline-secondary w-100 py-2 small fw-medium rounded-3 d-flex align-items-center justify-content-center gap-2"
          onClick={onBackToLogin}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Login
        </button>
      </div>
    </div>
  );
};
