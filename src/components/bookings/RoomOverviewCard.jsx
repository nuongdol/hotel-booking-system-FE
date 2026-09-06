import React from 'react';

export const RoomOverviewCard = ({ bookingDetails }) => {
  return (
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
  );
};

export default RoomOverviewCard;
