import React, { useState } from 'react';

export const SecureCheckout = ({ onBack, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'momo' | 'zalopay' | 'bank'
  const [cardInfo, setCardInfo] = useState({
    number: '4242 •••• •••• 4242',
    expiry: '12/26',
    cvv: '888',
    name: 'John Doe',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    }, 800);
  };

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative">
      {/* 1. Header */}
      <header className="d-flex align-items-center justify-content-between p-3 px-4 bg-white border-bottom">
        <button
          type="button"
          className="btn btn-link text-dark p-0 text-decoration-none"
          onClick={onBack}
          aria-label="Quay lại"
        >
          <i className="bi bi-arrow-left fs-5"></i>
        </button>

        <h1 className="h6 fw-bold mb-0 text-dark" style={{ fontSize: '1.15rem' }}>
          Secure Checkout
        </h1>

        <div className="text-primary d-flex align-items-center">
          <i className="bi bi-lock-fill fs-5" style={{ color: '#0062a3' }}></i>
        </div>
      </header>

      {/* 2. Main Checkout Body */}
      <div className="p-4">
        {isPaid ? (
          <div className="bg-light p-4 rounded-3 border text-center my-3">
            <div className="text-success mb-3">
              <i className="bi bi-check-circle-fill" style={{ fontSize: '3rem' }}></i>
            </div>
            <h5 className="fw-bold text-dark mb-1">Thanh toán thành công!</h5>
            <p className="text-secondary small mb-3">
              Cảm ơn bạn đã đặt phòng tại <strong>Azure Grand Plaza</strong>. Mã đặt phòng #AZ-8921 đã được gửi tới email của bạn.
            </p>
            <div className="bg-white p-3 rounded-3 border mb-3 text-start small">
              <div className="d-flex justify-content-between mb-1">
                <span className="text-secondary">Phương thức:</span>
                <span className="fw-bold text-dark text-capitalize">{paymentMethod}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-secondary">Tổng thanh toán:</span>
                <span className="fw-bold text-primary">$504.00 USD</span>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary w-100 rounded-3 py-2 fw-bold"
              style={{ backgroundColor: '#0062a3' }}
              onClick={onBack}
            >
              Quay lại trang chính
            </button>
          </div>
        ) : (
          <form onSubmit={handlePay}>
            {/* Section: Payment Method */}
            <div className="mb-4">
              <label className="form-label text-dark fw-bold small mb-2">
                Payment Method
              </label>

              {/* Option 1: Credit / Debit Card (Expandable) */}
              <div
                className={`border rounded-3 p-3 mb-2 transition-all ${
                  paymentMethod === 'card' ? 'border-primary bg-primary-subtle bg-opacity-10 shadow-sm' : 'bg-white'
                }`}
                style={{ borderColor: paymentMethod === 'card' ? '#0062a3' : '#dee2e6' }}
              >
                <div
                  className="d-flex align-items-center justify-content-between cursor-pointer"
                  onClick={() => setPaymentMethod('card')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      className="form-check-input mt-0"
                      name="payment_opt"
                      id="opt-card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <label className="form-check-label text-dark fw-semibold small d-flex align-items-center gap-2" htmlFor="opt-card" style={{ cursor: 'pointer' }}>
                      <i className="bi bi-credit-card-2-front text-primary"></i>
                      Credit / Debit Card
                    </label>
                  </div>

                  <div className="d-flex gap-1">
                    <span className="badge bg-light text-secondary border fw-bold" style={{ fontSize: '10px' }}>VISA</span>
                    <span className="badge bg-light text-secondary border fw-bold" style={{ fontSize: '10px' }}>MC</span>
                  </div>
                </div>

                {/* Sub-form for Card */}
                {paymentMethod === 'card' && (
                  <div className="pt-3 mt-3 border-top">
                    {/* Card Number */}
                    <div className="mb-3">
                      <label className="form-label text-secondary small mb-1" style={{ fontSize: '11px' }}>
                        Card Number
                      </label>
                      <div className="input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="0000 0000 0000 0000"
                          value={cardInfo.number}
                          onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                          required
                        />
                        <span className="input-group-text bg-white text-secondary">
                          <i className="bi bi-credit-card"></i>
                        </span>
                      </div>
                    </div>

                    {/* Expiry Date & CVV */}
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="form-label text-secondary small mb-1" style={{ fontSize: '11px' }}>
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="MM/YY"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label text-secondary small mb-1" style={{ fontSize: '11px' }}>
                          CVC/CVV
                        </label>
                        <div className="input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="123"
                            maxLength={4}
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                            required
                          />
                          <span className="input-group-text bg-white text-secondary">
                            <i className="bi bi-question-circle"></i>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Name on Card */}
                    <div>
                      <label className="form-label text-secondary small mb-1" style={{ fontSize: '11px' }}>
                        Name on Card
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="John Doe"
                        value={cardInfo.name}
                        onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Option 2: MoMo Wallet */}
              <div
                className={`border rounded-3 p-3 mb-2 d-flex align-items-center justify-content-between ${
                  paymentMethod === 'momo' ? 'border-primary bg-primary-subtle bg-opacity-10' : 'bg-white'
                }`}
                onClick={() => setPaymentMethod('momo')}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    className="form-check-input mt-0"
                    name="payment_opt"
                    id="opt-momo"
                    checked={paymentMethod === 'momo'}
                    onChange={() => setPaymentMethod('momo')}
                  />
                  <label className="form-check-label text-dark fw-medium small d-flex align-items-center gap-2" htmlFor="opt-momo" style={{ cursor: 'pointer' }}>
                    <i className="bi bi-wallet2 text-danger"></i>
                    MoMo Wallet
                  </label>
                </div>
              </div>

              {/* Option 3: ZaloPay */}
              <div
                className={`border rounded-3 p-3 mb-2 d-flex align-items-center justify-content-between ${
                  paymentMethod === 'zalopay' ? 'border-primary bg-primary-subtle bg-opacity-10' : 'bg-white'
                }`}
                onClick={() => setPaymentMethod('zalopay')}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    className="form-check-input mt-0"
                    name="payment_opt"
                    id="opt-zalopay"
                    checked={paymentMethod === 'zalopay'}
                    onChange={() => setPaymentMethod('zalopay')}
                  />
                  <label className="form-check-label text-dark fw-medium small d-flex align-items-center gap-2" htmlFor="opt-zalopay" style={{ cursor: 'pointer' }}>
                    <i className="bi bi-cash-stack text-info"></i>
                    ZaloPay
                  </label>
                </div>
              </div>

              {/* Option 4: Bank Transfer */}
              <div
                className={`border rounded-3 p-3 mb-3 d-flex align-items-center justify-content-between ${
                  paymentMethod === 'bank' ? 'border-primary bg-primary-subtle bg-opacity-10' : 'bg-white'
                }`}
                onClick={() => setPaymentMethod('bank')}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    className="form-check-input mt-0"
                    name="payment_opt"
                    id="opt-bank"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                  />
                  <label className="form-check-label text-dark fw-medium small d-flex align-items-center gap-2" htmlFor="opt-bank" style={{ cursor: 'pointer' }}>
                    <i className="bi bi-bank text-primary"></i>
                    Bank Transfer
                  </label>
                </div>
              </div>
            </div>

            {/* Trust Badge: Secure & Encrypted */}
            <div className="bg-light rounded-3 p-3 mb-4 d-flex align-items-start gap-2 border">
              <i className="bi bi-shield-check text-primary fs-5 mt-n1"></i>
              <div>
                <h6 className="fw-bold text-dark mb-0 small">Secure & Encrypted</h6>
                <p className="text-secondary mb-0" style={{ fontSize: '11px', lineHeight: '1.4' }}>
                  Your payment information is encrypted and securely processed. We do not store your full card details.
                </p>
              </div>
            </div>

            {/* Booking Recap Card */}
            <div className="card border rounded-3 p-3 mb-4 shadow-sm">
              <div className="d-flex gap-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=200&q=80"
                  alt="Azure Grand Plaza"
                  className="rounded-2"
                  style={{ width: '70px', height: '65px', objectFit: 'cover' }}
                />
                <div>
                  <div className="text-warning mb-1" style={{ fontSize: '12px' }}>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <h6 className="fw-bold text-dark mb-0" style={{ fontSize: '14px' }}>Azure Grand Plaza</h6>
                  <p className="text-secondary small mb-0" style={{ fontSize: '11.5px' }}>
                    <i className="bi bi-geo-alt me-1"></i>Downtown District
                  </p>
                </div>
              </div>

              <div className="border-top pt-2 small text-secondary">
                <div className="d-flex justify-content-between py-1">
                  <span>Check-in</span>
                  <span className="text-dark fw-medium">Oct 12, 2023</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span>Check-out</span>
                  <span className="text-dark fw-medium">Oct 15, 2023</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span>Room & Guests</span>
                  <span className="text-dark fw-medium">1 Deluxe King, 2 Adults</span>
                </div>
                <div className="d-flex justify-content-between py-1 border-top mt-1">
                  <span>3 Nights x $150</span>
                  <span className="text-dark fw-medium">$450.00</span>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between pt-2 mt-2 border-top">
                <span className="text-secondary small">Total</span>
                <span className="fw-bold text-primary fs-5" style={{ color: '#0062a3' }}>$504.00</span>
              </div>
            </div>

            {/* Pay Now Button */}
            <button
              type="submit"
              id="btn-pay-now"
              className="btn btn-primary w-100 py-2.5 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: '#0062a3', borderColor: '#0062a3', fontSize: '15px' }}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing Payment...
                </span>
              ) : (
                <>
                  <i className="bi bi-lock-fill"></i>
                  <span>Pay Now</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

