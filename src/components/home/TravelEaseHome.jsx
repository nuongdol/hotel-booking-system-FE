import React, { useState } from 'react';

const CATEGORIES = [
  { id: 'hotel', label: 'Khách sạn', icon: 'bi-building', badge: 'Hot' },
  { id: 'flight', label: 'Vé máy bay', icon: 'bi-airplane', badge: null },
  { id: 'train', label: 'Vé tàu hỏa', icon: 'bi-train-front', badge: null },
  { id: 'bus', label: 'Vé xe khách', icon: 'bi-bus-front', badge: null },
  { id: 'airport', label: 'Đưa đón sân bay', icon: 'bi-car-front', badge: null },
  { id: 'xperience', label: 'Xperience & Tour', icon: 'bi-ticket-perforated', badge: 'Mới' },
  { id: 'car', label: 'Thuê xe', icon: 'bi-key', badge: null },
  { id: 'combo', label: 'Combo Tiết Kiệm', icon: 'bi-box2-heart', badge: '-30%' },
];

const POPULAR_DESTINATIONS = [
  {
    id: 'danang',
    name: 'Đà Nẵng',
    province: 'Việt Nam',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80',
    hotelsCount: '1,450+ chỗ nghỉ',
    priceFrom: '450.000',
    tag: 'Bãi biển đẹp',
  },
  {
    id: 'phuquoc',
    name: 'Phú Quốc',
    province: 'Kiên Giang',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    hotelsCount: '980+ chỗ nghỉ',
    priceFrom: '620.000',
    tag: 'Thiên đường nghỉ dưỡng',
  },
  {
    id: 'dalat',
    name: 'Đà Lạt',
    province: 'Lâm Đồng',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    hotelsCount: '1,200+ chỗ nghỉ',
    priceFrom: '350.000',
    tag: 'Thành phố ngàn hoa',
  },
  {
    id: 'nhatrang',
    name: 'Nha Trang',
    province: 'Khánh Hòa',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    hotelsCount: '890+ chỗ nghỉ',
    priceFrom: '400.000',
    tag: 'Vịnh biển kỳ quan',
  },
  {
    id: 'hanoi',
    name: 'Hà Nội',
    province: 'Thủ đô Việt Nam',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    hotelsCount: '1,820+ chỗ nghỉ',
    priceFrom: '380.000',
    tag: 'Văn hóa & Ẩm thực',
  },
  {
    id: 'hcm',
    name: 'TP. Hồ Chí Minh',
    province: 'Việt Nam',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80',
    hotelsCount: '2,150+ chỗ nghỉ',
    priceFrom: '390.000',
    tag: 'Sôi động & Hiện đại',
  },
];

const VOUCHERS = [
  {
    id: 'TVLK300',
    code: 'TRAVELOKA300',
    title: 'Giảm ngay 300.000đ',
    desc: 'Cho đơn khách sạn từ 2.000.000đ',
    badge: 'Khách sạn 4-5 sao',
    color: '#0194f3',
  },
  {
    id: 'EPIC50',
    code: 'EPICSTAY',
    title: 'Ưu đãi hè - Giảm 20%',
    desc: 'Tối đa 500k khi thanh toán qua VietQR',
    badge: 'Ưu đãi độc quyền',
    color: '#ff5e1f',
  },
  {
    id: 'MEMBER10',
    code: 'TRAVELCLUB',
    title: 'Thành viên mới - Giảm 15%',
    desc: 'Áp dụng cho lần đặt phòng đầu tiên',
    badge: 'Thành viên mới',
    color: '#00b14f',
  },
];

