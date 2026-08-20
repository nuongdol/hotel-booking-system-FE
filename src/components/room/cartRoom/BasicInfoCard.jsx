import React from 'react';

export const BasicInfoCard = ({ roomData, onChange }) => {
  return (
    <div className="card form-card p-3 mb-3">
      <h2 className="h6 fw-bold mb-3 text-dark">Thông tin cơ bản</h2>

      {/* Tên phòng */}
      <div className="mb-3">
        <label htmlFor="room-name" className="form-label fw-medium text-dark small mb-1">
          Tên phòng
        </label>
        <input
          type="text"
          id="room-name"
          className="form-control"
          placeholder="VD: Deluxe Double Room"
          value={roomData.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>

      {/* Loại phòng */}
      <div className="mb-3">
        <label htmlFor="room-type" className="form-label fw-medium text-dark small mb-1">
          Loại phòng
        </label>
        <select
          id="room-type"
          className="form-select text-dark"
          value={roomData.type}
          onChange={(e) => onChange('type', e.target.value)}
        >
          <option value="" disabled>
            Chọn loại phòng
          </option>
          <option value="Standard">Phòng Tiêu Chuẩn (Standard)</option>
          <option value="Superior">Phòng Cao Cấp (Superior)</option>
          <option value="Deluxe">Phòng Deluxe (Deluxe Double/Twin)</option>
          <option value="Suite">Phòng Suite (Executive Suite)</option>
          <option value="Family">Phòng Gia Đình (Family Suite)</option>
          <option value="VIP">Phòng VIP / Presidential</option>
        </select>
      </div>

      {/* Row: Số lượng khách & Diện tích phòng */}
      <div className="row g-2">
        {/* Số lượng khách */}
        <div className="col-6">
          <label htmlFor="guest-count" className="form-label fw-medium text-dark small mb-1">
            Số lượng khách
          </label>
          <div className="input-group custom-input-group">
            <span className="input-group-text bg-white pe-1 text-secondary">
              <i className="bi bi-person fs-6"></i>
            </span>
            <input
              type="number"
              id="guest-count"
              className="form-control ps-1"
              min="1"
              max="50"
              placeholder="2"
              value={roomData.guestCount}
              onChange={(e) => onChange('guestCount', e.target.value)}
            />
          </div>
        </div>

        {/* Diện tích phòng (m²) */}
        <div className="col-6">
          <label htmlFor="room-area" className="form-label fw-medium text-dark small mb-1">
            Diện tích phòng (m²)
          </label>
          <div className="input-group custom-input-group">
            <span className="input-group-text bg-white pe-1 text-secondary">
              <i className="bi bi-triangle fs-6"></i>
            </span>
            <input
              type="number"
              id="room-area"
              className="form-control ps-1"
              min="1"
              max="1000"
              placeholder="25"
              value={roomData.area}
              onChange={(e) => onChange('area', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
