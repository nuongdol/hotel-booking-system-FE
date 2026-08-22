import React, { useState } from 'react';

export const SecureCheckout = ({ onBack, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('vietqr'); // 'vietqr' | 'momo' | 'card' | 'zalopay' | 'paylater'
  const [cardInfo, setCardInfo] = useState({
    number: '9704 •••• •••• 8868',
    expiry: '08/29',
    cvv: '998',
    name: 'NGUYEN VAN AN',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' ₫';

  const handlePay = (e) => {
    e?.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    }, 900);
  };

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative">
      {/* 1. Header */}
      <header className="d-flex align-items-center justify-content-between p-3 px-4 bg-white border-bottom sticky-top">
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center border"
            onClick={onBack}
            style={{ width: '36px', height: '36px' }}
            aria-label="Quay lại"
          >
            <i className="bi bi-arrow-left fs-5"></i>
          </button>
          <div>
            <h1 className="h6 fw-bold mb-0 text-dark" style={{ fontSize: '1.2rem' }}>
              Thanh Toán An Toàn
            </h1>
            <span className="text-secondary small" style={{ fontSize: '11.5px' }}>
              Mã giao dịch: <strong>#TVLK-89421</strong> • Bảo mật SSL 256-bit
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-1 text-success small fw-bold">
          <i className="bi bi-shield-lock-fill fs-5"></i>
          <span className="d-none d-sm-inline">Bảo mật PCI-DSS</span>
        </div>
      </header>

      {/* 2. Main Checkout Body (Desktop 2-Column) */}
      <div className="p-3 p-md-4 bg-light">
        {isPaid ? (
          <div className="bg-white p-4 p-md-5 rounded-4 border text-center my-3 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white"
              style={{ width: '72px', height: '72px', backgroundColor: '#00b14f' }}
            >
              <i className="bi bi-check-lg" style={{ fontSize: '2.5rem' }}></i>
            </div>
            <h3 className="h5 fw-bold text-dark mb-1">Thanh Toán Đặt Phòng Thành Công!</h3>
            <p className="text-secondary small mb-3">
              Cảm ơn bạn đã lựa chọn <strong>Traveloka</strong>. Vé điện tử và phiếu xác nhận phòng đã được gửi tới email <strong>vanan.nguyen@example.com</strong>.
            </p>
            <div className="bg-light p-3 rounded-3 border mb-4 text-start small">
              <div className="d-flex justify-content-between mb-1.5">
                <span className="text-secondary">Khách sạn:</span>
                <strong className="text-dark">Horizon Luxury Resort & Spa Da Nang</strong>
              </div>
              <div className="d-flex justify-content-between mb-1.5">
                <span className="text-secondary">Phương thức:</span>
                <strong className="text-primary text-uppercase">{paymentMethod}</strong>
              </div>
              <div className="d-flex justify-content-between pt-2 border-top">
                <span className="text-secondary">Tổng tiền đã thanh toán:</span>
                <strong className="text-danger fs-6" style={{ color: '#ff5e1f' }}>{formatVND(10068000)}</strong>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-warning w-100 rounded-pill py-2.5 fw-bold text-white shadow-sm"
              style={{ backgroundColor: '#ff5e1f', borderColor: '#ff5e1f' }}
              onClick={onBack}
            >
              Quay lại Trang Chủ Traveloka
            </button>
          </div>
        ) : (
          <form onSubmit={handlePay}>
            <div className="row g-3 g-lg-4">
              {/* LEFT COLUMN: PAYMENT METHODS */}
              <div className="col-12 col-lg-7">
                <div className="card rounded-3 border bg-white p-3 p-md-4 shadow-sm mb-3">
                  <h2 className="h6 fw-bold mb-3 text-dark pb-2 border-bottom d-flex align-items-center gap-2">
                    <i className="bi bi-credit-card-2-front text-primary"></i>
                    Chọn Phương Thức Thanh Toán
                  </h2>

                  {/* Option 1: VietQR (Quét mã QR Ngân hàng) */}
                  <div
                    className={`border rounded-3 p-3 mb-2.5 cursor-pointer transition-all ${
                      paymentMethod === 'vietqr' ? 'border-primary bg-primary-subtle bg-opacity-25 shadow-sm' : 'bg-white'
                    }`}
                    style={{ borderColor: paymentMethod === 'vietqr' ? '#0194f3' : '#e2e8f0' }}
                    onClick={() => setPaymentMethod('vietqr')}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          className="form-check-input mt-0"
                          name="payment_opt"
                          id="opt-vietqr"
                          checked={paymentMethod === 'vietqr'}
                          onChange={() => setPaymentMethod('vietqr')}
                        />
                        <label className="form-check-label text-dark fw-bold small d-flex align-items-center gap-2 mb-0 cursor-pointer" htmlFor="opt-vietqr">
                          <i className="bi bi-qr-code-scan text-primary fs-5"></i>
                          <span>VietQR (Chuyển khoản / Quét mã Ngân hàng 24/7)</span>
                        </label>
                      </div>
                      <span className="badge bg-success text-white fw-bold" style={{ fontSize: '10px' }}>
                        Miễn phí GD
                      </span>
                    </div>

                    {paymentMethod === 'vietqr' && (
                      <div className="mt-3 pt-3 border-top text-center bg-white p-3 rounded-3 border">
                        <span className="badge bg-primary mb-2">Quét mã bằng app ngân hàng bất kỳ</span>
                        <div className="bg-light p-2 rounded-3 d-inline-block border mb-2">
                          <i className="bi bi-qr-code fs-1 text-dark" style={{ fontSize: '6rem' }}></i>
                        </div>
                        <div className="small text-secondary">
                          Nội dung chuyển khoản: <strong className="text-primary font-monospace">TVLK 89421</strong>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Option 2: Ví MoMo */}
                  <div
                    className={`border rounded-3 p-3 mb-2.5 cursor-pointer transition-all ${
                      paymentMethod === 'momo' ? 'border-primary bg-primary-subtle bg-opacity-25 shadow-sm' : 'bg-white'
                    }`}
                    style={{ borderColor: paymentMethod === 'momo' ? '#0194f3' : '#e2e8f0' }}
                    onClick={() => setPaymentMethod('momo')}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          className="form-check-input mt-0"
                          name="payment_opt"
                          id="opt-momo"
                          checked={paymentMethod === 'momo'}
                          onChange={() => setPaymentMethod('momo')}
                        />
                        <label className="form-check-label text-dark fw-bold small d-flex align-items-center gap-2 mb-0 cursor-pointer" htmlFor="opt-momo">
                          <span className="badge text-white px-2 py-1" style={{ backgroundColor: '#a50064', fontSize: '11px' }}>MoMo</span>
                          <span>Ví điện tử MoMo</span>
                        </label>
                      </div>
                      <span className="badge bg-warning text-dark fw-bold" style={{ fontSize: '10px' }}>
                        Hoàn 20.000 Xu
                      </span>
                    </div>
                  </div>

                  {/* Option 3: Thẻ Tín dụng / Ghi nợ quốc tế */}
                  <div
                    className={`border rounded-3 p-3 mb-2.5 cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-primary bg-primary-subtle bg-opacity-25 shadow-sm' : 'bg-white'
                    }`}
                    style={{ borderColor: paymentMethod === 'card' ? '#0194f3' : '#e2e8f0' }}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          className="form-check-input mt-0"
                          name="payment_opt"
                          id="opt-card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                        />
                        <label className="form-check-label text-dark fw-bold small d-flex align-items-center gap-2 mb-0 cursor-pointer" htmlFor="opt-card">
                          <i className="bi bi-credit-card text-primary fs-5"></i>
                          <span>Thẻ Quốc tế (Visa / Mastercard / JCB / Amex)</span>
                        </label>
                      </div>
                      <div className="d-flex gap-1">
                        <span className="badge bg-light text-secondary border fw-bold" style={{ fontSize: '9.5px' }}>VISA</span>
                        <span className="badge bg-light text-secondary border fw-bold" style={{ fontSize: '9.5px' }}>MC</span>
                      </div>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="mt-3 pt-3 border-top">
                        <div className="mb-2">
                          <label className="form-label text-secondary small fw-bold mb-1">Số thẻ *</label>
                          <input
                            type="text"
                            className="form-control form-control-sm font-monospace"
                            placeholder="4242 •••• •••• 4242"
                            value={cardInfo.number}
                            onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                            required
                          />
                        </div>
                        <div className="row g-2">
                          <div className="col-6">
                            <label className="form-label text-secondary small fw-bold mb-1">Hết hạn (MM/YY) *</label>
                            <input
                              type="text"
                              className="form-control form-control-sm font-monospace"
                              placeholder="12/28"
                              value={cardInfo.expiry}
                              onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                              required
                            />
                          </div>
                          <div className="col-6">
                            <label className="form-label text-secondary small fw-bold mb-1">CVV / CVC *</label>
                            <input
                              type="password"
                              maxLength={4}
                              className="form-control form-control-sm font-monospace"
                              placeholder="888"
                              value={cardInfo.cvv}
                              onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Option 4: Thanh toán tại Khách sạn (Pay at Hotel) */}
                  <div
                    className={`border rounded-3 p-3 cursor-pointer transition-all ${
                      paymentMethod === 'paylater' ? 'border-primary bg-primary-subtle bg-opacity-25 shadow-sm' : 'bg-white'
                    }`}
                    style={{ borderColor: paymentMethod === 'paylater' ? '#0194f3' : '#e2e8f0' }}
                    onClick={() => setPaymentMethod('paylater')}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          className="form-check-input mt-0"
                          name="payment_opt"
                          id="opt-paylater"
                          checked={paymentMethod === 'paylater'}
                          onChange={() => setPaymentMethod('paylater')}
                        />
                        <label className="form-check-label text-dark fw-bold small d-flex align-items-center gap-2 mb-0 cursor-pointer" htmlFor="opt-paylater">
                          <i className="bi bi-cash-coin text-success fs-5"></i>
                          <span>Thanh toán tại quầy lễ tân khách sạn</span>
                        </label>
                      </div>
                      <span className="badge bg-secondary text-white fw-bold" style={{ fontSize: '10px' }}>
                        Không cần thẻ
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: ORDER SUMMARY & PAYMENT TRIGGER */}
              <div className="col-12 col-lg-5">
                <div className="card rounded-3 border bg-white p-3 p-md-4 shadow-sm mb-3 sticky-top" style={{ top: '80px', zIndex: 10 }}>
                  <h2 className="h6 fw-bold mb-3 text-dark pb-2 border-bottom">
                    Tóm Tắt Thanh Toán
                  </h2>

                  <div className="bg-light p-3 rounded-3 mb-3">
                    <h3 className="h6 fw-bold mb-1 text-dark">Horizon Luxury Resort & Spa Da Nang</h3>
                    <div className="text-secondary small mb-1" style={{ fontSize: '12px' }}>
                      Deluxe Ocean View Double Suite (3 đêm)
                    </div>
                    <div className="text-secondary small" style={{ fontSize: '11px' }}>
                      25 Thg 8, 2026 - 28 Thg 8, 2026 (2 Khách)
                    </div>
                  </div>

                  <div className="d-flex justify-content-between small mb-2">
                    <span className="text-secondary">Tiền phòng (3 đêm)</span>
                    <strong className="text-dark">{formatVND(9600000)}</strong>
                  </div>

                  <div className="d-flex justify-content-between small mb-2">
                    <span className="text-secondary">Thuế & Phí dịch vụ (8%)</span>
                    <strong className="text-dark">{formatVND(768000)}</strong>
                  </div>

                  <div className="d-flex justify-content-between small mb-3 text-success">
                    <span>Mã voucher TRAVELOKA300</span>
                    <strong className="fw-bold">-{formatVND(300000)}</strong>
                  </div>

                  <div className="d-flex justify-content-between align-items-center pt-2 border-top mb-3">
                    <div>
                      <span className="fw-bold text-dark fs-6 d-block">Tổng thanh toán</span>
                      <span className="text-success small" style={{ fontSize: '11px' }}>
                        Cam kết không phụ phí ẩn
                      </span>
                    </div>
                    <span className="fw-bold fs-4 text-danger" style={{ color: '#ff5e1f' }}>
                      {formatVND(10068000)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning w-100 fw-bold py-3 text-white rounded-3 shadow d-flex align-items-center justify-content-center gap-2"
                    style={{ backgroundColor: '#ff5e1f', borderColor: '#ff5e1f', fontSize: '16px' }}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Đang kết nối cổng thanh toán...
                      </span>
                    ) : (
                      <>
                        <i className="bi bi-lock-fill"></i>
                        <span>Thanh Toán {formatVND(10068000)}</span>
                      </>
                    )}
                  </button>

                  <div className="text-center mt-2">
                    <span className="text-secondary small d-flex align-items-center justify-content-center gap-1" style={{ fontSize: '11px' }}>
                      <i className="bi bi-shield-check text-success"></i> Giao dịch bảo mật & mã hóa đầu cuối
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
