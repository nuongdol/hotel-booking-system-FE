import React, { useState } from 'react';

const INITIAL_HOTELS = [
  {
    id: 'horizon',
    name: 'Horizon Luxury Resort',
    roomName: 'Ocean View Suite',
    location: 'My Khe Beach, Da Nang',
    rating: 4.8,
    reviewsCount: 245,
    price: 3200000,
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    tag: 'Popular',
    amenities: ['wifi', 'ac', 'breakfast', 'balcony'],
  },
  {
    id: 'azure',
    name: 'Azure Sky Hotel',
    roomName: 'Executive City View Room',
    location: 'City Center, Da Nang',
    rating: 4.5,
    reviewsCount: 189,
    price: 2500000,
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    tag: 'Best Deal',
    amenities: ['wifi', 'ac', 'tv'],
  },
  {
    id: 'zenith',
    name: 'Zenith Spa Retreat',
    roomName: 'Garden Private Villa',
    location: 'Son Tra Peninsula',
    rating: 4.9,
    reviewsCount: 312,
    price: 5100000,
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    tag: 'Luxury',
    amenities: ['wifi', 'ac', 'breakfast', 'tv', 'balcony'],
  },
];

export const HotelList = ({ onSelectHotel, onAddNewRoom, onOpenAuth }) => {
  const [hotels, setHotels] = useState(INITIAL_HOTELS);
  const [favorites, setFavorites] = useState(['horizon']);
  const [activeBottomNav, setActiveBottomNav] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [priceSort, setPriceSort] = useState('all'); // 'all' | 'low' | 'high'

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VND';
  };

  const filteredHotels = hotels
    .filter((h) =>
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (priceSort === 'low') return a.price - b.price;
      if (priceSort === 'high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative">
      {/* 1. Header with Brand & Profile */}
      <header className="p-3 bg-white border-bottom">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center text-primary"
              style={{ fontSize: '1.4rem' }}
            >
              <i className="bi bi-compass"></i>
            </div>
            <h1 className="h6 fw-bold mb-0 text-primary" style={{ fontSize: '1.15rem', letterSpacing: '-0.2px' }}>
              Voyage Elite
            </h1>
          </div>

          <button
            type="button"
            className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center border"
            style={{ width: '34px', height: '34px' }}
            title="Đăng nhập / Tài khoản"
            onClick={onOpenAuth || (() => setActiveBottomNav('profile'))}
          >
            <i className="bi bi-person text-secondary"></i>
          </button>
        </div>

        {/* Date & Guests bar */}
        <div className="bg-light rounded-3 p-2 px-3 mb-2 d-flex align-items-center justify-content-between text-secondary small">
          <div className="d-flex align-items-center gap-2 text-truncate">
            <span>
              <i className="bi bi-calendar3 me-1 text-dark"></i>
              <strong className="text-dark">Oct 15 - Oct 22</strong>
            </span>
            <span className="text-muted">|</span>
            <span>
              <i className="bi bi-people me-1 text-dark"></i>
              <strong className="text-dark">2 Guests, 1 Room</strong>
            </span>
          </div>
        </div>

        {/* Filters button */}
        <div className="d-flex gap-2">
          <button
            type="button"
            id="btn-open-filters"
            className="btn btn-outline-primary w-100 py-1.5 small fw-semibold d-flex align-items-center justify-content-center gap-2 rounded-3"
            style={{ borderColor: '#0088ff' }}
            onClick={() => setShowFilterModal(true)}
          >
            <i className="bi bi-sliders"></i>
            Filters
          </button>
        </div>
      </header>

      {/* 2. Hotel List Content */}
      <div className="p-3" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="d-flex flex-column gap-3">
          {filteredHotels.map((hotel) => {
            const isFav = favorites.includes(hotel.id);

            return (
              <div
                key={hotel.id}
                className="card form-card overflow-hidden border-0 shadow-sm rounded-3"
                style={{ transition: 'transform 0.15s ease' }}
              >
                {/* Hotel Image Container */}
                <div className="position-relative" style={{ height: '185px' }}>
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    referrerPolicy="no-referrer"
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />

                  {/* Heart Favorite Button */}
                  <button
                    type="button"
                    className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2 p-0 d-flex align-items-center justify-content-center shadow-sm"
                    style={{ width: '32px', height: '32px', backgroundColor: 'rgba(255, 255, 255, 0.85)' }}
                    onClick={(e) => toggleFavorite(hotel.id, e)}
                    aria-label="Yêu thích"
                  >
                    <i
                      className={`bi ${
                        isFav ? 'bi-heart-fill text-danger' : 'bi-heart text-secondary'
                      }`}
                      style={{ fontSize: '14px' }}
                    ></i>
                  </button>
                </div>

                {/* Hotel Details Body */}
                <div className="p-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h2 className="h6 fw-bold text-dark mb-0">{hotel.name}</h2>
                    <span className="badge bg-warning-subtle text-dark fw-bold border border-warning-subtle d-flex align-items-center gap-1 px-1.5 py-1">
                      <i className="bi bi-star-fill text-warning" style={{ fontSize: '11px' }}></i>
                      {hotel.rating}
                    </span>
                  </div>

                  <p className="text-secondary small d-flex align-items-center mb-3">
                    <i className="bi bi-geo-alt me-1 text-secondary"></i>
                    {hotel.location}
                  </p>

                  <div className="d-flex align-items-end justify-content-between pt-2 border-top">
                    <div>
                      <span className="text-secondary d-block" style={{ fontSize: '11px' }}>
                        Starting from
                      </span>
                      <div className="fw-bold text-primary fs-6">
                        {formatVND(hotel.price)}
                      </div>
                      <span className="text-secondary" style={{ fontSize: '11px' }}>
                        / night
                      </span>
                    </div>

                    <button
                      type="button"
                      id={`btn-book-${hotel.id}`}
                      className="btn btn-warning text-white fw-bold px-3 py-2 rounded-3 shadow-sm"
                      style={{
                        backgroundColor: '#f59e0b',
                        borderColor: '#f59e0b',
                        fontSize: '13.5px',
                      }}
                      onClick={() => onSelectHotel(hotel)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Add Room Banner */}
        <div className="mt-3 p-3 bg-white rounded-3 border text-center">
          <p className="small text-secondary mb-2">Bạn là chủ khách sạn hoặc homestay?</p>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm rounded-3 fw-medium w-100"
            onClick={onAddNewRoom}
          >
            <i className="bi bi-plus-circle me-1"></i>
            Thêm phòng mới vào hệ thống
          </button>
        </div>
      </div>

      {/* 3. Bottom Navigation Bar */}
      <nav className="bg-white border-top py-2 px-3 d-flex align-items-center justify-content-around sticky-bottom">
        <button
          type="button"
          className={`btn btn-link p-0 text-decoration-none d-flex flex-column align-items-center ${
            activeBottomNav === 'home' ? 'text-primary' : 'text-secondary'
          }`}
          onClick={() => setActiveBottomNav('home')}
        >
          <i className="bi bi-house-door fs-5"></i>
          <span style={{ fontSize: '11px', fontWeight: activeBottomNav === 'home' ? '600' : '400' }}>
            Home
          </span>
        </button>

        <button
          type="button"
          className={`btn btn-link p-0 text-decoration-none d-flex flex-column align-items-center ${
            activeBottomNav === 'explore' ? 'text-primary' : 'text-secondary'
          }`}
          onClick={() => setActiveBottomNav('explore')}
        >
          <i className="bi bi-compass fs-5"></i>
          <span style={{ fontSize: '11px', fontWeight: activeBottomNav === 'explore' ? '600' : '400' }}>
            Explore
          </span>
        </button>

        <button
          type="button"
          className={`btn btn-link p-0 text-decoration-none d-flex flex-column align-items-center ${
            activeBottomNav === 'bookings' ? 'text-primary' : 'text-secondary'
          }`}
          onClick={() => setActiveBottomNav('bookings')}
        >
          <i className="bi bi-calendar-check fs-5"></i>
          <span style={{ fontSize: '11px', fontWeight: activeBottomNav === 'bookings' ? '600' : '400' }}>
            Bookings
          </span>
        </button>

        <button
          type="button"
          className={`btn btn-link p-0 text-decoration-none d-flex flex-column align-items-center ${
            activeBottomNav === 'profile' ? 'text-primary' : 'text-secondary'
          }`}
          onClick={onOpenAuth || (() => setActiveBottomNav('profile'))}
        >
          <i className="bi bi-person fs-5"></i>
          <span style={{ fontSize: '11px', fontWeight: activeBottomNav === 'profile' ? '600' : '400' }}>
            Profile
          </span>
        </button>
      </nav>

      {/* Filter Modal */}
      {showFilterModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered px-3">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom py-3 px-4">
                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2 mb-0">
                  <i className="bi bi-sliders text-primary"></i>
                  Lọc & Tìm kiếm phòng
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowFilterModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                {/* Search input */}
                <div className="mb-3">
                  <label className="form-label small fw-medium text-dark">Tìm theo tên hoặc địa điểm</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="VD: Da Nang, Resort..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Sort by price */}
                <div className="mb-3">
                  <label className="form-label small fw-medium text-dark">Sắp xếp theo giá</label>
                  <select
                    className="form-select"
                    value={priceSort}
                    onChange={(e) => setPriceSort(e.target.value)}
                  >
                    <option value="all">Mặc định (Tất cả)</option>
                    <option value="low">Giá từ thấp đến cao</option>
                    <option value="high">Giá từ cao đến thấp</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0 px-4 pb-4">
                <button
                  type="button"
                  className="btn btn-primary w-100 rounded-3 py-2 fw-semibold"
                  onClick={() => setShowFilterModal(false)}
                >
                  Áp dụng bộ lọc ({filteredHotels.length} kết quả)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
