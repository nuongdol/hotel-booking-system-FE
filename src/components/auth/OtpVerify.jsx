import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
export const OtpVerify = ({
  userContact = '+84 987 654 321',
  contactType = 'phone', // 'phone' | 'email'
  onSuccess = () => {},
  onBack = () => {},
  onResend = () => {}
}) => {
  // 6 ô ký tự OTP
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const inputRefs = useRef([]);

  // Trạng thái đếm ngược (giây)
  const [countdown, setCountdown] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const [resendMethod, setResendMethod] = useState('sms'); // 'sms' | 'zalo' | 'call' | 'email'

  // Trạng thái xác thực
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [showChannelModal, setShowChannelModal] = useState(false);

  // Số điện thoại / Email có thể chỉnh sửa
  const [currentContact, setCurrentContact] = useState(userContact);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [tempContact, setTempContact] = useState(userContact);

  // Tự động focus vào ô đầu tiên khi mở trang
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Đếm ngược thời gian gửi lại mã
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  //chuyen sang trang home sau khi otp 
  const navigate = useNavigate();
  // Xử lý khi người dùng nhập số vào từng ô
  const handleChange = (index, value) => {
    const cleanValue = value.replace(/\D/g, '');
    if (!cleanValue && value !== '') return;

    const newOtp = [...otp];

    if (cleanValue.length > 1) {
      handlePastedContent(cleanValue, index);
      return;
    }

    newOtp[index] = cleanValue.slice(-1);
    setOtp(newOtp);
    setErrorMessage('');

    if (cleanValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setActiveInputIndex(index + 1);
    }

    if (cleanValue && index === 5 && newOtp.every((digit) => digit !== '')) {
      triggerVerification(newOtp.join(''));
    }
  };

  // Xử lý phím Backspace và phím mũi tên
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
        setActiveInputIndex(index - 1);
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveInputIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setActiveInputIndex(index + 1);
    }
  };

  // Xử lý dán mã (Paste 6 số)
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().replace(/\D/g, '');
    if (!pastedData) return;
    handlePastedContent(pastedData, 0);
  };

  const handlePastedContent = (data, startIndex = 0) => {
    const digits = data.slice(0, 6).split('');
    const newOtp = [...otp];
    digits.forEach((digit, i) => {
      if (startIndex + i < 6) {
        newOtp[startIndex + i] = digit;
      }
    });
    setOtp(newOtp);
    setErrorMessage('');

    const nextIndex = Math.min(startIndex + digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
    setActiveInputIndex(nextIndex);

    if (newOtp.every((d) => d !== '')) {
      triggerVerification(newOtp.join(''));
    }
  };

  // Tự động điền mã mẫu thử nghiệm 123456
  const fillDemoOtp = () => {
    const demoCode = ['1', '2', '3', '4', '5', '6'];
    setOtp(demoCode);
    setErrorMessage('');
    inputRefs.current[5]?.focus();
    triggerVerification('123456');
  };

  // Hàm xác thực OTP
  const triggerVerification = (code) => {
    setIsVerifying(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsVerifying(false);
      if (code === '000000') {
        setErrorMessage('Mã OTP không chính xác hoặc đã hết hạn. Vui lòng thử lại.');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          onSuccess(code);
          navigate('/home',{replace:true})
        }, 1500);
      }
    }, 900);
  };

  // Xử lý gửi lại mã OTP
  const handleResendOtp = (method = resendMethod) => {
    setResendMethod(method);
    setShowChannelModal(false);
    setCountdown(59);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setErrorMessage('');
    inputRefs.current[0]?.focus();
    onResend(method);
  };

  // Lưu chỉnh sửa số điện thoại/email
  const handleSaveContact = (e) => {
    e.preventDefault();
    if (tempContact.trim()) {
      setCurrentContact(tempContact.trim());
      setIsEditingContact(false);
      handleResendOtp(resendMethod);
    }
  };


  return (
    <div className="min-vh-100 bg-light d-flex flex-column justify-content-between">
      {/* Main Content Area */}
      <main className="flex-fill d-flex align-items-center justify-content-center p-3 p-sm-4 my-4">
        <div className="w-100 bg-white rounded-4 shadow p-4 p-sm-5 position-relative overflow-hidden" style={{ maxWidth: '32rem' }}>
          {/* Thanh gradient thương hiệu phía trên */}
          <div
            className="position-absolute top-0 start-0 end-0"
            style={{ height: '6px', background: 'linear-gradient(to right, #0194F3, #00B2FF, #38D7D8)' }}
          />

          {/* TRƯỜNG HỢP: ĐÃ XÁC THỰC THÀNH CÔNG */}
          {isSuccess ? (
            <div className="text-center py-4">
              <div
                className="mx-auto bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-success mb-4"
                style={{ width: '5rem', height: '5rem' }}
              >
                <i className="bi bi-check-circle-fill" style={{ fontSize: '2.75rem' }} />
              </div>
              <h2 className="fw-bold text-dark">Xác thực thành công!</h2>
              <p className="text-secondary mt-2 mx-auto" style={{ maxWidth: '24rem' }}>
                Tài khoản của bạn đã được đăng nhập an toàn vào Traveloka. Đang chuyển tiếp...
              </p>

              <div className="mt-4 d-inline-flex align-items-center gap-2 px-3 py-2 rounded-3 bg-primary bg-opacity-10 text-primary fw-bold small">
                <i className="bi bi-arrow-repeat spin" />
                <span>Đang điều hướng đến trang đặt chỗ của bạn...</span>
              </div>
            </div>
          ) : (
            /* TRƯỜNG HỢP: FORM NHẬP OTP BÌNH THƯỜNG */
            <div>
              {/* Header Icon & Title */}
              <div className="text-center mb-4">
                <div
                  className="mx-auto rounded-3 bg-primary bg-opacity-10 border border-primary-subtle d-flex align-items-center justify-content-center text-primary mb-3"
                  style={{ width: '3.5rem', height: '3.5rem' }}
                >
                  <i className="bi bi-lock-fill" style={{ fontSize: '1.75rem' }} />
                </div>
                <h1 className="fw-bold text-dark h3">Nhập mã xác thực OTP</h1>
                <p className="small text-secondary mt-2 mb-0">
                  Để bảo vệ an toàn cho tài khoản của bạn, vui lòng nhập mã gồm{' '}
                  <span className="fw-bold text-dark">6 chữ số</span> vừa được gửi tới:
                </p>

                {/* Hiển thị số điện thoại / email và nút thay đổi */}
                {!isEditingContact ? (
                  <div className="d-inline-flex align-items-center gap-2 mt-3 px-3 py-2 rounded-pill bg-light border small text-dark">
                    <i className={`bi ${contactType === 'phone' ? 'bi-telephone-fill' : 'bi-envelope-fill'} text-primary`} />
                    <span className="fw-bold">{currentContact}</span>
                    <button
                      type="button"
                      onClick={() => setIsEditingContact(true)}
                      className="btn btn-link btn-sm text-primary fw-semibold p-0 text-decoration-none"
                      style={{ fontSize: '11px' }}
                    >
                      Đổi số
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSaveContact} className="mt-3 d-flex align-items-center justify-content-center gap-2 flex-wrap">
                    <input
                      type="text"
                      value={tempContact}
                      onChange={(e) => setTempContact(e.target.value)}
                      className="form-control form-control-sm"
                      style={{ maxWidth: '220px' }}
                      placeholder="Nhập số điện thoại/email mới"
                      autoFocus
                    />
                    <button type="submit" className="btn btn-primary btn-sm fw-bold">
                      Lưu & Gửi lại
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingContact(false)}
                      className="btn btn-link btn-sm text-secondary"
                    >
                      Hủy
                    </button>
                  </form>
                )}
              </div>

              {/* Ô thử nghiệm nhanh (Demo helper) */}
              <div className="mb-4 p-3 rounded-3 bg-warning bg-opacity-10 border border-warning-subtle d-flex align-items-center justify-content-between gap-3 small flex-wrap">
                <div className="d-flex align-items-center gap-2 text-warning-emphasis">
                  <i className="bi bi-stars text-warning" />
                  <span>
                    Mã OTP thử nghiệm: <strong className="fw-bold">123456</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={fillDemoOtp}
                  className="btn btn-warning btn-sm fw-bold"
                  style={{ fontSize: '11px' }}
                >
                  Điền nhanh
                </button>
              </div>

              {/* 6 Ô NHẬP KÝ TỰ OTP */}
              <div
                className={`d-flex justify-content-center align-items-center gap-2 my-4 ${shake ? 'shake-anim' : ''}`}
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => {
                  const isFilled = digit !== '';
                  const isCurrent = activeInputIndex === index;

                  let borderClass = 'border-secondary-subtle bg-light text-dark';
                  if (errorMessage) {
                    borderClass = 'border-danger bg-danger bg-opacity-10 text-danger';
                  } else if (isFilled) {
                    borderClass = 'border-primary bg-primary bg-opacity-10 text-dark';
                  } else if (isCurrent) {
                    borderClass = 'border-primary bg-white otp-focus-ring';
                  }

                  return (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      id={`otp-box-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onFocus={() => setActiveInputIndex(index)}
                      autoComplete="one-time-code"
                      className={`form-control text-center fw-bold border-2 ${borderClass}`}
                      style={{ width: '3rem', height: '3.5rem', fontSize: '1.5rem' }}
                    />
                  );
                })}
              </div>

              {/* Thông báo lỗi nếu có */}
              {errorMessage && (
                <div className="d-flex align-items-center justify-content-center gap-2 text-danger small fw-semibold mb-3">
                  <i className="bi bi-exclamation-circle-fill" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Nút Xác thực chính */}
              <button
                type="button"
                id="btn-verify-otp"
                disabled={otp.some((d) => d === '') || isVerifying}
                onClick={() => triggerVerification(otp.join(''))}
                className={`btn w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 ${
                  otp.every((d) => d !== '') && !isVerifying ? 'btn-warning text-white' : 'btn-secondary'
                }`}
                style={
                  otp.every((d) => d !== '') && !isVerifying
                    ? { backgroundColor: '#FF5E1F', borderColor: '#FF5E1F' }
                    : {}
                }
              >
                {isVerifying ? (
                  <>
                    <i className="bi bi-arrow-repeat spin" />
                    <span>Đang kiểm tra mã...</span>
                  </>
                ) : (
                  <>
                    <span >Xác nhận mã OTP</span>
                    <i className="bi bi-chevron-right" />
                  </>
                )}
              </button>

              {/* Bộ đếm ngược và Gửi lại mã */}
              <div className="mt-4 pt-4 border-top text-center">
                <p className="small text-secondary mb-2">Chưa nhận được mã xác thực?</p>
                {canResend ? (
                  <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
                    <button
                      type="button"
                      id="btn-resend-otp-sms"
                      onClick={() => handleResendOtp('sms')}
                      className="btn btn-outline-primary btn-sm fw-bold d-flex align-items-center gap-2"
                    >
                      <i className="bi bi-arrow-repeat" />
                      <span>Gửi lại qua tin nhắn SMS</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowChannelModal(true)}
                      className="btn btn-light btn-sm fw-semibold text-secondary"
                    >
                      Phương thức khác...
                    </button>
                  </div>
                ) : (
                  <div className="d-inline-flex align-items-center gap-2 text-secondary fw-medium bg-light px-3 py-2 rounded-pill small">
                    <i className="bi bi-clock" />
                    <span>
                      Gửi lại mã sau:{' '}
                      <strong className="text-dark fw-bold">
                        00:{countdown < 10 ? `0${countdown}` : countdown}
                      </strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Lưu ý bảo mật Traveloka */}
              <div className="mt-4 p-3 rounded-4 bg-light border d-flex align-items-start gap-2" style={{ fontSize: '11px' }}>
                <i className="bi bi-question-circle text-secondary mt-1" />
                <div className="text-secondary">
                  <strong className="text-dark fw-semibold">Lưu ý an toàn:</strong> Tuyệt đối không cung cấp mã
                  OTP này cho bất kỳ ai, kể cả người tự xưng là nhân viên chăm sóc khách hàng của Traveloka.
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal lựa chọn kênh gửi lại mã khác (Zalo, Cuộc gọi, Email) */}
      {showChannelModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
          tabIndex="-1"
          onClick={() => setShowChannelModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg" onClick={(e) => e.stopPropagation()}>
              <div className="modal-body p-4">
                <h3 className="h6 fw-bold text-dark mb-1">Chọn phương thức nhận mã OTP</h3>
                <p className="small text-secondary mb-3">
                  Bạn muốn Traveloka gửi lại mã xác nhận qua kênh nào?
                </p>

                <div className="d-grid gap-2">
                  <button
                    onClick={() => handleResendOtp('sms')}
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-between text-start p-3 rounded-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="p-2 bg-primary bg-opacity-10 text-primary rounded-3">
                        <i className="bi bi-chat-dots-fill" />
                      </div>
                      <div>
                        <div className="small fw-bold text-dark">Tin nhắn SMS</div>
                        <div className="text-secondary" style={{ fontSize: '11px' }}>
                          Nhận mã qua tin nhắn viễn thông
                        </div>
                      </div>
                    </div>
                    <i className="bi bi-chevron-right text-secondary" />
                  </button>

                  <button
                    onClick={() => handleResendOtp('zalo')}
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-between text-start p-3 rounded-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="p-2 bg-info bg-opacity-10 text-info rounded-3">
                        <i className="bi bi-stars" />
                      </div>
                      <div>
                        <div className="small fw-bold text-dark">Zalo ZNS</div>
                        <div className="text-secondary" style={{ fontSize: '11px' }}>
                          Nhận thông báo mã qua ứng dụng Zalo
                        </div>
                      </div>
                    </div>
                    <i className="bi bi-chevron-right text-secondary" />
                  </button>

                  <button
                    onClick={() => handleResendOtp('call')}
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-between text-start p-3 rounded-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="p-2 bg-success bg-opacity-10 text-success rounded-3">
                        <i className="bi bi-telephone-fill" />
                      </div>
                      <div>
                        <div className="small fw-bold text-dark">Cuộc gọi thoại tự động</div>
                        <div className="text-secondary" style={{ fontSize: '11px' }}>
                          Tổng đài đọc mã OTP trực tiếp
                        </div>
                      </div>
                    </div>
                    <i className="bi bi-chevron-right text-secondary" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowChannelModal(false)}
                  className="btn btn-light w-100 mt-3 fw-bold text-secondary"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer bản quyền & hỗ trợ */}
      <footer className="py-3 text-center small text-secondary border-top bg-white">
        <div className="container-xl d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2">
          <span>© 2026 Traveloka - Xác thực 2 yếu tố (2FA) bảo mật cao</span>
          <div className="d-flex align-items-center gap-3 text-secondary">
            <a href="#help" className="link-secondary text-decoration-none">Trợ giúp đăng nhập</a>
            <span>•</span>
            <a href="#privacy" className="link-secondary text-decoration-none">Chính sách bảo mật</a>
            <span>•</span>
            <span className="text-primary fw-semibold">Hotline: 1900-6978</span>
          </div>
        </div>
      </footer>

      {/* Style bổ sung cho hiệu ứng rung khi sai OTP và xoay icon loading */}
      <style>{`
        .otp-focus-ring { box-shadow: 0 0 0 4px rgba(1, 148, 243, 0.15); }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .shake-anim { animation: shake 0.5s; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
};

export default OtpVerify;