const RECOMMENDED_HOTELS = [
  {
    id: 'intercon',
    name: 'InterContinental Danang Sun Peninsula Resort',
    rating: 9.6,
    reviewLabel: 'Ấn tượng',
    reviewsCount: '1,842',
    stars: 5,
    location: 'Bán đảo Sơn Trà, Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    originalPrice: 10500000,
    price: 8500000,
    discount: '19%',
    tag: 'Traveloka Best Choice',
    amenities: ['wifi', 'pool', 'restaurant', 'beach', 'spa'],
    features: ['Miễn phí hủy phòng', 'Bao gồm bữa sáng ngon miệng', 'Thanh toán tại KS'],
  },
  {
    id: 'peridot',
    name: 'Peridot Grand Luxury Boutique Hotel',
    rating: 9.4,
    reviewLabel: 'Tuyệt hảo',
    reviewsCount: '920',
    stars: 5,
    location: 'Quận Hoàn Kiếm, Hà Nội (Gần Phố Cổ)',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    originalPrice: 4200000,
    price: 3200000,
    discount: '24%',
    tag: 'Bán chạy nhất',
    amenities: ['wifi', 'ac', 'breakfast', 'bar', 'pool'],
    features: ['Vị trí trung tâm', 'Bao gồm bữa sáng', 'Xác nhận tức thì'],
  },
  {
    id: 'jw-marriott',
    name: 'JW Marriott Phu Quoc Emerald Bay Resort & Spa',
    rating: 9.7,
    reviewLabel: 'Xuất sắc',
    reviewsCount: '2,410',
    stars: 5,
    location: 'Bãi Khem, An Thới, Phú Quốc',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    originalPrice: 9800000,
    price: 7800000,
    discount: '20%',
    tag: 'Flash Sale 24h',
    amenities: ['wifi', 'pool', 'spa', 'beach', 'bar'],
    features: ['Bãi biển riêng', 'Miễn phí nâng hạng phòng', 'Bao gồm bữa sáng buffet'],
  },
  {
    id: 'zenith-dalat',
    name: 'Zenith Highland Heritage Resort & Spa',
    rating: 9.3,
    reviewLabel: 'Tuyệt vời',
    reviewsCount: '780',
    stars: 4,
    location: 'Hồ Tuyền Lâm, Đà Lạt',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    originalPrice: 3100000,
    price: 2350000,
    discount: '25%',
    tag: 'Giá tốt hôm nay',
    amenities: ['wifi', 'ac', 'breakfast', 'garden'],
    features: ['View rừng thông thơ mộng', 'Miễn phí hủy', 'Xe đưa đón trung tâm'],
  },
];

