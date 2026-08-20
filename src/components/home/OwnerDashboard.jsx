import React, { useState } from 'react';

export const OwnerDashboard = ({ onNavigateToManageHotels, onNavigateToCart, onNavigateToProfile }) => {
  const [activeBottomNav, setActiveBottomNav] = useState('explore');

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative pb-2">
      {/* 1. Header */}
      <header className="d-flex align-items-center justify-content-between p-3 px-4 bg-white border-bottom sticky-top">
        <div className="rounded-circle overflow-hidden border" style={{ width: '34px', height: '34px' }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="User avatar"
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <h1 className="h6 fw-bold mb-0 text-primary" style={{ color: '#0062a3', fontSize: '1.2rem', letterSpacing: '-0.2px' }}>
          Azure Horizon
        </h1>

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

      {/* 2. Main Metrics Content */}
      <div className="p-3">
        {/* Metric 1: Total Earnings (MTD) */}
        <div className="card p-3 rounded-4 border-0 shadow-sm mb-3" style={{ backgroundColor: '#f8fafc' }}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div
              className="rounded-3 d-flex align-items-center justify-content-center text-white shadow-sm"
              style={{ width: '38px', height: '38px', backgroundColor: '#0062a3' }}
            >
              <i className="bi bi-wallet2 fs-5"></i>
            </div>
            <span
              className="badge bg-primary-subtle text-primary fw-bold rounded-pill px-2 py-1"
              style={{ fontSize: '11.5px' }}
            >
              <i className="bi bi-arrow-up-short"></i> 12.5%
            </span>
          </div>
          <div className="text-secondary small fw-medium" style={{ fontSize: '12px' }}>
            Total Earnings (MTD)
          </div>
          <div className="h4 fw-bold text-dark mb-0" style={{ fontSize: '1.65rem' }}>
            $24,500
          </div>
        </div>

        {/* Metric 2: Total Bookings */}
        <div className="card p-3 rounded-4 border-0 shadow-sm mb-3" style={{ backgroundColor: '#f8fafc' }}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div
              className="rounded-3 d-flex align-items-center justify-content-center text-white shadow-sm"
              style={{ width: '38px', height: '38px', backgroundColor: '#f59e0b' }}
            >
              <i className="bi bi-calendar-check fs-5"></i>
            </div>
            <span
              className="badge bg-primary-subtle text-primary fw-bold rounded-pill px-2 py-1"
              style={{ fontSize: '11.5px' }}
            >
              <i className="bi bi-arrow-up-short"></i> 8.2%
            </span>
          </div>
          <div className="text-secondary small fw-medium" style={{ fontSize: '12px' }}>
            Total Bookings
          </div>
          <div className="h4 fw-bold text-dark mb-0" style={{ fontSize: '1.65rem' }}>
            142
          </div>
        </div>

        {/* Metric 3: Active Listings */}
        <div className="card p-3 rounded-4 border-0 shadow-sm mb-3" style={{ backgroundColor: '#f8fafc' }}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div
              className="rounded-3 d-flex align-items-center justify-content-center text-white shadow-sm"
              style={{ width: '38px', height: '38px', backgroundColor: '#0ea5e9' }}
            >
              <i className="bi bi-bar-chart fs-5"></i>
            </div>
            <span
              className="badge bg-secondary-subtle text-secondary fw-semibold rounded-pill px-2 py-1"
              style={{ fontSize: '11.5px' }}
            >
              - 0%
            </span>
          </div>
          <div className="text-secondary small fw-medium" style={{ fontSize: '12px' }}>
            Active Listings
          </div>
          <div className="h4 fw-bold text-dark mb-0" style={{ fontSize: '1.65rem' }}>
            8
          </div>
        </div>

        {/* Property Performance Bar Chart Card */}
        <div className="card p-3 rounded-4 border shadow-sm mb-2 bg-white">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="h6 fw-bold text-dark mb-0" style={{ fontSize: '13px' }}>
              Property Performance
            </h2>
            <span
              className="badge bg-light text-secondary border fw-medium px-2 py-1 rounded-2"
              style={{ fontSize: '10.5px' }}
            >
              Last 30 Days
            </span>
          </div>

          {/* SVG Bar Chart */}
          <div className="position-relative pt-2 pb-1">
            <div className="d-flex justify-content-between text-secondary mb-1" style={{ fontSize: '10px' }}>
              <span>$30k</span>
            </div>
            <div className="border-bottom mb-2 opacity-25"></div>

            <div className="d-flex justify-content-between text-secondary mb-1" style={{ fontSize: '10px' }}>
              <span>$15k</span>
            </div>
            <div className="border-bottom mb-2 opacity-25"></div>

            <div className="d-flex justify-content-between text-secondary mb-1" style={{ fontSize: '10px' }}>
              <span>$5k</span>
            </div>
            <div className="border-bottom mb-2 opacity-25"></div>

            {/* Bars visual representation */}
            <div className="d-flex align-items-end justify-content-around pt-2" style={{ height: '90px' }}>
              <div className="d-flex flex-column align-items-center gap-1">
                <div
                  className="rounded-top"
                  style={{ width: '22px', height: '25px', backgroundColor: '#38bdf8' }}
                  title="Tuần 1: $6,500"
                ></div>
                <span className="text-secondary" style={{ fontSize: '9.5px' }}>W1</span>
              </div>

              <div className="d-flex flex-column align-items-center gap-1">
                <div
                  className="rounded-top"
                  style={{ width: '22px', height: '48px', backgroundColor: '#0284c7' }}
                  title="Tuần 2: $14,200"
                ></div>
                <span className="text-secondary" style={{ fontSize: '9.5px' }}>W2</span>
              </div>

              <div className="d-flex flex-column align-items-center gap-1">
                <div
                  className="rounded-top"
                  style={{ width: '22px', height: '78px', backgroundColor: '#0062a3' }}
                  title="Tuần 3: $22,800"
                ></div>
                <span className="text-secondary" style={{ fontSize: '9.5px' }}>W3</span>
              </div>

              <div className="d-flex flex-column align-items-center gap-1">
                <div
                  className="rounded-top"
                  style={{ width: '22px', height: '36px', backgroundColor: '#0ea5e9' }}
                  title="Tuần 4: $10,500"
                ></div>
                <span className="text-secondary" style={{ fontSize: '9.5px' }}>W4</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Navigation */}
      <nav className="bg-white border-top py-2 px-3 d-flex align-items-center justify-content-around sticky-bottom">
        <button
          type="button"
          className="btn btn-warning text-dark fw-bold rounded-3 px-3 py-1.5 d-flex align-items-center gap-1.5 shadow-sm"
          style={{ backgroundColor: '#f59e0b', borderColor: '#f59e0b', fontSize: '12px' }}
          onClick={() => setActiveBottomNav('explore')}
        >
          <i className="bi bi-grid-fill"></i>
          <span>Explore</span>
        </button>

        <button
          type="button"
          className="btn btn-link p-0 text-secondary text-decoration-none d-flex flex-column align-items-center"
          onClick={onNavigateToManageHotels}
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
          className="btn btn-link p-0 text-secondary text-decoration-none d-flex flex-column align-items-center"
          onClick={onNavigateToProfile}
        >
          <i className="bi bi-person fs-5"></i>
          <span style={{ fontSize: '11px' }}>Profile</span>
        </button>
      </nav>
    </div>
  );
};
