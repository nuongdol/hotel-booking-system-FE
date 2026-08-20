import React from 'react';
import { AMENITIES_LIST } from './AmenitiesCard.jsx';

export const SuccessModal = ({ show, onClose, data, onReset, onGoToBooking }) => {
  if (!show) return null;

  const selectedAmenityLabels = (data.amenities || []).map(
    (id) => AMENITIES_LIST.find((a) => a.id === id)?.label || id
  );

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered px-3">
        <div className="modal-content rounded-4 border-0 shadow">
          <div className="modal-header border-0 pb-0 pt-4 px-4 text-center d-block position-relative">
            <div
              className="d-inline-flex align-items-center justify-content-center bg-success-subtle text-success rounded-circle mb-3"
              style={{ width: '60px', height: '60px' }}
            >
              <i className="bi bi-check-circle-fill fs-2"></i>
            </div>
            <h5 className="modal-title fw-bold text-dark w-100">Đã lưu thông tin phòng!</h5>
            <p className="text-secondary small mt-1 mb-0">
              Phòng đã được khởi tạo thành công với cấu hình bên dưới.
            </p>
          </div>

          <div className="modal-body px-4 py-3">
            <div className="bg-light p-3 rounded-3 mb-3 small">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Tên phòng:</span>
                <span className="fw-semibold text-dark">{data.name || 'Chưa nhập'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Loại phòng:</span>
                <span className="fw-semibold text-dark">{data.type || 'Chưa chọn'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Khách tối đa:</span>
                <span className="fw-semibold text-dark">{data.guestCount} người</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Diện tích:</span>
                <span className="fw-semibold text-dark">{data.area} m²</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Tiện nghi:</span>
                <span className="fw-semibold text-dark text-end">
                  {selectedAmenityLabels.length > 0
                    ? selectedAmenityLabels.join(', ')
                    : 'Không có'}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-secondary">Hình ảnh đã tải:</span>
                <span className="fw-semibold text-dark">{data.images?.length || 0} ảnh</span>
              </div>
            </div>

            {data.images && data.images.length > 0 && (
              <div className="mb-2">
                <label className="text-secondary small fw-medium mb-1">Ảnh xem trước:</label>
                <div className="d-flex gap-2 overflow-auto pb-1">
                  {data.images.map((img) => (
                    <img
                      key={img.id}
                      src={img.url}
                      alt={img.name}
                      referrerPolicy="no-referrer"
                      className="rounded border"
                      style={{ width: '54px', height: '54px', objectFit: 'cover' }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer border-0 pt-0 px-4 pb-4 flex-column gap-2">
            {onGoToBooking && (
              <button
                type="button"
                className="btn btn-warning w-100 text-white rounded-3 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                style={{ backgroundColor: '#f59e0b', borderColor: '#f59e0b' }}
                onClick={() => {
                  onClose();
                  onGoToBooking();
                }}
              >
                <i className="bi bi-file-earmark-check"></i>
                Xem màn hình Booking Summary
              </button>
            )}
            <div className="d-flex w-100 gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary flex-grow-1 rounded-3 py-2 fw-medium"
                onClick={() => {
                  onReset();
                  onClose();
                }}
              >
                Thêm phòng khác
              </button>
              <button
                type="button"
                className="btn btn-primary flex-grow-1 rounded-3 py-2 fw-medium"
                onClick={onClose}
              >
                Hoàn tất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
