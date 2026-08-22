import React, { useState } from 'react';

const INITIAL_HOTELS = [
  {
    id: 'horizon',
    name: 'Horizon Luxury Resort & Spa Da Nang',
    roomName: 'Deluxe Ocean View Double Suite',
    location: 'Bãi biển Mỹ Khê, Sơn Trà, Đà Nẵng',
    stars: 5,
    rating: 9.4,
    reviewLabel: 'Tuyệt hảo',
    reviewsCount: 1420,
    originalPrice: 4200000,
    price: 3200000,
    discount: '24%',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    tag: 'Traveloka Best Seller',
    amenities: ['wifi', 'ac', 'breakfast', 'balcony', 'pool', 'spa'],
    perks: ['Miễn phí hủy trước 24h', 'Bao gồm bữa sáng 2 khách', 'Thanh toán tại khách sạn'],
    badge: 'Flash Sale 24H',
  },
  {
    id: 'azure',
    name: 'Azure Sky Premier Hotel & Suites',
    roomName: 'Executive City View King Room',
    location: 'Trung tâm Quận Hải Châu, Đà Nẵng',
    stars: 4,
    rating: 8.9,
    reviewLabel: 'Ấn tượng',
    reviewsCount: 980,
    originalPrice: 3200000,
    price: 2500000,
    discount: '22%',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    tag: 'Giá tốt nhất',
    amenities: ['wifi', 'ac', 'tv', 'pool'],
    perks: ['Xác nhận tức thì', 'Gần chợ Hàn & Cầu Rồng', 'Miễn phí đổi lịch'],
    badge: 'Tiết kiệm 700k',
  },
  {
    id: 'zenith',
    name: 'Zenith Grand Mountain & Ocean Retreat',
    roomName: 'Private Pool & Garden Villa',
    location: 'Bán đảo Sơn Trà, Đà Nẵng',
    stars: 5,
    rating: 9.7,
    reviewLabel: 'Xuất sắc',
    reviewsCount: 2150,
    originalPrice: 6500000,
    price: 5100000,
    discount: '21%',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    tag: 'Resort 5 Sao Sang Trọng',
    amenities: ['wifi', 'ac', 'breakfast', 'tv', 'balcony', 'spa', 'pool'],
    perks: ['View biển toàn cảnh', 'Bao gồm xe đưa đón sân bay', 'Nâng hạng phòng miễn phí'],
    badge: 'Ưu đãi VIP',
  },
  {
    id: 'pullman',
    name: 'Pullman Danang Beach Resort',
    roomName: 'Superior King Room with Garden View',
    location: 'Võ Nguyên Giáp, Ngũ Hành Sơn, Đà Nẵng',
    stars: 5,
    rating: 9.2,
    reviewLabel: 'Tuyệt vời',
    reviewsCount: 1650,
    originalPrice: 4800000,
    price: 3750000,
    discount: '22%',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    tag: 'Yêu thích nhất',
    amenities: ['wifi', 'pool', 'restaurant', 'beach'],
    perks: ['Bãi biển riêng tư', 'Bao gồm buffet sáng quốc tế', 'Hồ bơi vô cực'],
    badge: 'Bán chạy',
  },
  {
    id: 'fivitel',
    name: 'Fivitel Boutique Danang Hotel',
    roomName: 'Deluxe Double River View',
    location: 'Trần Hưng Đạo, Sơn Trà, Đà Nẵng',
    stars: 4,
    rating: 8.8,
    reviewLabel: 'Tuyệt vời',
    reviewsCount: 740,
    originalPrice: 1950000,
    price: 1450000,
    discount: '26%',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    tag: 'Ưu đãi tuần lễ',
    amenities: ['wifi', 'ac', 'breakfast', 'pool'],
    perks: ['View ngắm Cầu Rồng phun lửa', 'Bao gồm bữa sáng', 'Miễn phí hủy'],
    badge: 'Giá rẻ',
  },
];

