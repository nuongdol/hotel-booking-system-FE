import React, { useState } from 'react';

const CATEGORIES = [
  { id: 'hotel', label: 'Khách sạn', icon: 'bi-building' },
  { id: 'resort', label: 'Resort', icon: 'bi-water' },
  { id: 'villa', label: 'Villa', icon: 'bi-house-door' },
  { id: 'spa', label: 'Spa', icon: 'bi-flower1' },
  { id: 'apartment', label: 'Căn hộ', icon: 'bi-buildings' },
];

const POPULAR_DESTINATIONS = [
  {
    id: 'danang',
    name: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=500&q=80',
    hotelsCount: '450+ chỗ nghỉ',
  },
  {
    id: 'hanoi',
    name: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=500&q=80',
    hotelsCount: '620+ chỗ nghỉ',
  },
  {
    id: 'phuquoc',
    name: 'Phú Quốc',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80',
    hotelsCount: '380+ chỗ nghỉ',
  },
];

const RECOMMENDED_HOTELS = [
  {
    id: 'intercon',
    name: 'InterContinental Danang Sun Peninsula',
    rating: 4.8,
    location: 'Bán đảo Sơn Trà, Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    price: 8500000,
    amenities: ['wifi', 'pool', 'restaurant'],
  },
  {
    id: 'peridot',
    name: 'Peridot Grand Luxury Boutique Hotel',
    rating: 4.8,
    location: 'Hoàn Kiếm, Hà Nội',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    price: 3200000,
    amenities: ['wifi', 'ac', 'breakfast'],
  },
  {
    id: 'jw-marriott',
    name: 'JW Marriott Phu Quoc Emerald Bay Resort',
    rating: 4.9,
    location: 'Bãi Khem, An Thới, Phú Quốc',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    price: 7800000,
    amenities: ['wifi', 'pool', 'spa', 'beach'],
  },
];