export const TravelEaseHome = ({
  onSelectHotel,
  onSearch,
  onNavigateToBookings,
  onNavigateToCart,
  onNavigateToMessages,
  onNavigateToProfile,
  onNavigateToAuth,
  onNavigateToDashboard,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('hotel');
  const [destination, setDestination] = useState('Đà Nẵng');
  const [checkInDate, setCheckInDate] = useState('2026-08-25');
  const [nights, setNights] = useState(2);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [favorites, setFavorites] = useState(['intercon']);
  const [activeBottomTab, setActiveBottomTab] = useState('explore');
  const [copiedCoupon, setCopiedCoupon] = useState(null);
  const [freeCancelOnly, setFreeCancelOnly] = useState(false);
  const [payAtHotelOnly, setPayAtHotelOnly] = useState(false);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formatVND = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num) + ' ₫';
  };

  const handleCopyCoupon = (code) => {
    navigator.clipboard?.writeText?.(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (onSearch) {
      onSearch({
        destination,
        dates: `${checkInDate} (${nights} đêm)`,
        guests: `${adults} Người lớn, ${children > 0 ? children + ' Trẻ em, ' : ''}${rooms} Phòng`,
        category: selectedCategory,
        freeCancelOnly,
        payAtHotelOnly,
      });
    }
  };

  const calculateCheckOutDate = () => {
    const d = new Date(checkInDate || '2026-08-25');
    d.setDate(d.getDate() + Number(nights));
    return d.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative">
      {/* ======================================================== */}
      {/* 1. TOP TRAVELOKA DESKTOP HEADER & APP BAR                */}
      {/* ======================================================== */}
      <header className="bg-white border-bottom sticky-top" style={{ zIndex: 1020 }}>
        {/* Top utility sub-bar on desktop */}
        <div className="d-none d-lg-block border-bottom py-1.5 px-4 bg-light text-secondary small" style={{ fontSize: '12px' }}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <span className="d-flex align-items-center gap-1">
                <i className="bi bi-shield-check text-success"></i> Đảm bảo giá tốt nhất & Hoàn tiền dễ dàng
              </span>
              <span className="text-muted">|</span>
              <span className="d-flex align-items-center gap-1">
                <i className="bi bi-headset text-primary"></i> Hỗ trợ 24/7: <strong>1900-6977</strong>
              </span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none text-secondary small d-flex align-items-center gap-1"
                onClick={onNavigateToDashboard}
              >
                <i className="bi bi-buildings text-primary"></i> Hợp tác với Traveloka (Dành cho Chủ Khách Sạn)
              </button>
              <span className="text-muted">|</span>
              <span className="cursor-pointer d-flex align-items-center gap-1">
                🇻🇳 <strong>VND</strong> (Tiếng Việt)
              </span>
            </div>
          </div>
        </div>

        {/* Main Branding & Navigation Bar */}
        <div className="p-3 px-md-4 d-flex align-items-center justify-content-between">
          {/* Logo */}
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center gap-2 cursor-pointer"
              onClick={() => setActiveBottomTab('explore')}
            >
              <div
                className="rounded-3 d-flex align-items-center justify-content-center text-white shadow-sm"
                style={{
                  width: '38px',
                  height: '38px',
                  backgroundColor: '#0194f3',
                  background: 'linear-gradient(135deg, #0194f3 0%, #0064d2 100%)',
                }}
              >
                <i className="bi bi-send-fill fs-5" style={{ transform: 'rotate(-25deg)' }}></i>
              </div>
              <div>
                <span className="fw-black fs-4 text-primary tracking-tight mb-0" style={{ color: '#0194f3', fontWeight: '800', letterSpacing: '-0.5px' }}>
                  traveloka
                </span>
                <span className="d-none d-sm-inline ms-1 badge bg-warning text-dark fw-bold" style={{ fontSize: '10px' }}>
                  AZURE
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Right Quick Actions */}
          <div className="d-flex align-items-center gap-2 gap-md-3">
            <button
              type="button"
              className="btn btn-light btn-sm d-flex align-items-center gap-1 text-secondary border-0"
              onClick={onNavigateToMessages}
              title="Tin nhắn & Trò chuyện"
            >
              <i className="bi bi-chat-dots text-primary fs-5"></i>
              <span className="d-none d-md-inline small fw-semibold">Tin nhắn</span>
            </button>

            <button
              type="button"
              className="btn btn-light btn-sm d-flex align-items-center gap-1 text-secondary border-0 position-relative"
              onClick={onNavigateToCart}
              title="Giỏ hàng"
            >
              <i className="bi bi-cart3 text-warning fs-5"></i>
              <span className="d-none d-md-inline small fw-semibold">Giỏ hàng</span>
              <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '9px' }}>
                2
              </span>
            </button>

            <button
              type="button"
              className="btn btn-light btn-sm d-none d-md-flex align-items-center gap-1 text-secondary border-0"
              onClick={onNavigateToBookings}
              title="Đặt chỗ của tôi"
            >
              <i className="bi bi-calendar2-check text-success fs-5"></i>
              <span className="small fw-semibold">Đặt chỗ</span>
            </button>

            <button
              type="button"
              className="btn btn-outline-primary btn-sm px-3 fw-bold rounded-pill d-flex align-items-center gap-1"
              style={{ borderColor: '#0194f3', color: '#0194f3' }}
              onClick={onNavigateToAuth}
            >
              <i className="bi bi-person-circle"></i>
              <span>Đăng nhập</span>
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm px-3 fw-bold rounded-pill d-none d-sm-inline-flex align-items-center"
              style={{ backgroundColor: '#0194f3', borderColor: '#0194f3' }}
              onClick={onNavigateToAuth}
            >
              Đăng ký
            </button>
          </div>
        </div>

        {/* Secondary Category Ribbon (Desktop & Mobile Scrollable) */}
        <div className="border-top px-3 px-md-4 py-2 bg-white overflow-auto flex-nowrap" style={{ scrollbarWidth: 'none' }}>
          <div className="d-flex align-items-center gap-1 gap-md-2" style={{ minWidth: 'max-content' }}>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5 border transition-all text-nowrap ${
                    isSelected
                      ? 'btn-primary text-white fw-bold shadow-sm'
                      : 'btn-light text-secondary border-0'
                  }`}
                  style={
                    isSelected
                      ? { backgroundColor: '#0194f3', borderColor: '#0194f3' }
                      : { backgroundColor: '#f4f6f8' }
                  }
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <i className={`bi ${cat.icon}`}></i>
                  <span>{cat.label}</span>
                  {cat.badge && (
                    <span
                      className={`badge rounded-pill ms-1 ${
                        isSelected ? 'bg-warning text-dark' : 'bg-danger text-white'
                      }`}
                      style={{ fontSize: '9px', padding: '2px 5px' }}
                    >
                      {cat.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. TRAVELOKA HERO BANNER & MULTI-FIELD SEARCH ENGINE     */}
      {/* ======================================================== */}
      <section
        className="p-3 p-md-4 text-white position-relative"
        style={{
          background: 'linear-gradient(135deg, #0b3b60 0%, #0194f3 60%, #0064d2 100%)',
        }}
      >
        <div className="row align-items-center justify-content-between mb-3 mb-md-4">
          <div className="col-12 col-lg-8">
            <span
              className="badge text-uppercase fw-bold mb-2 shadow-sm"
              style={{ backgroundColor: '#ff5e1f', fontSize: '11px', letterSpacing: '0.5px' }}
            >
              🎉 Siêu Khuyến Mãi Hè 2026
            </span>
            <h2 className="h4 h2-md fw-bold mb-1" style={{ letterSpacing: '-0.3px' }}>
              Từ Đông Nam Á Đến Thế Giới, Chạm Nhẹ Là Đi!
            </h2>
            <p className="mb-0 text-white-50 small" style={{ fontSize: '13.5px' }}>
              Đặt phòng khách sạn, resort nghỉ dưỡng & vé vui chơi với giá tốt nhất trên Traveloka
            </p>
          </div>
          <div className="col-12 col-lg-4 d-none d-lg-flex justify-content-end align-items-center gap-3">
            <div className="text-end">
              <span className="d-block small text-white-50">Tải app nhận thêm</span>
              <strong className="text-warning">Xu thưởng & Ưu đãi 500k</strong>
            </div>
            <div className="bg-white p-1.5 rounded-3 text-dark text-center" style={{ width: '64px', height: '64px' }}>
              <i className="bi bi-qr-code fs-1 text-primary"></i>
            </div>
          </div>
        </div>

        {/* Traveloka Unified Search Box Card */}
        <div className="card rounded-4 border-0 shadow-lg text-dark overflow-hidden p-3 p-md-4 bg-white">
          <form onSubmit={handleSearchSubmit}>
            <div className="row g-2 g-md-3">
              {/* Field 1: Destination / Hotel Name */}
              <div className="col-12 col-lg-4 position-relative">
                <label className="form-label text-secondary small fw-bold mb-1 d-flex align-items-center gap-1" style={{ fontSize: '11.5px' }}>
                  <i className="bi bi-geo-alt-fill text-danger"></i>
                  Thành phố, địa điểm hoặc tên khách sạn
                </label>
                <div
                  className="input-group p-2 rounded-3 border bg-light d-flex align-items-center cursor-pointer"
                  onClick={() => setShowCityPicker(!showCityPicker)}
                >
                  <span className="input-group-text bg-transparent border-0 p-0 me-2 text-primary fs-5">
                    <i className="bi bi-building"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-transparent border-0 p-0 fw-bold shadow-none"
                    placeholder="Bạn muốn nghỉ dưỡng ở đâu?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  <i className="bi bi-chevron-down text-secondary small"></i>
                </div>

                {/* Popular Cities Dropdown */}
                {showCityPicker && (
                  <div
                    className="position-absolute top-100 start-0 w-100 bg-white rounded-3 shadow-lg border p-2 mt-1 z-3"
                    style={{ zIndex: 1050 }}
                  >
                    <div className="small fw-bold text-secondary px-2 py-1">Điểm đến phổ biến</div>
                    <div className="row g-1">
                      {['Đà Nẵng', 'Phú Quốc', 'Nha Trang', 'Đà Lạt', 'Hà Nội', 'TP. Hồ Chí Minh', 'Vũng Tàu', 'Sapa', 'Hội An'].map((city) => (
                        <div key={city} className="col-6">
                          <button
                            type="button"
                            className="btn btn-sm btn-light w-100 text-start d-flex align-items-center gap-1 py-1.5"
                            onClick={() => {
                              setDestination(city);
                              setShowCityPicker(false);
                            }}
                          >
                            <i className="bi bi-geo-alt text-primary small"></i>
                            <span className="small">{city}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Field 2: Check-in Date & Nights */}
              <div className="col-12 col-sm-6 col-lg-3">
                <label className="form-label text-secondary small fw-bold mb-1 d-flex align-items-center gap-1" style={{ fontSize: '11.5px' }}>
                  <i className="bi bi-calendar3 text-primary"></i>
                  Ngày nhận phòng & Số đêm
                </label>
                <div className="p-2 rounded-3 border bg-light d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="date"
                      className="form-control form-control-sm bg-transparent border-0 p-0 fw-bold shadow-none"
                      style={{ width: '130px' }}
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                    />
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <select
                      className="form-select form-select-sm bg-white border small fw-bold py-0.5 px-2"
                      style={{ width: '85px', fontSize: '11.5px' }}
                      value={nights}
                      onChange={(e) => setNights(Number(e.target.value))}
                    >
                      <option value={1}>1 đêm</option>
                      <option value={2}>2 đêm</option>
                      <option value={3}>3 đêm</option>
                      <option value={4}>4 đêm</option>
                      <option value={5}>5 đêm</option>
                      <option value={7}>7 đêm</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Field 3: Guests & Rooms */}
              <div className="col-12 col-sm-6 col-lg-3 position-relative">
                <label className="form-label text-secondary small fw-bold mb-1 d-flex align-items-center gap-1" style={{ fontSize: '11.5px' }}>
                  <i className="bi bi-people-fill text-warning"></i>
                  Khách & Phòng
                </label>
                <div
                  className="p-2 rounded-3 border bg-light d-flex align-items-center justify-content-between cursor-pointer"
                  onClick={() => setShowGuestPicker(!showGuestPicker)}
                >
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-door-open text-primary fs-5"></i>
                    <div>
                      <div className="fw-bold small">{adults} Người lớn, {children} Trẻ em</div>
                      <div className="text-secondary" style={{ fontSize: '11px' }}>{rooms} Phòng</div>
                    </div>
                  </div>
                  <i className="bi bi-chevron-down text-secondary small"></i>
                </div>

                {/* Guest Picker Popover */}
                {showGuestPicker && (
                  <div
                    className="position-absolute top-100 end-0 bg-white rounded-3 shadow-lg border p-3 mt-1 z-3"
                    style={{ width: '280px', zIndex: 1050 }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                      <span className="small fw-bold">Người lớn (≥18 tuổi)</span>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                          style={{ width: '26px', height: '26px' }}
                          disabled={adults <= 1}
                          onClick={() => setAdults((a) => Math.max(1, a - 1))}
                        >
                          -
                        </button>
                        <span className="fw-bold small">{adults}</span>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                          style={{ width: '26px', height: '26px' }}
                          onClick={() => setAdults((a) => a + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                      <span className="small fw-bold">Trẻ em (0-17 tuổi)</span>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                          style={{ width: '26px', height: '26px' }}
                          disabled={children <= 0}
                          onClick={() => setChildren((c) => Math.max(0, c - 1))}
                        >
                          -
                        </button>
                        <span className="fw-bold small">{children}</span>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                          style={{ width: '26px', height: '26px' }}
                          onClick={() => setChildren((c) => c + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="small fw-bold">Số phòng</span>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                          style={{ width: '26px', height: '26px' }}
                          disabled={rooms <= 1}
                          onClick={() => setRooms((r) => Math.max(1, r - 1))}
                        >
                          -
                        </button>
                        <span className="fw-bold small">{rooms}</span>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                          style={{ width: '26px', height: '26px' }}
                          onClick={() => setRooms((r) => r + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary btn-sm w-100 fw-bold rounded-pill"
                      style={{ backgroundColor: '#0194f3', borderColor: '#0194f3' }}
                      onClick={() => setShowGuestPicker(false)}
                    >
                      Xong
                    </button>
                  </div>
                )}
              </div>

              {/* Field 4: Search Button */}
              <div className="col-12 col-lg-2 d-flex align-items-end">
                <button
                  type="submit"
                  className="btn btn-warning w-100 fw-bold py-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2 text-white shadow"
                  style={{
                    backgroundColor: '#ff5e1f',
                    borderColor: '#ff5e1f',
                    minHeight: '48px',
                    fontSize: '15px',
                  }}
                >
                  <i className="bi bi-search fs-5"></i>
                  <span>Tìm Khách Sạn</span>
                </button>
              </div>
            </div>

            {/* Quick check options underneath */}
            <div className="d-flex flex-wrap align-items-center gap-3 gap-md-4 pt-3 border-top mt-3 small text-secondary">
              <div className="form-check mb-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="freeCancelCheck"
                  checked={freeCancelOnly}
                  onChange={(e) => setFreeCancelOnly(e.target.checked)}
                />
                <label className="form-check-label cursor-pointer" htmlFor="freeCancelCheck">
                  <i className="bi bi-shield-check text-success me-1"></i> Miễn phí hủy phòng
                </label>
              </div>

              <div className="form-check mb-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="payAtHotelCheck"
                  checked={payAtHotelOnly}
                  onChange={(e) => setPayAtHotelOnly(e.target.checked)}
                />
                <label className="form-check-label cursor-pointer" htmlFor="payAtHotelCheck">
                  <i className="bi bi-cash-coin text-warning me-1"></i> Thanh toán tại khách sạn
                </label>
              </div>

              <span className="ms-auto text-primary small d-none d-md-inline">
                Trả phòng dự kiến: <strong>{calculateCheckOutDate()}</strong>
              </span>
            </div>
          </form>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. TRAVELOKA COUPONS & VOUCHERS SECTION                  */}
      {/* ======================================================== */}
      <section className="p-3 p-md-4 bg-light border-bottom">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-ticket-perforated-fill fs-4 text-danger"></i>
            <div>
              <h3 className="h6 fw-bold mb-0">Mã Giảm Giá & Khuyến Mãi Độc Quyền</h3>
              <span className="text-secondary small" style={{ fontSize: '12px' }}>
                Sao chép mã voucher và áp dụng ngay ở bước thanh toán
              </span>
            </div>
          </div>
          <span className="badge bg-danger text-white rounded-pill px-2.5 py-1 small">Mới cập nhật</span>
        </div>

        <div className="row g-2 g-md-3">
          {VOUCHERS.map((v) => (
            <div key={v.id} className="col-12 col-md-4">
              <div className="card rounded-3 border bg-white p-3 shadow-sm h-100 d-flex flex-column justify-content-between position-relative overflow-hidden">
                <div
                  className="position-absolute top-0 end-0 px-2 py-0.5 text-white fw-bold"
                  style={{ backgroundColor: v.color, fontSize: '10px', borderRadius: '0 0 0 8px' }}
                >
                  {v.badge}
                </div>
                <div>
                  <h4 className="fw-bold text-dark mb-1" style={{ fontSize: '14.5px' }}>{v.title}</h4>
                  <p className="text-secondary small mb-2" style={{ fontSize: '11.5px' }}>{v.desc}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                  <div className="font-monospace fw-bold text-primary small bg-light px-2 py-1 rounded border">
                    {v.code}
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 fw-bold"
                    style={{ borderColor: v.color, color: v.color }}
                    onClick={() => handleCopyCoupon(v.code)}
                  >
                    {copiedCoupon === v.code ? (
                      <span><i className="bi bi-check2"></i> Đã chép</span>
                    ) : (
                      <span>Sao chép</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. POPULAR DESTINATIONS IN VIETNAM                       */}
      {/* ======================================================== */}
      <section className="p-3 p-md-4 border-bottom">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h3 className="h6 fw-bold mb-0">Điểm Đến Thịnh Hành Tại Việt Nam</h3>
            <span className="text-secondary small" style={{ fontSize: '12px' }}>
              Những điểm đến hấp dẫn được đặt phòng nhiều nhất tuần này
            </span>
          </div>
          <button
            type="button"
            className="btn btn-link text-primary p-0 text-decoration-none small fw-bold"
            onClick={handleSearchSubmit}
          >
            Xem tất cả <i className="bi bi-arrow-right"></i>
          </button>
        </div>

        <div className="row g-2 g-md-3">
          {POPULAR_DESTINATIONS.map((dest) => (
            <div key={dest.id} className="col-6 col-md-4 col-lg-2">
              <div
                className="card rounded-3 border-0 shadow-sm overflow-hidden h-100 cursor-pointer tv-card-hover position-relative"
                onClick={() => {
                  setDestination(dest.name);
                  if (onSearch) {
                    onSearch({ destination: dest.name, dates: `${checkInDate} (${nights} đêm)`, guests: `${adults} khách`, category: 'hotel' });
                  }
                }}
              >
                <div style={{ height: '120px' }}>
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="p-2 bg-white">
                  <h4 className="fw-bold mb-0 text-truncate" style={{ fontSize: '13px' }}>{dest.name}</h4>
                  <div className="text-secondary small" style={{ fontSize: '10.5px' }}>{dest.hotelsCount}</div>
                  <div className="text-danger fw-bold mt-1" style={{ fontSize: '11.5px', color: '#ff5e1f' }}>
                    Từ {dest.priceFrom}đ
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. TOP REVIEWED & RECOMMENDED HOTELS                     */}
      {/* ======================================================== */}
      <section className="p-3 p-md-4 border-bottom bg-white">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h3 className="h6 fw-bold mb-0 d-flex align-items-center gap-2">
              <i className="bi bi-stars text-warning"></i>
              Khách Sạn & Resort Nổi Bật Được Đánh Giá Cao
            </h3>
            <span className="text-secondary small" style={{ fontSize: '12px' }}>
              Dịch vụ tiêu chuẩn quốc tế, tiện nghi cao cấp và ưu đãi độc quyền
            </span>
          </div>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-bold"
            onClick={handleSearchSubmit}
          >
            Khám phá thêm
          </button>
        </div>

        <div className="row g-3">
          {RECOMMENDED_HOTELS.map((hotel) => (
            <div key={hotel.id} className="col-12 col-md-6 col-lg-3">
              <div
                className="card rounded-4 border shadow-sm overflow-hidden h-100 cursor-pointer tv-card-hover d-flex flex-column justify-content-between"
                onClick={() => onSelectHotel && onSelectHotel(hotel)}
              >
                <div>
                  {/* Hotel Photo & Badges */}
                  <div className="position-relative" style={{ height: '170px' }}>
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
                      onClick={(e) => toggleFavorite(e, hotel.id)}
                    >
                      <i
                        className={`bi ${
                          favorites.includes(hotel.id)
                            ? 'bi-heart-fill text-danger'
                            : 'bi-heart text-secondary'
                        }`}
                      ></i>
                    </button>
                    <span
                      className="badge bg-dark bg-opacity-75 text-white position-absolute bottom-0 end-0 m-2"
                      style={{ fontSize: '10px' }}
                    >
                      <i className="bi bi-camera me-1"></i> Ảnh thực tế
                    </span>
                  </div>

                  {/* Hotel Info */}
                  <div className="p-3">
                    <div className="d-flex align-items-center gap-1 mb-1">
                      {[...Array(hotel.stars)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill text-warning" style={{ fontSize: '11px' }}></i>
                      ))}
                      <span className="badge bg-light text-secondary ms-1" style={{ fontSize: '9.5px' }}>Khách sạn {hotel.stars}★</span>
                    </div>

                    <h4 className="fw-bold mb-1 text-dark" style={{ fontSize: '14px', lineHeight: '1.3' }}>
                      {hotel.name}
                    </h4>

                    <p className="text-secondary small mb-2 text-truncate" style={{ fontSize: '11.5px' }}>
                      <i className="bi bi-geo-alt me-1 text-danger"></i>
                      {hotel.location}
                    </p>

                    {/* Review Score */}
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="tv-badge-rating small" style={{ fontSize: '11px' }}>
                        <i className="bi bi-star-fill"></i> {hotel.rating}
                      </span>
                      <span className="small fw-bold text-primary" style={{ fontSize: '11.5px' }}>
                        {hotel.reviewLabel}
                      </span>
                      <span className="text-secondary small" style={{ fontSize: '11px' }}>
                        ({hotel.reviewsCount})
                      </span>
                    </div>

                    {/* Features list */}
                    <div className="d-flex flex-column gap-1 mb-2">
                      {hotel.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="small text-success d-flex align-items-center gap-1" style={{ fontSize: '11px' }}>
                          <i className="bi bi-check-circle-fill"></i>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="p-3 pt-0 border-top mt-2">
                  <div className="d-flex justify-content-between align-items-end pt-2">
                    <div>
                      <span className="text-decoration-line-through text-secondary small d-block" style={{ fontSize: '11px' }}>
                        {formatVND(hotel.originalPrice)}
                      </span>
                      <div className="d-flex align-items-center gap-1">
                        <span className="badge bg-danger-subtle text-danger fw-bold" style={{ fontSize: '10px' }}>
                          -{hotel.discount}
                        </span>
                        <span className="fw-bold text-danger fs-6" style={{ color: '#ff5e1f' }}>
                          {formatVND(hotel.price)}
                        </span>
                      </div>
                      <span className="text-secondary" style={{ fontSize: '10px' }}>/ đêm (chưa gồm thuế)</span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-warning btn-sm fw-bold px-3 py-1.5 rounded-pill text-white shadow-sm"
                      style={{ backgroundColor: '#ff5e1f', borderColor: '#ff5e1f' }}
                    >
                      Đặt phòng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. WHY TRAVELOKA PILLARS SECTION                         */}
      {/* ======================================================== */}
      <section className="p-3 p-md-4 bg-light border-bottom">
        <h3 className="h6 fw-bold mb-3 text-center">Lý Do Nên Đặt Chỗ Cùng Traveloka</h3>
        <div className="row g-3">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 border h-100 text-center">
              <div className="rounded-circle p-2.5 mx-auto mb-2 bg-primary-subtle text-primary" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-cash-stack fs-4"></i>
              </div>
              <h4 className="fw-bold mb-1" style={{ fontSize: '13.5px' }}>Giá Cả Minh Bạch</h4>
              <p className="text-secondary small mb-0" style={{ fontSize: '11.5px' }}>
                Giá hiển thị đã bao gồm thuế phí. Cam kết không phụ phí ẩn bất ngờ.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 border h-100 text-center">
              <div className="rounded-circle p-2.5 mx-auto mb-2 bg-warning-subtle text-warning" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-credit-card fs-4"></i>
              </div>
              <h4 className="fw-bold mb-1" style={{ fontSize: '13.5px' }}>50+ Phương Thức Thanh Toán</h4>
              <p className="text-secondary small mb-0" style={{ fontSize: '11.5px' }}>
                Hỗ trợ VietQR, MoMo, ZaloPay, Thẻ tín dụng, Thẻ ATM và thanh toán tại KS.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 border h-100 text-center">
              <div className="rounded-circle p-2.5 mx-auto mb-2 bg-success-subtle text-success" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-headset fs-4"></i>
              </div>
              <h4 className="fw-bold mb-1" style={{ fontSize: '13.5px' }}>Hỗ Trợ 24/7 Bằng Tiếng Việt</h4>
              <p className="text-secondary small mb-0" style={{ fontSize: '11.5px' }}>
                Đội ngũ chăm sóc khách hàng tận tâm đồng hành trong suốt chuyến đi.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 border h-100 text-center">
              <div className="rounded-circle p-2.5 mx-auto mb-2 bg-info-subtle text-info" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-shield-check fs-4"></i>
              </div>
              <h4 className="fw-bold mb-1" style={{ fontSize: '13.5px' }}>Đổi Lịch & Hủy Phòng Dễ Dàng</h4>
              <p className="text-secondary small mb-0" style={{ fontSize: '11.5px' }}>
                Chính sách linh hoạt giúp bạn hoàn toàn an tâm khi có sự cố phát sinh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. DESKTOP RICH FOOTER & PARTNERS                       */}
      {/* ======================================================== */}
      <footer className="p-3 p-md-4 bg-dark text-white">
        <div className="row g-3 pb-3 border-bottom border-secondary mb-3">
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center text-white"
                style={{ width: '32px', height: '32px', backgroundColor: '#0194f3' }}
              >
                <i className="bi bi-send-fill" style={{ transform: 'rotate(-25deg)' }}></i>
              </div>
              <span className="fw-bold fs-5 text-white">traveloka</span>
            </div>
            <p className="small text-white-50 mb-2" style={{ fontSize: '11.5px' }}>
              Nền tảng du lịch hàng đầu Đông Nam Á, mang đến cho bạn hàng triệu lựa chọn khách sạn, chuyến bay và trải nghiệm đáng nhớ.
            </p>
            <div className="d-flex gap-2">
              <span className="badge bg-secondary">PCI-DSS Compliant</span>
              <span className="badge bg-secondary">IATA Member</span>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <h5 className="small fw-bold text-white text-uppercase mb-2" style={{ fontSize: '12px' }}>Sản phẩm</h5>
            <ul className="list-unstyled small text-white-50 d-flex flex-column gap-1" style={{ fontSize: '11.5px' }}>
              <li>Khách sạn</li>
              <li>Vé máy bay</li>
              <li>Vé xe khách</li>
              <li>Đưa đón sân bay</li>
              <li>Xperience</li>
            </ul>
          </div>

          <div className="col-6 col-md-2">
            <h5 className="small fw-bold text-white text-uppercase mb-2" style={{ fontSize: '12px' }}>Về Traveloka</h5>
            <ul className="list-unstyled small text-white-50 d-flex flex-column gap-1" style={{ fontSize: '11.5px' }}>
              <li>Giới thiệu</li>
              <li>Cơ hội nghề nghiệp</li>
              <li>Hợp tác khách sạn</li>
              <li>Điều khoản sử dụng</li>
              <li>Chính sách bảo mật</li>
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <h5 className="small fw-bold text-white text-uppercase mb-2" style={{ fontSize: '12px' }}>Đối tác thanh toán uy tín</h5>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="badge bg-light text-dark fw-bold px-2 py-1">VietQR</span>
              <span className="badge bg-light text-dark fw-bold px-2 py-1">MoMo</span>
              <span className="badge bg-light text-dark fw-bold px-2 py-1">ZaloPay</span>
              <span className="badge bg-light text-dark fw-bold px-2 py-1">VISA</span>
              <span className="badge bg-light text-dark fw-bold px-2 py-1">Mastercard</span>
              <span className="badge bg-light text-dark fw-bold px-2 py-1">Napas</span>
            </div>
            <span className="d-block small text-white-50" style={{ fontSize: '11px' }}>
              © 2026 Traveloka - Azure Horizon Booking Suite. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* 8. MOBILE STICKY BOTTOM NAVIGATION BAR                   */}
      {/* ======================================================== */}
      <nav className="d-lg-none bg-white border-top py-2 px-3 d-flex align-items-center justify-content-around sticky-bottom shadow-lg" style={{ zIndex: 1040 }}>
        <button
          type="button"
          className="btn btn-warning text-white fw-bold rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5 shadow-sm"
          style={{ backgroundColor: '#ff5e1f', borderColor: '#ff5e1f', fontSize: '12px' }}
          onClick={() => setActiveBottomTab('explore')}
        >
          <i className="bi bi-search"></i>
          <span>Khám phá</span>
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
          <span style={{ fontSize: '10.5px' }}>Đặt chỗ</span>
        </button>

        <button
          type="button"
          className={`btn btn-link p-0 text-decoration-none d-flex flex-column align-items-center position-relative ${
            activeBottomTab === 'cart' ? 'text-primary fw-bold' : 'text-secondary'
          }`}
          onClick={() => {
            setActiveBottomTab('cart');
            if (onNavigateToCart) onNavigateToCart();
          }}
        >
          <i className="bi bi-cart3 fs-5"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '8px' }}>
            2
          </span>
          <span style={{ fontSize: '10.5px' }}>Giỏ hàng</span>
        </button>

        <button
          type="button"
          className={`btn btn-link p-0 text-decoration-none d-flex flex-column align-items-center ${
            activeBottomTab === 'chat' ? 'text-primary fw-bold' : 'text-secondary'
          }`}
          onClick={() => {
            setActiveBottomTab('chat');
            if (onNavigateToMessages) onNavigateToMessages();
          }}
        >
          <i className="bi bi-chat-dots fs-5"></i>
          <span style={{ fontSize: '10.5px' }}>Tin nhắn</span>
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
          <span style={{ fontSize: '10.5px' }}>Tài khoản</span>
        </button>
      </nav>
    </div>
  );
};
