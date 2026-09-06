import React from 'react';

export const PriceBreakdownCard = ({ bookingDetails, roomPriceTotal, taxesAndFees, totalPrice, formatVND }) => {
  return (
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
  );
};

export default PriceBreakdownCard;
