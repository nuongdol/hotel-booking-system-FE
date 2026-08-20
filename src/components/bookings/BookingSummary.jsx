import React, { useState } from 'react';

export const BookingSummary = ({ onBack, onBookingSuccess, onProceedToCheckout, selectedHotel }) => {
  const [guestInfo, setGuestInfo] = useState({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phoneNumber: '+84 123 456 789',
    saveForFuture: true,
  });

  const [bookingDetails, setBookingDetails] = useState({
    hotelName: selectedHotel?.name || 'Horizon Luxury Resort, Da Nang',
    roomName: selectedHotel?.roomName || 'Ocean View Suite',
    roomImage:
      selectedHotel?.image ||
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    checkIn: 'Oct 15, 2023',
    checkOut: 'Oct 22, 2023',
    guests: 2,
    rooms: 1,
    nights: 7,
    pricePerNight: selectedHotel?.price || 3200000,
    taxRate: 0.1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmedModal, setShowConfirmedModal] = useState(false);

  // Calculations
  const roomPriceTotal = bookingDetails.pricePerNight * bookingDetails.nights;
  const taxesAndFees = roomPriceTotal * bookingDetails.taxRate;
  const totalPrice = roomPriceTotal + taxesAndFees;

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VND';
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
      <header className="d-flex align-items-center justify-content-between py-3 px-3 bg-white border-bottom sticky-top">
        <button
          type="button"
          id="btn-booking-back"
          className="btn btn-link text-dark p-1 text-decoration-none d-flex align-items-center justify-content-center"
          onClick={onBack}
          style={{ width: '32px', height: '32px', borderRadius: '50%' }}
          aria-label="Quay lại"
        >
          <i className="bi bi-arrow-left fs-5"></i>
        </button>

        <h1 className="h6 fw-bold mb-0 text-primary" style={{ fontSize: '1.15rem' }}>
          Booking Summary
        </h1>

        <div style={{ width: '32px' }}></div>
      </header>

      {/* Main Booking Content */}
      <form onSubmit={handleSubmit} className="p-3" style={{ backgroundColor: '#f8f9fa' }}>
        {/* Card 1: Guest Information */}
        <div className="card form-card p-3 mb-3">
          <h2 className="h6 fw-bold mb-3 text-dark pb-2 border-bottom">
            Guest Information
          </h2>

          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="guest-fullname" className="form-label text-secondary small mb-1 fw-medium">
              Full Name
            </label>
            <input
              type="text"
              id="guest-fullname"
              className="form-control text-dark fw-medium"
              placeholder="Full Name"
              value={guestInfo.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              required
            />
          </div>

          {/* Email Address */}
          <div className="mb-3">
            <label htmlFor="guest-email" className="form-label text-secondary small mb-1 fw-medium">
              Email Address
            </label>
            <input
              type="email"
              id="guest-email"
              className="form-control text-dark fw-medium"
              placeholder="name@example.com"
              value={guestInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <label htmlFor="guest-phone" className="form-label text-secondary small mb-1 fw-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="guest-phone"
              className="form-control text-dark fw-medium"
              placeholder="+84 ..."
              value={guestInfo.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              required
            />
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
              Save this information for future bookings.
            </label>
          </div>
        </div>

        {/* Card 2: Hotel & Room Info */}
        <div className="card form-card overflow-hidden p-0 mb-3">
          {/* Room Banner Image */}
          <div className="position-relative" style={{ height: '170px' }}>
            <img
              src={bookingDetails.roomImage}
              alt={bookingDetails.roomName}
              referrerPolicy="no-referrer"
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Room Details Body */}
          <div className="p-3">
            <h2 className="h5 fw-bold text-dark mb-1">{bookingDetails.roomName}</h2>
            <p className="text-secondary small d-flex align-items-center mb-3">
              <i className="bi bi-geo-alt me-1 text-secondary"></i>
              {bookingDetails.hotelName}
            </p>

            {/* Check-in / Check-out Row */}
            <div className="row g-2 pt-2 border-top mb-3">
              <div className="col-6">
                <span className="text-secondary" style={{ fontSize: '11.5px' }}>Check-in</span>
                <div className="fw-bold text-dark fs-6 mt-0.5">{bookingDetails.checkIn}</div>
              </div>
              <div className="col-6 text-end">
                <span className="text-secondary" style={{ fontSize: '11.5px' }}>Check-out</span>
                <div className="fw-bold text-dark fs-6 mt-0.5">{bookingDetails.checkOut}</div>
              </div>
            </div>

            {/* Room Features Badges */}
            <div className="d-flex align-items-center gap-3 pt-2 border-top text-secondary small">
              <span className="d-flex align-items-center gap-1">
                <i className="bi bi-person"></i>
                {bookingDetails.guests} Guests
              </span>
              <span className="d-flex align-items-center gap-1">
                <i className="bi bi-door-closed"></i>
                {bookingDetails.rooms} Room
              </span>
              <span className="d-flex align-items-center gap-1">
                <i className="bi bi-moon"></i>
                {bookingDetails.nights} Nights
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Price Breakdown */}
        <div className="card form-card p-3 mb-3">
          <h2 className="h6 fw-bold mb-3 text-dark pb-2 border-bottom">
            Price Breakdown
          </h2>

          <div className="d-flex justify-content-between align-items-start mb-2 small">
            <span className="text-secondary">
              Room Price ({formatVND(bookingDetails.pricePerNight)} x {bookingDetails.nights})
            </span>
            <span className="fw-medium text-dark text-end">
              {formatVND(roomPriceTotal)}
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3 small">
            <span className="text-secondary">Taxes & Fees (10%)</span>
            <span className="fw-medium text-dark">
              {formatVND(taxesAndFees)}
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center pt-2 border-top">
            <span className="fw-bold text-dark fs-6">Total</span>
            <span className="fw-bold text-primary fs-5">
              {formatVND(totalPrice)}
            </span>
          </div>
        </div>

        {/* Action Button & Terms */}
        <div className="pt-1">
          <button
            type="submit"
            id="btn-confirm-booking"
            className="btn btn-warning w-100 text-white fw-bold py-3 shadow-sm rounded-3"
            style={{
              backgroundColor: '#f59e0b',
              borderColor: '#f59e0b',
              fontSize: '16px',
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </span>
            ) : (
              'Confirm Booking'
            )}
          </button>

          <p className="text-center text-secondary mt-3 mb-1" style={{ fontSize: '11px', lineHeight: '1.4' }}>
            By confirming, you agree to our{' '}
            <a href="#terms" className="text-primary text-decoration-none" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" className="text-primary text-decoration-none" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirmedModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered px-3">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-body p-4 text-center">
                <div
                  className="d-inline-flex align-items-center justify-content-center bg-success-subtle text-success rounded-circle mb-3"
                  style={{ width: '64px', height: '64px' }}
                >
                  <i className="bi bi-check-circle-fill fs-1"></i>
                </div>
                <h5 className="fw-bold text-dark mb-1">Booking Confirmed!</h5>
                <p className="text-secondary small mb-3">
                  Cảm ơn <strong>{guestInfo.fullName}</strong>! Mã đặt phòng của bạn đã được gửi tới{' '}
                  <strong>{guestInfo.email}</strong>.
                </p>

                <div className="bg-light p-3 rounded-3 text-start small mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-secondary">Khách sạn:</span>
                    <span className="fw-semibold text-dark">{bookingDetails.hotelName}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-secondary">Loại phòng:</span>
                    <span className="fw-semibold text-dark">{bookingDetails.roomName}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-secondary">Thời gian:</span>
                    <span className="fw-semibold text-dark">
                      {bookingDetails.checkIn} – {bookingDetails.checkOut} ({bookingDetails.nights} đêm)
                    </span>
                  </div>
                  <div className="d-flex justify-content-between pt-1 border-top">
                    <span className="text-secondary">Tổng thanh toán:</span>
                    <span className="fw-bold text-primary">{formatVND(totalPrice)}</span>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2">
                  {onProceedToCheckout && (
                    <button
                      type="button"
                      className="btn btn-primary w-100 py-2.5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                      style={{ backgroundColor: '#0062a3', borderColor: '#0062a3' }}
                      onClick={() => {
                        setShowConfirmedModal(false);
                        onProceedToCheckout();
                      }}
                    >
                      <i className="bi bi-credit-card"></i>
                      Tiến hành Thanh toán (Checkout)
                    </button>
                  )}
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary flex-grow-1 py-2 rounded-3 fw-medium"
                      onClick={() => setShowConfirmedModal(false)}
                    >
                      Đóng
                    </button>
                    <button
                      type="button"
                      className="btn btn-light border flex-grow-1 py-2 rounded-3 fw-medium"
                      onClick={() => {
                        setShowConfirmedModal(false);
                        if (onBack) onBack();
                      }}
                    >
                      Về danh sách
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
