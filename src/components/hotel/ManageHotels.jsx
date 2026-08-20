import React, { useState } from 'react';

const MANAGED_HOTELS = [
  {
    id: 'oceanview',
    name: 'Oceanview Resort & Spa',
    location: 'Da Nang, Vietnam',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80',
    status: 'active',
    totalRooms: 124,
    occupancy: '85%',
    statusText: 'Active',
  },
  {
    id: 'metro-inn',
    name: 'Metro Boutique Inn',
    location: 'Ho Chi Minh City, Vietnam',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=700&q=80',
    status: 'pending',
    totalRooms: 45,
    occupancy: null,
    reviewStatus: 'In Progress',
    statusText: 'Pending',
  },
  {
    id: 'highland',
    name: 'Highland Retreat Lodge',
    location: 'Da Lat, Vietnam',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80',
    status: 'active',
    totalRooms: 88,
    occupancy: '92%',
    statusText: 'Active',
  },
];

export const ManageHotels = ({ onAddProperty, onManageRooms, onNavigateToCart, onNavigateToExplore, onEditHotel }) => {
  const [hotels, setHotels] = useState(MANAGED_HOTELS);
  const [activeBottomNav, setActiveBottomNav] = useState('profile');

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative pb-2">
      {/* 1. Header */}
      <header className="d-flex align-items-center justify-content-between p-3 px-4 bg-white border-bottom sticky-top">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-airplane-fill text-primary" style={{ color: '#0062a3' }}></i>
          <h1 className="h6 fw-bold mb-0 text-primary" style={{ color: '#0062a3', fontSize: '1.2rem', letterSpacing: '-0.2px' }}>
            Azure Horizon
          </h1>
        </div>

        <button
          type="button"
          className="btn btn-link text-primary p-0 position-relative text-decoration-none"
          onClick={onNavigateToCart}
          aria-label="Giỏ hàng"
        >
          <i className="bi bi-cart3 fs-5" style={{ color: '#0062a3' }}></i>
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: '9px', padding: '3px 5px' }}
          >
            2
          </span>
        </button>
      </header>

      {/* 2. Main Title Section */}
      <div className="p-3 pb-2">
        <h2 className="h6 fw-bold text-dark mb-0" style={{ fontSize: '1.2rem' }}>
          Quản Lý Khách Sạn
        </h2>
        <p className="text-secondary small mb-3" style={{ fontSize: '12px' }}>
          Overview of all your managed properties.
        </p>

        {/* List of Properties */}
        <div className="d-flex flex-column gap-3">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="card border rounded-4 overflow-hidden shadow-sm">
              {/* Hotel Photo & Status Badge */}
              <div className="position-relative" style={{ height: '145px' }}>
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
                <span
                  className={`badge position-absolute top-0 end-0 m-2.5 px-2.5 py-1 rounded-pill fw-semibold shadow-sm ${
                    hotel.status === 'active'
                      ? 'bg-primary text-white'
                      : 'bg-warning text-dark'
                  }`}
                  style={{
                    fontSize: '11px',
                    backgroundColor: hotel.status === 'active' ? '#0062a3' : '#f59e0b',
                  }}
                >
                  ● {hotel.statusText}
                </span>
              </div>

              {/* Hotel Card Body */}
              <div className="p-3">
                <h3 className="h6 fw-bold text-dark mb-0" style={{ fontSize: '14.5px' }}>
                  {hotel.name}
                </h3>
                <p className="text-secondary small mb-3" style={{ fontSize: '11.5px' }}>
                  <i className="bi bi-geo-alt me-1"></i>
                  {hotel.location}
                </p>

                {/* Stat Row */}
                <div className="row g-2 mb-3 text-secondary small bg-light p-2 rounded-3 border">
                  <div className="col-6">
                    <div style={{ fontSize: '10px' }}>Total Rooms</div>
                    <div className="fw-bold text-dark" style={{ fontSize: '13px' }}>
                      {hotel.totalRooms}
                    </div>
                  </div>
                  <div className="col-6">
                    <div style={{ fontSize: '10px' }}>
                      {hotel.occupancy ? 'Occupancy' : 'Review Status'}
                    </div>
                    <div
                      className={`fw-bold ${hotel.occupancy ? 'text-primary' : 'text-warning'}`}
                      style={{ fontSize: '13px' }}
                    >
                      {hotel.occupancy || hotel.reviewStatus}
                    </div>
                  </div>
                </div>

                {/* Actions: Manage Rooms & Edit */}
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-primary flex-grow-1 py-1.5 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-1.5"
                    style={{
                      backgroundColor: hotel.status === 'active' ? '#0062a3' : '#64748b',
                      borderColor: hotel.status === 'active' ? '#0062a3' : '#64748b',
                      fontSize: '12.5px',
                    }}
                    onClick={() => onManageRooms && onManageRooms(hotel)}
                  >
                    <i className="bi bi-door-open"></i>
                    <span>Manage Rooms</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary px-3 py-1.5 fw-semibold rounded-3"
                    style={{ fontSize: '12.5px' }}
                    onClick={() => onEditHotel && onEditHotel(hotel)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button (FAB) for adding new property */}
      <button
        type="button"
        className="btn btn-primary rounded-circle shadow-lg position-fixed d-flex align-items-center justify-content-center"
        style={{
          width: '46px',
          height: '46px',
          bottom: '72px',
          right: 'calc(50% - 190px)',
          backgroundColor: '#0062a3',
          borderColor: '#0062a3',
          zIndex: 10,
        }}
        onClick={onAddProperty}
        title="Thêm khách sạn mới"
      >
        <i className="bi bi-plus-lg fs-5"></i>
      </button>

      {/* 3. Bottom Navigation */}
      <nav className="bg-white border-top py-2 px-3 d-flex align-items-center justify-content-around sticky-bottom">
        <button
          type="button"
          className="btn btn-link p-0 text-secondary text-decoration-none d-flex flex-column align-items-center"
          onClick={onNavigateToExplore}
        >
          <i className="bi bi-search fs-5"></i>
          <span style={{ fontSize: '11px' }}>Explore</span>
        </button>

        <button
          type="button"
          className="btn btn-link p-0 text-secondary text-decoration-none d-flex flex-column align-items-center"
        >
          <i className="bi bi-building fs-5"></i>
          <span style={{ fontSize: '11px' }}>Bookings</span>
        </button>

        <button
          type="button"
          className="btn btn-link p-0 text-secondary text-decoration-none d-flex flex-column align-items-center"
          onClick={onNavigateToCart}
        >
          <i className="bi bi-bag fs-5"></i>
          <span style={{ fontSize: '11px' }}>Cart</span>
        </button>

        <button
          type="button"
          className="btn btn-warning text-dark fw-bold rounded-3 px-3 py-1.5 d-flex align-items-center gap-1.5 shadow-sm"
          style={{ backgroundColor: '#f59e0b', borderColor: '#f59e0b', fontSize: '12px' }}
          onClick={() => setActiveBottomNav('profile')}
        >
          <i className="bi bi-person-fill"></i>
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
};
