import React from 'react';

export const BookingConfirmedModal = ({ show, onReview, onProceedToCheckout }) => {
  if (!show) return null;

  return (
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
              onClick={onReview}
            >
              Xem lại
            </button>
            <button
              type="button"
              className="btn btn-warning flex-grow-1 text-white rounded-pill fw-bold py-2 shadow-sm"
              style={{ backgroundColor: '#ff5e1f', borderColor: '#ff5e1f' }}
              onClick={onProceedToCheckout}
            >
              Thanh toán ngay →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmedModal;