export const TravelEaseHome = ({ onSelectHotel, onSearch, onNavigateToBookings, onNavigateToProfile }) => {
  const [selectedCategory, setSelectedCategory] = useState('hotel');
  const [destination, setDestination] = useState('Đà Nẵng');
  const [dates, setDates] = useState('12 Thg 8 - 15 Thg 8');
  const [guests, setGuests] = useState('2 Khách, 1 Phòng');
  const [favorites, setFavorites] = useState(['intercon']);
  const [activeBottomTab, setActiveBottomTab] = useState('explore');

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formatVND = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num) + 'đ';
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ destination, dates, guests, category: selectedCategory });
    }
  };

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative pb-1">
      {/* 1. Top Header */}
      <header className="d-flex align-items-center justify-content-between p-3 px-4 bg-white border-bottom sticky-top">
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center justify-content-center text-primary fs-5">
            <i className="bi bi-airplane-fill" style={{ color: '#0062a3' }}></i>
          </div>
          <h1 className="h6 fw-bold mb-0" style={{ color: '#0062a3', fontSize: '1.2rem', letterSpacing: '-0.2px' }}>
            TravelEase
          </h1>
        </div>

        <button
          type="button"
          className="btn btn-light rounded-circle border p-0 position-relative d-flex align-items-center justify-content-center"
          style={{ width: '36px', height: '36px' }}
          aria-label="Thông báo"
          onClick={() => alert('Bạn có 1 thông báo: Ưu đãi giảm 30% tại Phú Quốc đã được kích hoạt!')}
        >
          <i className="bi bi-bell text-secondary fs-5"></i>
          <span
            className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
            style={{ marginTop: '5px', marginLeft: '-7px' }}
          ></span>
        </button>
      </header>

      {/* 2. Main Search Card */}
      <div className="p-3 bg-light border-bottom">
        <div className="bg-white rounded-4 p-3 shadow-sm border">
          <h2 className="h6 fw-bold text-dark mb-3" style={{ fontSize: '1.05rem' }}>
            Bạn muốn đi đâu?
          </h2>

          <form onSubmit={handleSearchSubmit}>
            {/* Field: Destination */}
            <div className="bg-light rounded-3 p-2.5 px-3 mb-2 border d-flex align-items-center gap-2.5">
              <i className="bi bi-geo-alt text-secondary fs-5"></i>
              <div className="flex-grow-1">
                <div className="text-secondary" style={{ fontSize: '11px', fontWeight: '500' }}>
                  Điểm đến
                </div>
                <input
                  type="text"
                  className="form-control form-control-sm border-0 p-0 bg-transparent fw-semibold text-dark shadow-none"
                  value={destination}
                  placeholder="Thành phố, khách sạn..."
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            {/* Row: Dates & Guests */}
            <div className="row g-2 mb-3">
              {/* Dates */}
              <div className="col-6">
                <div className="bg-light rounded-3 p-2 px-2.5 border d-flex align-items-center gap-2 h-100">
                  <i className="bi bi-calendar3 text-secondary"></i>
                  <div className="overflow-hidden">
                    <div className="text-secondary" style={{ fontSize: '10px', fontWeight: '500' }}>
                      Ngày nhận/trả
                    </div>
                    <div className="text-truncate fw-semibold text-dark" style={{ fontSize: '11.5px' }}>
                      {dates}
                    </div>
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="col-6">
                <div className="bg-light rounded-3 p-2 px-2.5 border d-flex align-items-center gap-2 h-100">
                  <i className="bi bi-people text-secondary"></i>
                  <div className="overflow-hidden">
                    <div className="text-secondary" style={{ fontSize: '10px', fontWeight: '500' }}>
                      Khách & Phòng
                    </div>
                    <div className="text-truncate fw-semibold text-dark" style={{ fontSize: '11.5px' }}>
                      {guests}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2.5 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: '#0062a3', borderColor: '#0062a3', fontSize: '14.5px' }}
            >
              <i className="bi bi-search"></i>
              <span>Tìm kiếm</span>
            </button>
          </form>
        </div>
      </div>

      {/* 3. Category Icons Slider */}
      <div className="px-3 py-3 border-bottom">
        <div className="d-flex justify-content-between align-items-center gap-1 overflow-auto py-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className="btn p-0 border-0 d-flex flex-column align-items-center flex-shrink-0"
                style={{ width: '64px' }}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <div
                  className={`rounded-3 p-2.5 mb-1 d-flex align-items-center justify-content-center border transition-all ${
                    isSelected ? 'bg-primary text-white shadow-sm border-primary' : 'bg-light text-secondary'
                  }`}
                  style={{
                    width: '46px',
                    height: '46px',
                    backgroundColor: isSelected ? '#0062a3' : '#f8f9fa',
                  }}
                >
                  <i className={`bi ${cat.icon} fs-5`}></i>
                </div>
                <span
                  className={`small ${isSelected ? 'fw-bold text-primary' : 'text-secondary'}`}
                  style={{ fontSize: '11px' }}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Promotional Banner */}
      <div className="p-3">
        <div
          className="rounded-4 overflow-hidden position-relative shadow-sm p-3 text-white d-flex flex-column justify-content-between"
          style={{
            minHeight: '140px',
            background:
              'linear-gradient(to right, rgba(0, 0, 0, 0.75) 30%, rgba(0, 0, 0, 0.2) 100%), url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div>
            <span
              className="badge bg-warning text-dark fw-bold mb-2 text-uppercase"
              style={{ fontSize: '10px', letterSpacing: '0.3px' }}
            >
              Ưu đãi hè
            </span>
            <h3 className="h6 fw-bold mb-1 text-white" style={{ fontSize: '1.05rem', lineHeight: '1.3' }}>
              Giảm 30% cho kỳ nghỉ biển
            </h3>
            <p className="mb-2 text-white-50 small" style={{ fontSize: '11.5px' }}>
              Áp dụng cho resort Phú Quốc
            </p>
          </div>

          <div>
            <button
              type="button"
              className="btn btn-primary btn-sm rounded-pill px-3 py-1 fw-bold shadow-sm d-inline-flex align-items-center gap-1.5"
              style={{ backgroundColor: '#0062a3', fontSize: '11.5px', border: 'none' }}
              onClick={() => {
                if (onSelectHotel) {
                  onSelectHotel(RECOMMENDED_HOTELS[2]);
                }
              }}
            >
              <span>Khám phá ngay</span>
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Điểm đến phổ biến */}
      <div className="px-3 pb-3">
        <div className="d-flex align-items-center justify-content-between mb-2.5">
          <h4 className="h6 fw-bold text-dark mb-0" style={{ fontSize: '1.05rem' }}>
            Điểm đến phổ biến
          </h4>
          <button
            type="button"
            className="btn btn-link text-primary p-0 small text-decoration-none fw-medium"
            style={{ fontSize: '12px', color: '#0062a3' }}
            onClick={() => alert('Xem toàn bộ điểm đến du lịch nổi tiếng tại Việt Nam')}
          >
            Xem tất cả
          </button>
        </div>

        <div className="row g-2">
          {POPULAR_DESTINATIONS.map((item) => (
            <div key={item.id} className="col-4">
              <div
                className="rounded-3 overflow-hidden position-relative shadow-sm cursor-pointer"
                style={{ height: '95px', cursor: 'pointer' }}
                onClick={() => setDestination(item.name)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  className="position-absolute bottom-0 start-0 end-0 p-1.5 text-white"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                  }}
                >
                  <div className="fw-bold" style={{ fontSize: '12px' }}>
                    {item.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Gợi ý cho bạn (Recommended Hotels) */}
      <div className="px-3 pb-4">
        <h4 className="h6 fw-bold text-dark mb-3" style={{ fontSize: '1.05rem' }}>
          Gợi ý cho bạn
        </h4>

        <div className="d-flex flex-column gap-3">
          {RECOMMENDED_HOTELS.map((hotel) => (
            <div
              key={hotel.id}
              className="card border rounded-4 overflow-hidden shadow-sm transition-all"
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectHotel && onSelectHotel(hotel)}
            >
              {/* Image & Heart Badge */}
              <div className="position-relative" style={{ height: '175px' }}>
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
                <button
                  type="button"
                  className="btn btn-light bg-white bg-opacity-75 rounded-circle p-0 position-absolute top-0 end-0 m-2.5 d-flex align-items-center justify-content-center shadow-sm border-0"
                  style={{ width: '32px', height: '32px' }}
                  onClick={(e) => toggleFavorite(e, hotel.id)}
                  aria-label="Yêu thích"
                >
                  <i
                    className={`bi ${
                      favorites.includes(hotel.id)
                        ? 'bi-heart-fill text-danger'
                        : 'bi-heart text-dark'
                    } fs-6`}
                  ></i>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-3">
                <div className="d-flex align-items-start justify-content-between gap-2 mb-1">
                  <h5 className="fw-bold text-dark mb-0 text-truncate" style={{ fontSize: '14px' }}>
                    {hotel.name}
                  </h5>
                  <span className="badge bg-light text-dark border d-flex align-items-center gap-1 fw-bold flex-shrink-0" style={{ fontSize: '11px' }}>
                    <i className="bi bi-star-fill text-warning"></i>
                    {hotel.rating}
                  </span>
                </div>

                <p className="text-secondary small mb-2.5 text-truncate" style={{ fontSize: '11.5px' }}>
                  <i className="bi bi-geo-alt me-1"></i>
                  {hotel.location}
                </p>

                {/* Amenities Icons & Price Row */}
                <div className="d-flex align-items-end justify-content-between pt-2 border-top">
                  <div className="d-flex align-items-center gap-2 text-secondary">
                    <i className="bi bi-wifi" title="Free Wi-Fi"></i>
                    <i className="bi bi-water" title="Hồ bơi"></i>
                    <i className="bi bi-cup-hot" title="Nhà hàng"></i>
                  </div>

                  <div className="text-end">
                    <span className="text-secondary d-block" style={{ fontSize: '10px' }}>
                      Chỉ từ
                    </span>
                    <span className="fw-bold text-warning" style={{ fontSize: '15px', color: '#d97706' }}>
                      {formatVND(hotel.price)}
                    </span>
                    <span className="text-secondary" style={{ fontSize: '10.5px' }}>
                      /đêm
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Bottom Navigation */}
      <nav className="bg-white border-top py-2 px-4 d-flex align-items-center justify-content-around sticky-bottom">
        <button
          type="button"
          className="btn btn-warning text-dark fw-bold rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5 shadow-sm"
          style={{ backgroundColor: '#f59e0b', borderColor: '#f59e0b', fontSize: '12px' }}
          onClick={() => setActiveBottomTab('explore')}
        >
          <i className="bi bi-search"></i>
          <span>Explore</span>
        </button>

        <button
          type="button"
          className={`btn btn-link p-0 text-decoration-none d-flex flex-column align-items-center ${
            activeBottomTab === 'bookings' ? 'text-primary fw-bold' : 'text-secondary'
          }`}
          onClick={() => {
            setActiveBottomTab('bookings');
            if (onNavigateToBookings) onNavigateToBookings();
          }}
        >
          <i className="bi bi-calendar2-check fs-5"></i>
          <span style={{ fontSize: '11px' }}>Bookings</span>
        </button>

        <button
          type="button"
          className={`btn btn-link p-0 text-decoration-none d-flex flex-column align-items-center ${
            activeBottomTab === 'profile' ? 'text-primary fw-bold' : 'text-secondary'
          }`}
          onClick={() => {
            setActiveBottomTab('profile');
            if (onNavigateToProfile) onNavigateToProfile();
          }}
        >
          <i className="bi bi-person fs-5"></i>
          <span style={{ fontSize: '11px' }}>Profile</span>
        </button>
      </nav>
    </div>
  );
};
