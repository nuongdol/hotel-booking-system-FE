import React, { useState } from 'react';

const INITIAL_CART_ITEMS = [
  {
    id: 'cart-1',
    name: 'Grand Azure Resort & Spa',
    location: 'Coastal Riviera, Block A',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80',
    dates: 'Oct 12 - Oct 15',
    nights: 3,
    guests: '2 Adults',
    roomType: '1 Deluxe Ocean View',
    pricePerNight: 250,
  },
  {
    id: 'cart-2',
    name: 'Horizon City Downtown Suites',
    location: 'Metropolis Center District',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=700&q=80',
    dates: 'Nov 02 - Nov 04',
    nights: 2,
    guests: '1 Adult',
    roomType: '1 Standard Studio',
    pricePerNight: 180,
  },
];

export const CartScreen = ({ onProceedToCheckout, onNavigateToExplore, onNavigateToBookings, onNavigateToProfile }) => {
  const [items, setItems] = useState(INITIAL_CART_ITEMS);
  const [activeBottomNav, setActiveBottomNav] = useState('cart');

  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + item.pricePerNight * item.nights, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative pb-2">
      {/* 1. Top Header */}
      <header className="d-flex align-items-center justify-content-between p-3 px-4 bg-white border-bottom sticky-top">
        <button
          type="button"
          className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center border"
          style={{ width: '32px', height: '32px' }}
          onClick={onNavigateToProfile}
          aria-label="Tài khoản"
        >
          <i className="bi bi-person text-secondary"></i>
        </button>

        <h1 className="h6 fw-bold mb-0 text-primary" style={{ color: '#0062a3', fontSize: '1.2rem', letterSpacing: '-0.2px' }}>
          Azure Horizon
        </h1>

        <div className="position-relative text-primary">
          <i className="bi bi-cart3 fs-5" style={{ color: '#0062a3' }}></i>
          {items.length > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: '9px', padding: '3px 5px' }}
            >
              {items.length}
            </span>
          )}
        </div>
      </header>

      {/* 2. Main Cart Content */}
      <div className="p-3">
        <h2 className="h6 fw-bold text-dark mb-0" style={{ fontSize: '1.2rem' }}>
          Giỏ hàng của bạn
        </h2>
        <p className="text-secondary small mb-3" style={{ fontSize: '12px' }}>
          You have {items.length} items in your cart
        </p>

        {items.length === 0 ? (
          <div className="text-center py-5 bg-light rounded-4 border mb-3">
            <i className="bi bi-cart-x fs-1 text-secondary mb-2 d-block"></i>
            <h6 className="fw-bold text-dark">Giỏ hàng đang trống</h6>
            <p className="text-secondary small mb-3">Hãy khám phá các khách sạn tuyệt vời và thêm vào giỏ hàng.</p>
            <button
              type="button"
              className="btn btn-primary btn-sm rounded-pill px-4 fw-bold"
              style={{ backgroundColor: '#0062a3' }}
              onClick={onNavigateToExplore}
            >
              Khám phá ngay
            </button>
          </div>
        ) : (
          <>
            {/* List of Cart Items */}
            <div className="d-flex flex-column gap-3 mb-3">
              {items.map((item) => {
                const itemTotal = item.pricePerNight * item.nights;
                return (
                  <div key={item.id} className="card border rounded-4 overflow-hidden shadow-sm">
                    {/* Hotel Image */}
                    <div style={{ height: '140px' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    {/* Hotel Details */}
                    <div className="p-3">
                      <h3 className="h6 fw-bold text-dark mb-0" style={{ fontSize: '14.5px' }}>
                        {item.name}
                      </h3>
                      <p className="text-secondary small mb-2" style={{ fontSize: '11.5px' }}>
                        <i className="bi bi-geo-alt me-1"></i>
                        {item.location}
                      </p>

                      {/* Dates & Guests Box */}
                      <div className="bg-light p-2.5 rounded-3 border mb-3 small text-secondary">
                        <div className="row g-1">
                          <div className="col-6">
                            <div style={{ fontSize: '10px' }}>Dates</div>
                            <div className="fw-semibold text-dark" style={{ fontSize: '11.5px' }}>
                              {item.dates}
                            </div>
                            <div className="text-muted" style={{ fontSize: '10px' }}>
                              {item.nights} Nights
                            </div>
                          </div>
                          <div className="col-6">
                            <div style={{ fontSize: '10px' }}>Guests</div>
                            <div className="fw-semibold text-dark" style={{ fontSize: '11.5px' }}>
                              {item.guests}
                            </div>
                            <div className="text-muted" style={{ fontSize: '10px' }}>
                              {item.roomType}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Remove & Price Row */}
                      <div className="d-flex align-items-center justify-content-between pt-1">
                        <button
                          type="button"
                          className="btn btn-link text-danger p-0 small text-decoration-none d-flex align-items-center gap-1 fw-medium"
                          style={{ fontSize: '12px' }}
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <i className="bi bi-trash3"></i>
                          <span>Remove</span>
                        </button>

                        <div className="text-end">
                          <span className="text-secondary small me-1" style={{ fontSize: '11px' }}>
                            Price per night
                          </span>
                          <span className="fw-bold text-primary" style={{ fontSize: '14px', color: '#0062a3' }}>
                            ${item.pricePerNight}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Box */}
            <div className="card p-3 rounded-4 border shadow-sm mb-3 bg-white">
              <h3 className="h6 fw-bold text-dark mb-2.5" style={{ fontSize: '14px' }}>
                Summary
              </h3>

              <div className="text-secondary small">
                {items.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between py-1">
                    <span className="text-truncate me-2">
                      {item.name.split(' ')[0]} {item.name.split(' ')[1]} ({item.nights} Nights)
                    </span>
                    <span className="text-dark fw-medium flex-shrink-0">
                      ${item.pricePerNight * item.nights}
                    </span>
                  </div>
                ))}

                <div className="d-flex justify-content-between py-1 border-top mt-1">
                  <span>Subtotal</span>
                  <span className="text-dark fw-semibold">${subtotal.toLocaleString()}</span>
                </div>

                <div className="d-flex justify-content-between py-1">
                  <span>Taxes & Fees (10%)</span>
                  <span className="text-dark fw-semibold">${tax.toLocaleString()}</span>
                </div>

                <div className="d-flex justify-content-between align-items-center pt-2 mt-2 border-top">
                  <span className="fw-bold text-dark" style={{ fontSize: '14.5px' }}>
                    Total
                  </span>
                  <span className="fw-bold text-primary fs-5" style={{ color: '#0062a3' }}>
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                type="button"
                className="btn btn-warning w-100 py-2.5 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 mt-3 text-dark"
                style={{ backgroundColor: '#f59e0b', borderColor: '#f59e0b', fontSize: '14px' }}
                onClick={onProceedToCheckout}
              >
                <span>Proceed to Checkout</span>
                <i className="bi bi-chevron-right"></i>
              </button>

              <div className="text-center mt-2 text-secondary d-flex align-items-center justify-content-center gap-1" style={{ fontSize: '11px' }}>
                <i className="bi bi-shield-lock"></i>
                <span>Secure transaction</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 3. Bottom Navigation */}
      <nav className="bg-white border-top py-2 px-3 d-flex align-items-center justify-content-around sticky-bottom">
        <button
          type="button"
          className="btn btn-link p-0 text-secondary text-decoration-none d-flex flex-column align-items-center"
          onClick={onNavigateToExplore}
        >
          <i className="bi bi-search fs-5"></i>
          <span style={{ fontSize: '10px' }}>EXPLORE</span>
        </button>

        <button
          type="button"
          className="btn btn-link p-0 text-secondary text-decoration-none d-flex flex-column align-items-center"
          onClick={onNavigateToBookings}
        >
          <i className="bi bi-calendar2-check fs-5"></i>
          <span style={{ fontSize: '10px' }}>BOOKINGS</span>
        </button>

        <button
          type="button"
          className="btn btn-warning text-dark fw-bold rounded-3 px-3 py-1.5 d-flex align-items-center gap-1.5 shadow-sm"
          style={{ backgroundColor: '#f59e0b', borderColor: '#f59e0b', fontSize: '11px' }}
          onClick={() => setActiveBottomNav('cart')}
        >
          <i className="bi bi-cart-fill"></i>
          <span>CART</span>
        </button>

        <button
          type="button"
          className="btn btn-link p-0 text-secondary text-decoration-none d-flex flex-column align-items-center"
          onClick={onNavigateToProfile}
        >
          <i className="bi bi-person fs-5"></i>
          <span style={{ fontSize: '10px' }}>PROFILE</span>
        </button>
      </nav>
    </div>
  );
};
