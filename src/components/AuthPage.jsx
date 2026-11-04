import { useState, useMemo } from 'react';
import logoIcon from '../assets/banners/logo-icon.png';
import logoWordmark from '../assets/banners/logo-wordmark.png';
import showcaseImg from '../assets/mission-interior.jpg';
import '../styles/auth-page.css';

export default function AuthPage({ initialMode = 'login', onNavigate }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Login Form State
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  // Sign Up Form State
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    accountType: 'Home & Living', // 'Home & Living' | 'Architect / Designer' | 'Corporate'
    agreed: true,
  });

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    const pw = signupForm.password || '';
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 6) score += 1;
    if (pw.length >= 9 && /[0-9]/.test(pw)) score += 1;
    if (/[A-Z]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score += 1;
    return score; // 0, 1, 2, 3
  }, [signupForm.password]);

  const showToastMsg = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      showToastMsg('Please enter both email and password.', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToastMsg(`Welcome back, ${loginForm.email.split('@')[0]}! Signed in successfully.`);
      setTimeout(() => {
        if (onNavigate) onNavigate('home');
      }, 1400);
    }, 900);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupForm.name || !signupForm.email || !signupForm.phone || !signupForm.password) {
      showToastMsg('Please fill in all required fields.', 'error');
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      showToastMsg('Passwords do not match. Please verify.', 'error');
      return;
    }
    if (!signupForm.agreed) {
      showToastMsg('Please accept the Terms & Conditions.', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToastMsg(`Account created for ${signupForm.name}! Welcome to NextFurn.`);
      setTimeout(() => {
        if (onNavigate) onNavigate('home');
      }, 1400);
    }, 1100);
  };

  const handleForgotPassword = () => {
    const email = loginForm.email || prompt('Enter your registered email address:');
    if (email) {
      showToastMsg(`Password reset link sent to ${email}`);
    }
  };

  const handleSocialLogin = (provider) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToastMsg(`Signed in with ${provider}! Redirecting...`);
      setTimeout(() => {
        if (onNavigate) onNavigate('home');
      }, 1200);
    }, 700);
  };

  return (
    <div className="auth-page">
      {/* Floating Ambient Glowing Orbs */}
      <div className="auth-page__orb auth-page__orb--1" aria-hidden="true" />
      <div className="auth-page__orb auth-page__orb--2" aria-hidden="true" />

      {/* Floating Back to Home Button */}
      <button
        type="button"
        className="auth-page__back-btn"
        onClick={() => onNavigate && onNavigate('home')}
        aria-label="Back to home"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Back to Store</span>
      </button>

      {/* Toast Notification */}
      {toast && (
        <div className={`auth-toast ${toast.type === 'success' ? 'auth-toast--success' : ''}`} role="status">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
          </svg>
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Main Split Authentication Card */}
      <div className="auth-card">
        {/* Left Showcase Panel: Brand Story & Architecture Highlights */}
        <div className="auth-showcase">
          <img src={showcaseImg} alt="NextFurn Luxury Architecture Interior" className="auth-showcase__bg-img" />
          <div className="auth-showcase__overlay" />

          <div className="auth-showcase__content">
            {/* Brand Logo Header */}
            <div className="auth-showcase__header">
              <img src={logoIcon} alt="NextFurn Logo" className="auth-showcase__logo-icon" />
              <div className="auth-showcase__logo-text">
                <span className="auth-showcase__brand-name">NextFurn Overseas</span>
                <span className="auth-showcase__brand-sub">Premium Contract & Home Furniture</span>
              </div>
            </div>

            {/* Showcase Center Headline */}
            <div className="auth-showcase__body">
              <div className="auth-showcase__badge">
                <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                  <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>ISO 9001:2015 Certified Furniture</span>
              </div>

              <h2 className="auth-showcase__title">
                Crafting Spaces That <span>Inspire Excellence.</span>
              </h2>

              <p className="auth-showcase__desc">
                Sign in to manage your commercial quotations, customize executive modular setups, and track orders across India.
              </p>

              {/* 3 Value Perks */}
              <div className="auth-showcase__perks">
                <div className="auth-perk">
                  <div className="auth-perk__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div className="auth-perk__text">
                    <strong>Exclusive B2B & Retail Catalog</strong> with genuine May 2026 trade price lists.
                  </div>
                </div>

                <div className="auth-perk">
                  <div className="auth-perk__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  </div>
                  <div className="auth-perk__text">
                    <strong>Direct Factory Dispatch</strong> from Transport Nagar, Kumhrar, Patna.
                  </div>
                </div>

                <div className="auth-perk">
                  <div className="auth-perk__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="auth-perk__text">
                    <strong>10-Year Frame Warranty</strong> on all solid wood and SS-reinforced models.
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quote Card */}
            <div className="auth-showcase__quote">
              <p className="auth-showcase__quote-p">
                &ldquo;NextFurn&apos;s modular workstations and executive leatherette seating elevated our entire Patna headquarters.&rdquo;
              </p>
              <span className="auth-showcase__quote-author">— Verma &amp; Associates, Commercial Architects</span>
            </div>
          </div>
        </div>

        {/* Right Authentication Form Panel */}
        <div className="auth-form-wrap">
          {/* Mobile Top Brand (only visible on mobile screens) */}
          <div className="auth-mobile-brand">
            <img src={logoIcon} alt="Logo" />
            <img src={logoWordmark} alt="NextFurn Overseas" style={{ height: '22px' }} />
          </div>

          {/* Sliding Pill Tab Switcher */}
          <div className="auth-tabs" role="tablist">
            <span
              className={`auth-tab-indicator ${mode === 'signup' ? 'is-signup' : ''}`}
              aria-hidden="true"
            />
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'login'}
              className={`auth-tab-btn ${mode === 'login' ? 'is-active' : ''}`}
              onClick={() => setMode('login')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
              </svg>
              <span>Sign In</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'signup'}
              className={`auth-tab-btn ${mode === 'signup' ? 'is-active' : ''}`}
              onClick={() => setMode('signup')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
              <span>Create Account</span>
            </button>
          </div>

          {/* =========================================
              VIEW 1: SIGN IN (LOGIN)
              ========================================= */}
          {mode === 'login' ? (
            <div key="view-login" className="auth-view">
              <div className="auth-heading">
                <h1 className="auth-heading__title">Welcome Back</h1>
                <p className="auth-heading__sub">
                  Enter your credentials to access your NextFurn account &amp; saved orders.
                </p>
              </div>

              <form className="auth-form" onSubmit={handleLoginSubmit}>
                {/* Email Address */}
                <div className="auth-group">
                  <label className="auth-label" htmlFor="login-email">
                    Email Address
                  </label>
                  <div className="auth-input-box">
                    <span className="auth-input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>
                    <input
                      id="login-email"
                      type="email"
                      className="auth-input"
                      placeholder="name@company.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password with Eye Toggle */}
                <div className="auth-group">
                  <label className="auth-label" htmlFor="login-password">
                    Password
                  </label>
                  <div className="auth-input-box">
                    <span className="auth-input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      className="auth-input"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="auth-form-row">
                  <label className="auth-checkbox-label">
                    <input
                      type="checkbox"
                      className="auth-checkbox"
                      checked={loginForm.rememberMe}
                      onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="auth-forgot-link"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  className="auth-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="auth-spinner" />
                  ) : (
                    <>
                      <span>Sign In to Account</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Social Divider */}
                <div className="auth-separator">
                  <span>OR CONTINUE WITH</span>
                </div>

                {/* Social Login Buttons */}
                <div className="auth-social-row">
                  <button
                    type="button"
                    className="auth-social-btn"
                    onClick={() => handleSocialLogin('Google')}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    className="auth-social-btn"
                    onClick={() => handleSocialLogin('Phone OTP')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#002F23" strokeWidth="2">
                      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                    <span>Phone OTP</span>
                  </button>
                </div>

                {/* Bottom Switch to Sign Up */}
                <div className="auth-footer-note">
                  Don&apos;t have an account yet?
                  <button
                    type="button"
                    className="auth-switch-link"
                    onClick={() => setMode('signup')}
                  >
                    Create an account
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* =========================================
               VIEW 2: CREATE ACCOUNT (SIGN UP)
               ========================================= */
            <div key="view-signup" className="auth-view">
              <div className="auth-heading">
                <h1 className="auth-heading__title">Create Account</h1>
                <p className="auth-heading__sub">
                  Join NextFurn to access wholesale pricing, trade catalogues &amp; GST billing.
                </p>
              </div>

              <form className="auth-form" onSubmit={handleSignupSubmit}>
                {/* Full Name */}
                <div className="auth-group">
                  <label className="auth-label" htmlFor="signup-name">
                    Full Name
                  </label>
                  <div className="auth-input-box">
                    <span className="auth-input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
                      </svg>
                    </span>
                    <input
                      id="signup-name"
                      type="text"
                      className="auth-input"
                      placeholder="e.g. Rahul Sharma"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Email Address & Phone in grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="auth-group">
                    <label className="auth-label" htmlFor="signup-email">
                      Work Email
                    </label>
                    <div className="auth-input-box" style={{ paddingLeft: '38px' }}>
                      <span className="auth-input-icon" style={{ left: '10px' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </span>
                      <input
                        id="signup-email"
                        type="email"
                        className="auth-input"
                        placeholder="you@email.com"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="auth-group">
                    <label className="auth-label" htmlFor="signup-phone">
                      Mobile Number
                    </label>
                    <div className="auth-input-box" style={{ paddingLeft: '38px' }}>
                      <span className="auth-input-icon" style={{ left: '10px' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </span>
                      <input
                        id="signup-phone"
                        type="tel"
                        className="auth-input"
                        placeholder="+91 98765 43210"
                        value={signupForm.phone}
                        onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Account Type Selection Chips */}
                <div className="auth-group">
                  <label className="auth-label">Customer Profile</label>
                  <div className="auth-chips-group">
                    {['Home & Living', 'Architect & Designer', 'Corporate / Bulk'].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        className={`auth-chip ${signupForm.accountType === chip ? 'is-selected' : ''}`}
                        onClick={() => setSignupForm({ ...signupForm, accountType: chip })}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="auth-group">
                    <label className="auth-label" htmlFor="signup-pw">
                      Password
                    </label>
                    <div className="auth-input-box" style={{ paddingLeft: '38px', paddingRight: '34px' }}>
                      <span className="auth-input-icon" style={{ left: '10px' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect width="18" height="11" x="3" y="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </span>
                      <input
                        id="signup-pw"
                        type={showPassword ? 'text' : 'password'}
                        className="auth-input"
                        placeholder="At least 6 chars"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="auth-eye-btn"
                        style={{ position: 'absolute', right: '6px' }}
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label="Toggle password"
                      >
                        {showPassword ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <line x1="1" y1="1" x2="23" y2="23" />
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="auth-group">
                    <label className="auth-label" htmlFor="signup-confirm-pw">
                      Confirm
                    </label>
                    <div className="auth-input-box" style={{ paddingLeft: '38px', paddingRight: '34px' }}>
                      <span className="auth-input-icon" style={{ left: '10px' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </span>
                      <input
                        id="signup-confirm-pw"
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="auth-input"
                        placeholder="Re-enter"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="auth-eye-btn"
                        style={{ position: 'absolute', right: '6px' }}
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        aria-label="Toggle password"
                      >
                        {showConfirmPassword ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <line x1="1" y1="1" x2="23" y2="23" />
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Strength Indicator */}
                {signupForm.password && (
                  <div className="auth-strength-wrap">
                    <div className="auth-strength-bars">
                      <span className={`auth-strength-segment ${passwordStrength >= 1 ? (passwordStrength === 1 ? 'is-active-weak' : passwordStrength === 2 ? 'is-active-medium' : 'is-active-strong') : ''}`} />
                      <span className={`auth-strength-segment ${passwordStrength >= 2 ? (passwordStrength === 2 ? 'is-active-medium' : 'is-active-strong') : ''}`} />
                      <span className={`auth-strength-segment ${passwordStrength >= 3 ? 'is-active-strong' : ''}`} />
                    </div>
                    <span className="auth-strength-label">
                      {passwordStrength === 0 && 'Too short'}
                      {passwordStrength === 1 && 'Weak password'}
                      {passwordStrength === 2 && 'Good password'}
                      {passwordStrength >= 3 && 'Strong password'}
                    </span>
                  </div>
                )}

                {/* Terms Agreement Checkbox */}
                <label className="auth-checkbox-label" style={{ marginTop: '2px' }}>
                  <input
                    type="checkbox"
                    className="auth-checkbox"
                    checked={signupForm.agreed}
                    onChange={(e) => setSignupForm({ ...signupForm, agreed: e.target.checked })}
                  />
                  <span style={{ fontSize: '12.5px', color: '#555' }}>
                    I agree to the <strong style={{ color: '#002F23' }}>Terms of Service</strong> &amp; <strong style={{ color: '#002F23' }}>Privacy Policy</strong>
                  </span>
                </label>

                {/* Submit Sign Up Button */}
                <button
                  type="submit"
                  className="auth-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="auth-spinner" />
                  ) : (
                    <>
                      <span>Create NextFurn Account</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Bottom Switch to Sign In */}
                <div className="auth-footer-note">
                  Already have an account?
                  <button
                    type="button"
                    className="auth-switch-link"
                    onClick={() => setMode('login')}
                  >
                    Sign in here
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
