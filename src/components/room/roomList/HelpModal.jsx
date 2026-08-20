import React from 'react';

export const HelpModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered px-3">
        <div className="modal-content rounded-4 border-0 shadow">
          <div className="modal-header border-bottom py-3 px-4">
            <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
              <i className="bi bi-info-circle text-primary"></i>
              Hướng Dẫn Thêm Phòng
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body px-4 py-3">
            <div className="mb-3">
              <h6 className="fw-bold text-dark mb-1">1. Thông tin cơ bản</h6>
              <p className="text-secondary small mb-0">
                Nhập tên phòng rõ ràng, chọn phân hạng phòng phù hợp (Standard, Deluxe, Suite) và nhập số khách tối đa cùng diện tích phòng (m²).
              </p>
            </div>
            <div className="mb-3">
              <h6 className="fw-bold text-dark mb-1">2. Tiện nghi phòng</h6>
              <p className="text-secondary small mb-0">
                Nhấn vào các ô tiện nghi để bật/tắt (Wi-Fi, Máy lạnh, Bữa sáng, TV, Ban công). Ô được chọn sẽ có viền xanh nổi bật.
              </p>
            </div>
            <div className="mb-3">
              <h6 className="fw-bold text-dark mb-1">3. Hình ảnh phòng</h6>
              <p className="text-secondary small mb-0">
                Tải lên tối đa 5 hình ảnh chất lượng cao (JPG, PNG dung lượng dưới 5MB) để tăng tỷ lệ đặt phòng.
              </p>
            </div>
          </div>
          <div className="modal-footer border-0 pt-0 px-4 pb-4">
            <button type="button" className="btn btn-primary w-100 rounded-3 py-2 fw-medium" onClick={onClose}>
              Đã hiểu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