export const HotelList = ({ onSelectHotel, onAddNewRoom, onOpenAuth, onBackHome }) => {
  const [hotels, setHotels] = useState(INITIAL_HOTELS);
  const [favorites, setFavorites] = useState(['horizon']);
  const [searchQuery, setSearchQuery] = useState('');
  const [starFilter, setStarFilter] = useState('all'); // 'all' | '5' | '4'
  const [priceSort, setPriceSort] = useState('popular'); // 'popular' | 'low' | 'high' | 'rating'
  const [filterFreeCancel, setFilterFreeCancel] = useState(false);
  const [filterBreakfast, setFilterBreakfast] = useState(false);
  const [maxPrice, setMaxPrice] = useState(10000000);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  const filteredHotels = hotels
    .filter((h) => {
      const matchSearch =
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.roomName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStar = starFilter === 'all' || h.stars.toString() === starFilter;
      const matchPrice = h.price <= maxPrice;
      const matchCancel = !filterFreeCancel || h.perks.some((p) => p.includes('Miễn phí hủy'));
      const matchBreakfast = !filterBreakfast || h.amenities.includes('breakfast');
      return matchSearch && matchStar && matchPrice && matchCancel && matchBreakfast;
    })
    .sort((a, b) => {
      if (priceSort === 'low') return a.price - b.price;
      if (priceSort === 'high') return b.price - a.price;
      if (priceSort === 'rating') return b.rating - a.rating;
      return 0; // popular default
    });

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden">
      {/* 1. Header with Breadcrumb & Search Summary */}
      <header className="p-3 px-md-4 bg-white border-bottom">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 mb-3">
          <div className="d-flex align-items-center gap-2">
            {onBackHome && (
              <button
                type="button"
                className="btn btn-light btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center border me-1"
                style={{ width: '32px', height: '32px' }}
                onClick={onBackHome}
                title="Quay về trang chủ"
              >
                <i className="bi bi-arrow-left"></i>
              </button>
            )}
            <div
              className="d-flex align-items-center justify-content-center text-white rounded-3 shadow-sm"
              style={{ width: '34px', height: '34px', backgroundColor: '#0194f3' }}
            >
              <i className="bi bi-buildings"></i>
            </div>
            <div>
              <h1 className="h6 fw-bold mb-0 text-dark" style={{ fontSize: '1.15rem' }}>
                Khách Sạn & Resort tại Đà Nẵng
              </h1>
              <span className="text-secondary small" style={{ fontSize: '11.5px' }}>
                Tìm thấy <strong>{filteredHotels.length}</strong> chỗ nghỉ phù hợp với tiêu chí của bạn
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm rounded-pill fw-bold d-flex align-items-center gap-1"
              style={{ borderColor: '#0194f3', color: '#0194f3' }}
              onClick={onAddNewRoom}
            >
              <i className="bi bi-plus-circle"></i>
              <span>Thêm Phòng / KS Mới</span>
            </button>
            <button
              type="button"
              className="btn btn-light btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center border"
              style={{ width: '34px', height: '34px' }}
              onClick={onOpenAuth}
              title="Đăng nhập tài khoản"
            >
              <i className="bi bi-person text-secondary"></i>
            </button>
          </div>
        </div>

        {/* Quick Search Bar & Sort Ribbon */}
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-6">
            <div className="input-group input-group-sm bg-light rounded-pill border px-2 py-1">
              <span className="input-group-text bg-transparent border-0 text-secondary">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-transparent border-0 shadow-none small"
                placeholder="Tìm theo tên khách sạn, địa điểm, khu vực..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn btn-link text-secondary p-0 me-1"
                  onClick={() => setSearchQuery('')}
                >
                  <i className="bi bi-x-circle-fill"></i>
                </button>
              )}
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex align-items-center justify-content-md-end gap-2 overflow-auto flex-nowrap">
            <span className="text-secondary small fw-semibold text-nowrap d-none d-sm-inline">Sắp xếp:</span>
            <div className="btn-group btn-group-sm rounded-pill border p-0.5 bg-light" role="group">
              <button
                type="button"
                className={`btn btn-sm rounded-pill py-1 px-2.5 text-nowrap ${
                  priceSort === 'popular' ? 'btn-primary text-white fw-bold shadow-sm' : 'btn-light border-0'
                }`}
                style={priceSort === 'popular' ? { backgroundColor: '#0194f3', borderColor: '#0194f3' } : {}}
                onClick={() => setPriceSort('popular')}
              >
                Phổ biến nhất
              </button>
              <button
                type="button"
                className={`btn btn-sm rounded-pill py-1 px-2.5 text-nowrap ${
                  priceSort === 'low' ? 'btn-primary text-white fw-bold shadow-sm' : 'btn-light border-0'
                }`}
                style={priceSort === 'low' ? { backgroundColor: '#0194f3', borderColor: '#0194f3' } : {}}
                onClick={() => setPriceSort('low')}
              >
                Giá thấp nhất
              </button>
              <button
                type="button"
                className={`btn btn-sm rounded-pill py-1 px-2.5 text-nowrap ${
                  priceSort === 'rating' ? 'btn-primary text-white fw-bold shadow-sm' : 'btn-light border-0'
                }`}
                style={priceSort === 'rating' ? { backgroundColor: '#0194f3', borderColor: '#0194f3' } : {}}
                onClick={() => setPriceSort('rating')}
              >
                Điểm cao nhất
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Desktop 2-Column Layout (Sidebar Filters + Results List) */}
      <div className="p-3 p-md-4 bg-light">
        <div className="row g-3 g-lg-4">
          {/* LEFT SIDEBAR FILTERS (Desktop & Tablet) */}
          <div className="col-12 col-lg-3">
            <div className="card rounded-3 border bg-white p-3 shadow-sm sticky-top" style={{ top: '80px', zIndex: 10 }}>
              <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <span className="fw-bold small d-flex align-items-center gap-1.5">
                  <i className="bi bi-funnel-fill text-primary"></i> Bộ Lọc Tìm Kiếm
                </span>
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none text-primary small"
                  style={{ fontSize: '11.5px' }}
                  onClick={() => {
                    setStarFilter('all');
                    setPriceSort('popular');
                    setFilterFreeCancel(false);
                    setFilterBreakfast(false);
                    setMaxPrice(10000000);
                    setSearchQuery('');
                  }}
                >
                  Đặt lại
                </button>
              </div>

              {/* Star Rating Filter */}
              <div className="mb-3 pb-3 border-bottom">
                <label className="form-label small fw-bold text-secondary mb-2">Hạng sao khách sạn</label>
                <div className="d-flex flex-column gap-1.5">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="starFilter"
                      id="starAll"
                      checked={starFilter === 'all'}
                      onChange={() => setStarFilter('all')}
                    />
                    <label className="form-check-label small" htmlFor="starAll">
                      Tất cả hạng sao
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="starFilter"
                      id="star5"
                      checked={starFilter === '5'}
                      onChange={() => setStarFilter('5')}
                    />
                    <label className="form-check-label small d-flex align-items-center gap-1" htmlFor="star5">
                      <span className="text-warning">★★★★★</span> (5 sao)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="starFilter"
                      id="star4"
                      checked={starFilter === '4'}
                      onChange={() => setStarFilter('4')}
                    />
                    <label className="form-check-label small d-flex align-items-center gap-1" htmlFor="star4">
                      <span className="text-warning">★★★★</span> (4 sao)
                    </label>
                  </div>
                </div>
              </div>

              {/* Perks & Services Filter */}
              <div className="mb-3 pb-3 border-bottom">
                <label className="form-label small fw-bold text-secondary mb-2">Tiện ích & Chính sách</label>
                <div className="d-flex flex-column gap-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="filterCancel"
                      checked={filterFreeCancel}
                      onChange={(e) => setFilterFreeCancel(e.target.checked)}
                    />
                    <label className="form-check-label small text-success fw-semibold" htmlFor="filterCancel">
                      <i className="bi bi-shield-check me-1"></i> Miễn phí hủy phòng
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="filterBreakfast"
                      checked={filterBreakfast}
                      onChange={(e) => setFilterBreakfast(e.target.checked)}
                    />
                    <label className="form-check-label small" htmlFor="filterBreakfast">
                      <i className="bi bi-cup-hot text-warning me-1"></i> Bao gồm bữa sáng
                    </label>
                  </div>
                </div>
              </div>

              {/* Price Range Filter Slider */}
              <div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="form-label small fw-bold text-secondary mb-0">Khoảng giá tối đa</label>
                  <span className="fw-bold text-primary small">{formatVND(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="1000000"
                  max="10000000"
                  step="500000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
                <div className="d-flex justify-content-between text-secondary" style={{ fontSize: '10px' }}>
                  <span>1.000.000₫</span>
                  <span>10.000.000₫</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT RESULTS HOTEL CARDS */}
          <div className="col-12 col-lg-9">
            {filteredHotels.length === 0 ? (
              <div className="card rounded-4 border bg-white p-5 text-center shadow-sm">
                <i className="bi bi-search fs-1 text-secondary mb-2"></i>
                <h4 className="h6 fw-bold">Không tìm thấy khách sạn phù hợp</h4>
                <p className="text-secondary small mb-3">
                  Hãy thử điều chỉnh bộ lọc hoặc xóa từ khóa tìm kiếm để xem thêm nhiều chỗ nghỉ.
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-sm rounded-pill px-4 mx-auto fw-bold"
                  style={{ backgroundColor: '#0194f3', borderColor: '#0194f3' }}
                  onClick={() => {
                    setStarFilter('all');
                    setSearchQuery('');
                    setMaxPrice(10000000);
                  }}
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {filteredHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="card rounded-4 border bg-white shadow-sm overflow-hidden tv-card-hover cursor-pointer"
                    onClick={() => onSelectHotel && onSelectHotel(hotel)}
                  >
                    <div className="row g-0">
                      {/* Photo Thumbnail */}
                      <div className="col-12 col-md-4 position-relative" style={{ minHeight: '190px' }}>
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-100 h-100 object-fit-cover"
                        />
                        <span
                          className="badge position-absolute top-0 start-0 m-2 rounded-pill shadow-sm"
                          style={{ backgroundColor: '#ff5e1f', fontSize: '10px' }}
                        >
                          {hotel.tag}
                        </span>
                        <button
                          type="button"
                          className="btn btn-light rounded-circle p-0 position-absolute top-0 end-0 m-2 shadow-sm d-flex align-items-center justify-content-center"
                          style={{ width: '32px', height: '32px' }}
                          onClick={(e) => toggleFavorite(hotel.id, e)}
                        >
                          <i
                            className={`bi ${
                              favorites.includes(hotel.id)
                                ? 'bi-heart-fill text-danger'
                                : 'bi-heart text-secondary'
                            }`}
                          ></i>
                        </button>
                      </div>

                      {/* Content Details */}
                      <div className="col-12 col-md-5 p-3 d-flex flex-column justify-content-between border-end-md">
                        <div>
                          <div className="d-flex align-items-center gap-1 mb-1">
                            {[...Array(hotel.stars)].map((_, i) => (
                              <i key={i} className="bi bi-star-fill text-warning" style={{ fontSize: '11px' }}></i>
                            ))}
                            <span className="badge bg-light text-secondary ms-1" style={{ fontSize: '9.5px' }}>Khách sạn {hotel.stars}★</span>
                          </div>

                          <h3 className="h6 fw-bold mb-1 text-dark" style={{ fontSize: '15px', lineHeight: '1.3' }}>
                            {hotel.name}
                          </h3>

                          <div className="text-secondary small mb-2 d-flex align-items-center gap-1" style={{ fontSize: '11.5px' }}>
                            <i className="bi bi-geo-alt-fill text-danger"></i>
                            <span className="text-truncate">{hotel.location}</span>
                          </div>

                          <div className="badge bg-primary-subtle text-primary fw-bold mb-2" style={{ fontSize: '11px' }}>
                            Phòng: {hotel.roomName}
                          </div>

                          {/* Perks */}
                          <div className="d-flex flex-column gap-1">
                            {hotel.perks.map((perk, idx) => (
                              <div key={idx} className="small text-success d-flex align-items-center gap-1" style={{ fontSize: '11px' }}>
                                <i className="bi bi-check-circle-fill"></i>
                                <span>{perk}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Rating pill */}
                        <div className="d-flex align-items-center gap-2 mt-2 pt-2 border-top">
                          <span className="tv-badge-rating small" style={{ fontSize: '11px' }}>
                            <i className="bi bi-star-fill"></i> {hotel.rating}
                          </span>
                          <span className="fw-bold small text-primary">{hotel.reviewLabel}</span>
                          <span className="text-secondary small" style={{ fontSize: '11px' }}>
                            ({hotel.reviewsCount} đánh giá)
                          </span>
                        </div>
                      </div>

                      {/* Pricing & CTA Column */}
                      <div className="col-12 col-md-3 p-3 bg-light-subtle d-flex flex-column justify-content-between text-md-end border-top border-top-md-0">
                        <div>
                          <span className="badge bg-danger-subtle text-danger fw-bold mb-1" style={{ fontSize: '10.5px' }}>
                            {hotel.badge}
                          </span>
                          <span className="text-decoration-line-through text-secondary small d-block" style={{ fontSize: '11.5px' }}>
                            {formatVND(hotel.originalPrice)}
                          </span>
                          <div className="d-flex align-items-baseline justify-content-md-end gap-1">
                            <span className="badge bg-danger text-white fw-bold" style={{ fontSize: '10px' }}>
                              -{hotel.discount}
                            </span>
                            <span className="fw-bold text-danger fs-5" style={{ color: '#ff5e1f' }}>
                              {formatVND(hotel.price)}
                            </span>
                          </div>
                          <span className="text-secondary small d-block" style={{ fontSize: '10.5px' }}>
                            / phòng / đêm
                          </span>
                          <span className="text-success small fw-semibold d-block mt-1" style={{ fontSize: '10.5px' }}>
                            Đã gồm thuế & phí
                          </span>
                        </div>

                        <button
                          type="button"
                          className="btn btn-warning w-100 fw-bold py-2 rounded-3 text-white shadow-sm mt-3 d-flex align-items-center justify-content-center gap-1"
                          style={{ backgroundColor: '#ff5e1f', borderColor: '#ff5e1f', fontSize: '13.5px' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectHotel && onSelectHotel(hotel);
                          }}
                        >
                          <span>Chọn phòng</span>
                          <i className="bi bi-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
