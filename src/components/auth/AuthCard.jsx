import React, { useState } from 'react';

export const AuthCard = ({ onLoginSuccess, onNavigateToExplore, onForgotPassword }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false,
    agreeTerms: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const message =
        authMode === 'login'
          ? `Đăng nhập thành công với ${formData.email || 'tài khoản của bạn'}!`
          : `Đăng ký thành công tài khoản cho ${formData.name || 'bạn'}!`;

      setAlertInfo({ type: 'success', message });

      if (onLoginSuccess) {
        onLoginSuccess({
          email: formData.email,
          name: formData.name || 'Người dùng',
        });
      }
    }, 600);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAlertInfo({
        type: 'success',
        message: `Đăng nhập thành công bằng ${provider}!`,
      });
      if (onLoginSuccess) {
        onLoginSuccess({ email: `user@${provider.toLowerCase()}.com`, name: `${provider} User` });
      }
    }, 500);
  };

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative">
      <div className="p-4 p-sm-5">
        {/* Brand Title */}
        <div className="text-center mb-4">
          <h1
            className="h4 fw-bold mb-0 text-primary"
            style={{ color: '#0062a3', fontSize: '1.45rem', letterSpacing: '-0.3px' }}
          >
            Azure Horizon
          </h1>
        </div>

        {/* Tab Navigation: Login / Sign Up */}
        <div className="d-flex justify-content-center border-bottom mb-4">
          <div className="d-flex gap-4">
            <button
              type="button"
              id="tab-auth-login"
              className={`btn btn-link text-decoration-none px-2 pb-2 fw-semibold position-relative ${
                authMode === 'login' ? 'text-primary' : 'text-secondary'
              }`}
              style={{
                fontSize: '15px',
                borderBottom: authMode === 'login' ? '2.5px solid #0062a3' : '2.5px solid transparent',
                borderRadius: 0,
                color: authMode === 'login' ? '#0062a3' : '#6c757d',
              }}
              onClick={() => {
                setAuthMode('login');
                setAlertInfo(null);
              }}
            >
              Login
            </button>

            <button
              type="button"
              id="tab-auth-signup"
              className={`btn btn-link text-decoration-none px-2 pb-2 fw-semibold position-relative ${
                authMode === 'signup' ? 'text-primary' : 'text-secondary'
              }`}
              style={{
                fontSize: '15px',
                borderBottom: authMode === 'signup' ? '2.5px solid #0062a3' : '2.5px solid transparent',
                borderRadius: 0,
                color: authMode === 'signup' ? '#0062a3' : '#6c757d',
              }}
              onClick={() => {
                setAuthMode('signup');
                setAlertInfo(null);
              }}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Title & Subtitle */}
        <div className="mb-4">
          <h2 className="h5 fw-bold text-dark mb-1" style={{ fontSize: '1.25rem' }}>
            {authMode === 'login' ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-secondary small mb-0">
            {authMode === 'login'
              ? 'Please enter your details to sign in.'
              : 'Enter your information to register a new account.'}
          </p>
        </div>

        {/* Alert Feedback */}
        {alertInfo && (
          <div
            className={`alert alert-${alertInfo.type} py-2 px-3 small d-flex align-items-center justify-content-between mb-3 shadow-sm`}
          >
            <span>
              <i className="bi bi-check-circle-fill me-2"></i>
              {alertInfo.message}
            </span>
            <button
              type="button"
              className="btn-close btn-close-sm"
              onClick={() => setAlertInfo(null)}
            ></button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Sign Up extra field: Full Name */}
          {authMode === 'signup' && (
            <div className="mb-3">
              <label htmlFor="auth-name" className="form-label text-dark small fw-medium mb-1">
                Full Name
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white text-secondary border-end-0">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  id="auth-name"
                  className="form-control border-start-0 ps-0"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div className="mb-3">
            <label htmlFor="auth-email" className="form-label text-dark small fw-medium mb-1">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white text-secondary border-end-0">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                id="auth-email"
                className="form-control border-start-0 ps-0"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="mb-3">
            <label htmlFor="auth-password" className="form-label text-dark small fw-medium mb-1">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white text-secondary border-end-0">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="auth-password"
                className="form-control border-start-0 border-end-0 ps-0"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
              />
              <button
                type="button"
                className="input-group-text bg-white text-secondary border-start-0"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>
            </div>
          </div>

          {/* Remember me & Forgot password */}
          {authMode === 'login' ? (
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember-me"
                  checked={formData.rememberMe}
                  onChange={(e) => handleChange('rememberMe', e.target.checked)}
                />
                <label className="form-check-label text-secondary small" htmlFor="remember-me">
                  Remember me
                </label>
              </div>

              <button
                type="button"
                className="btn btn-link text-primary small text-decoration-none fw-medium p-0"
                style={{ color: '#0062a3', fontSize: '12.5px' }}
                onClick={(e) => {
                  e.preventDefault();
                  if (onForgotPassword) {
                    onForgotPassword();
                  } else {
                    alert('Liên kết khôi phục mật khẩu sẽ được gửi đến email của bạn.');
                  }
                }}
              >
                Forgot Password?
              </button>
            </div>
          ) : (
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="agree-terms"
                checked={formData.agreeTerms}
                onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                required
              />
              <label className="form-check-label text-secondary small" htmlFor="agree-terms">
                I agree to the Terms of Service & Privacy Policy
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            id="btn-auth-submit"
            className="btn btn-primary w-100 py-2.5 fw-bold rounded-3 mb-4 shadow-sm"
            style={{
              backgroundColor: '#0062a3',
              borderColor: '#0062a3',
              fontSize: '15px',
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </span>
            ) : authMode === 'login' ? (
              'Log In'
            ) : (
              'Sign Up'
            )}
          </button>

          {/* Social login divider */}
          <div className="position-relative text-center mb-4">
            <hr className="text-secondary opacity-25 my-0" />
            <span
              className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-secondary small"
              style={{ fontSize: '12px' }}
            >
              Or continue with
            </span>
          </div>

          {/* Social Login Buttons */}
          <div className="row g-2">
            <div className="col-6">
              <button
                type="button"
                id="btn-login-google"
                className="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-2 rounded-3 bg-white"
                style={{ borderColor: '#dee2e6' }}
                onClick={() => handleSocialLogin('Google')}
              >
                {/* Google Icon SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="small text-dark fw-semibold">Google</span>
              </button>
            </div>

            <div className="col-6">
              <button
                type="button"
                id="btn-login-facebook"
                className="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-2 rounded-3 bg-white"
                style={{ borderColor: '#dee2e6' }}
                onClick={() => handleSocialLogin('Facebook')}
              >
                {/* Facebook Icon SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="small text-dark fw-semibold">Facebook</span>
              </button>
            </div>
          </div>

          {/* Quick link back to explore */}
          {onNavigateToExplore && (
            <div className="text-center mt-4 pt-2">
              <button
                type="button"
                className="btn btn-link text-secondary text-decoration-none small"
                onClick={onNavigateToExplore}
              >
                <i className="bi bi-arrow-left me-1"></i>
                Quay lại danh sách khách sạn
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
