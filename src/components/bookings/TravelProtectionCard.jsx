import React from 'react';

export const TravelProtectionCard = () => {
  return (
    <div className="card rounded-3 border bg-primary-subtle text-primary p-3 shadow-sm">
      <div className="d-flex align-items-center gap-2 mb-1">
        <i className="bi bi-shield-check fs-4"></i>
        <h3 className="h6 fw-bold mb-0">Bảo hiểm chuyến đi Traveloka Protect</h3>
      </div>
      <p className="small text-secondary mb-0" style={{ fontSize: '12px' }}>
        Bảo vệ toàn diện trước sự cố hủy chuyến, trễ chuyến, y tế khẩn cấp và thất lạc hành lý trong suốt kỳ nghỉ của bạn.
      </p>
    </div>
  );
};

export default TravelProtectionCard;
