import React from 'react';

export const GuestInfoCard = ({ guestInfo, onChange }) => {
  return (
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
          onChange={(e) => onChange('fullName', e.target.value)}
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
            onChange={(e) => onChange('email', e.target.value)}
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
            onChange={(e) => onChange('phoneNumber', e.target.value)}
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
          onChange={(e) => onChange('specialRequests', e.target.value)}
        ></textarea>
      </div>

      {/* Checkbox: Save this info */}
      <div className="form-check pt-1">
        <input
          className="form-check-input"
          type="checkbox"
          id="save-info-checkbox"
          checked={guestInfo.saveForFuture}
          onChange={(e) => onChange('saveForFuture', e.target.checked)}
        />
        <label className="form-check-label text-secondary small" htmlFor="save-info-checkbox">
          Lưu thông tin này cho lần đặt phòng tiếp theo trên Traveloka.
        </label>
      </div>
    </div>
  );
};

export default GuestInfoCard;
