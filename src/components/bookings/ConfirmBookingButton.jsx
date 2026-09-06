import React from 'react';

export const ConfirmBookingButton = ({ isSubmitting }) => {
  return (
    <>
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
    </>
  );
};

export default ConfirmBookingButton;
