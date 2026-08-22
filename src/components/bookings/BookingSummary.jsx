import React, { useState } from 'react';

export const BookingSummary = ({ onBack, onBookingSuccess, onProceedToCheckout, selectedHotel }) => {
  const [guestInfo, setGuestInfo] = useState({
    fullName: 'Nguyễn Văn An',
    email: 'vanan.nguyen@example.com',
    phoneNumber: '0901234567',
    isGuestForSelf: true,
    specialRequests: 'Nhận phòng tầng cao, giường lớn.',
    saveForFuture: true,
  });

  const [bookingDetails, setBookingDetails] = useState({
    hotelName: selectedHotel?.name || 'Horizon Luxury Resort & Spa Da Nang',
    roomName: selectedHotel?.roomName || 'Deluxe Ocean View Double Suite',
    roomImage:
      selectedHotel?.image ||
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    checkIn: '25 Thg 8, 2026 (14:00)',
    checkOut: '28 Thg 8, 2026 (12:00)',
    guests: 2,
    rooms: 1,
    nights: 3,
    pricePerNight: selectedHotel?.price || 3200000,
    taxRate: 0.08,
    discountAmount: 300000,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmedModal, setShowConfirmedModal] = useState(false);

  // Calculations
  const roomPriceTotal = bookingDetails.pricePerNight * bookingDetails.nights;
  const taxesAndFees = Math.round(roomPriceTotal * bookingDetails.taxRate);
  const totalPrice = roomPriceTotal + taxesAndFees - bookingDetails.discountAmount;

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  const handleInputChange = (field, value) => {
    setGuestInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmedModal(true);
      if (onBookingSuccess) {
        onBookingSuccess({ guestInfo, bookingDetails, totalPrice });
      }
    }, 600);
  };

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative">
      {/* 1. Header */}
      <header className="d-flex align-items-center justify-content-between py-3 px-4 bg-white border-bottom sticky-top">
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            id="btn-booking-back"
            className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center border"
            onClick={onBack}
            style={{ width: '36px', height: '36px' }}
            aria-label="Quay lại"
          >
            <i className="bi bi-arrow-left fs-5"></i>
          </button>
          <div>
            <h1 className="h6 fw-bold mb-0 text-dark" style={{ fontSize: '1.2rem' }}>
              Xác Nhận Đặt Phòng
            </h1>
            <span className="text-secondary small" style={{ fontSize: '11.5px' }}>
              Vui lòng kiểm tra lại thông tin khách lưu trú và chi tiết đặt phòng
            </span>
          </div>
        </div>

        <span className="badge bg-success-subtle text-success fw-bold px-3 py-1.5 rounded-pill d-none d-sm-inline">
          <i className="bi bi-shield-check me-1"></i> Đặt phòng được đảm bảo 100%
        </span>
      </header>

      {/* Main Booking Content */}
      <form onSubmit={handleSubmit} className="p-3 p-md-4 bg-light">
        <div className="row g-3 g-lg-4">
          {/* LEFT COLUMN: GUEST INFORMATION & SPECIAL REQUESTS */}
          <div className="col-12 col-lg-7">
            {/* Card 1: Guest Information */}
            <div className="card rounded-3 border bg-white p-3 p-md-4 shadow-sm mb-3">
              <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                <h2 className="h6 fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                  <i className="bi bi-person-lines-fill text-primary"></i>
                  Thông Tin Người Đặt Phòng
                </h2>
                <span className="badge bg-primary text-white small">Bước 1/2</span>
              </div>

              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="guest-fullname" className="form-label text-secondary small mb-1 fw-bold">
                  Họ và tên (như trên CCCD/Hộ chiếu) *
                </label>
                <input
                  type="text"
                  id="guest-fullname"
                  className="form-control text-dark fw-semibold"
                  placeholder="Ví dụ: NGUYEN VAN AN"
                  value={guestInfo.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
              </div>

              <div className="row g-2 mb-3">
                {/* Email Address */}
                <div className="col-12 col-sm-6">
                  <label htmlFor="guest-email" className="form-label text-secondary small mb-1 fw-bold">
                    Địa chỉ Email nhận xác nhận *
                  </label>
                  <input
                    type="email"
                    id="guest-email"
                    className="form-control text-dark fw-semibold"
                    placeholder="email@example.com"
                    value={guestInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="col-12 col-sm-6">
                  <label htmlFor="guest-phone" className="form-label text-secondary small mb-1 fw-bold">
                    Số điện thoại liên hệ *
                  </label>
                  <input
                    type="tel"
                    id="guest-phone"
                    className="form-control text-dark fw-semibold"
                    placeholder="090 123 4567"
                    value={guestInfo.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div className="mb-3">
                <label className="form-label text-secondary small mb-1 fw-bold">
                  Yêu cầu đặc biệt (Không bắt buộc)
                </label>
                <textarea
                  className="form-control small"
                  rows={2}
                  placeholder="Ví dụ: Nhận phòng sớm, phòng không hút thuốc, giường đôi lớn..."
                  value={guestInfo.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                ></textarea>
              </div>

              {/* Checkbox: Save this info */}
              <div className="form-check pt-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="save-info-checkbox"
                  checked={guestInfo.saveForFuture}
                  onChange={(e) => handleInputChange('saveForFuture', e.target.checked)}
                />
                <label className="form-check-label text-secondary small" htmlFor="save-info-checkbox">
                  Lưu thông tin này cho lần đặt phòng tiếp theo trên Traveloka.
                </label>
              </div>
            </div>

            {/* Traveloka Protection Card */}
            <div className="card rounded-3 border bg-primary-subtle text-primary p-3 shadow-sm">
              <div className="d-flex align-items-center gap-2 mb-1">
                <i className="bi bi-shield-check fs-4"></i>
                <h3 className="h6 fw-bold mb-0">Bảo hiểm chuyến đi Traveloka Protect</h3>
              </div>
              <p className="small text-secondary mb-0" style={{ fontSize: '12px' }}>
                Bảo vệ toàn diện trước sự cố hủy chuyến, trễ chuyến, y tế khẩn cấp và thất lạc hành lý trong suốt kỳ nghỉ của bạn.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: ROOM OVERVIEW & PRICE BREAKDOWN */}
          <div className="col-12 col-lg-5">
            {/* Card 2: Hotel & Room Info */}
            <div className="card rounded-3 border bg-white overflow-hidden shadow-sm mb-3">
              {/* Room Banner Image */}
              <div className="position-relative" style={{ height: '160px' }}>
                <img
                  src={bookingDetails.roomImage}
                  alt={bookingDetails.roomName}
                  className="w-100 h-100 object-fit-cover"
                />
                <span
                  className="badge position-absolute top-0 start-0 m-2 rounded-pill text-white"
                  style={{ backgroundColor: '#ff5e1f', fontSize: '10px' }}
                >
                  Xác nhận tức thì
                </span>
              </div>

              {/* Room Details Body */}
              <div className="p-3">
                <span className="badge bg-light text-secondary mb-1" style={{ fontSize: '10px' }}>Khách sạn 5 sao</span>
                <h2 className="h6 fw-bold text-dark mb-1">{bookingDetails.hotelName}</h2>
                <p className="text-primary small fw-semibold mb-2">
                  <i className="bi bi-door-open me-1"></i>
                  {bookingDetails.roomName}
                </p>

                {/* Check-in / Check-out Row */}
                <div className="row g-2 pt-2 border-top mb-2 bg-light p-2 rounded-3">
                  <div className="col-6">
                    <span className="text-secondary small d-block" style={{ fontSize: '11px' }}>Nhận phòng</span>
                    <strong className="text-dark small">{bookingDetails.checkIn}</strong>
                  </div>
                  <div className="col-6 text-end">
                    <span className="text-secondary small d-block" style={{ fontSize: '11px' }}>Trả phòng</span>
                    <strong className="text-dark small">{bookingDetails.checkOut}</strong>
                  </div>
                </div>

                {/* Room Features Badges */}
                <div className="d-flex align-items-center justify-content-between pt-2 border-top text-secondary small" style={{ fontSize: '12px' }}>
                  <span><i className="bi bi-people me-1"></i> {bookingDetails.guests} Khách</span>
                  <span><i className="bi bi-door-closed me-1"></i> {bookingDetails.rooms} Phòng</span>
                  <span><i className="bi bi-moon me-1"></i> {bookingDetails.nights} Đêm</span>
                </div>
              </div>
            </div>

            {/* Card 3: Price Breakdown */}
            <div className="card rounded-3 border bg-white p-3 shadow-sm mb-3">
              <h2 className="h6 fw-bold mb-3 text-dark pb-2 border-bottom d-flex justify-content-between">
                <span>Chi Tiết Giá</span>
                <span className="text-secondary small fw-normal">Đã áp dụng mã giảm giá</span>
              </h2>

              <div className="d-flex justify-content-between align-items-start mb-2 small">
                <span className="text-secondary">
                  Giá phòng ({formatVND(bookingDetails.pricePerNight)} x {bookingDetails.nights} đêm)
                </span>
                <span className="fw-semibold text-dark">
                  {formatVND(roomPriceTotal)}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2 small">
                <span className="text-secondary">Thuế & Phí dịch vụ (8%)</span>
                <span className="fw-semibold text-dark">
                  {formatVND(taxesAndFees)}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3 small text-success">
                <span>
                  <i className="bi bi-ticket-perforated me-1"></i> Mã voucher TRAVELOKA300
                </span>
                <span className="fw-bold">
                  -{formatVND(bookingDetails.discountAmount)}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                <div>
                  <span className="fw-bold text-dark fs-6 d-block">Tổng tiền thanh toán</span>
                  <span className="text-success small" style={{ fontSize: '11px' }}>
                    <i className="bi bi-check2"></i> Đã bao gồm thuế GTGT
                  </span>
                </div>
                <span className="fw-bold fs-5 text-danger" style={{ color: '#ff5e1f' }}>
                  {formatVND(totalPrice)}
                </span>
              </div>
            </div>

            {/* Action Button & Terms */}
            <button
              type="submit"
              id="btn-confirm-booking"
              className="btn btn-warning w-100 text-white fw-bold py-3 shadow rounded-3 d-flex align-items-center justify-content-center gap-2"
              style={{
                backgroundColor: '#ff5e1f',
                borderColor: '#ff5e1f',
                fontSize: '16px',
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Đang xử lý đặt phòng...
                </span>
              ) : (
                <>
                  <span>Tiếp Tục Thanh Toán</span>
                  <i className="bi bi-arrow-right fs-5"></i>
                </>
              )}
            </button>

            <p className="text-center text-secondary mt-2 mb-0" style={{ fontSize: '11px' }}>
              Bằng việc nhấn Tiếp tục, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật của Traveloka.
            </p>
          </div>
        </div>
      </form>

      {/* Confirmation Success Modal */}
      {showConfirmedModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered px-3">
            <div className="modal-content rounded-4 border-0 shadow-lg text-center p-4">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white"
                style={{ width: '64px', height: '64px', backgroundColor: '#00b14f' }}
              >
                <i className="bi bi-check-lg fs-1"></i>
              </div>
              <h3 className="h5 fw-bold mb-1">Xác Nhận Đặt Phòng Thành Công!</h3>
              <p className="text-secondary small mb-3">
                Mã đặt chỗ của bạn là <strong className="text-primary">#TVLK-89421</strong>. Vui lòng tiến hành chọn phương thức thanh toán an toàn.
              </p>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary flex-grow-1 rounded-pill fw-semibold py-2"
                  onClick={() => setShowConfirmedModal(false)}
                >
                  Xem lại
                </button>
                <button
                  type="button"
                  className="btn btn-warning flex-grow-1 text-white rounded-pill fw-bold py-2 shadow-sm"
                  style={{ backgroundColor: '#ff5e1f', borderColor: '#ff5e1f' }}
                  onClick={() => {
                    setShowConfirmedModal(false);
                    if (onProceedToCheckout) onProceedToCheckout();
                  }}
                >
                  Thanh toán ngay →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
