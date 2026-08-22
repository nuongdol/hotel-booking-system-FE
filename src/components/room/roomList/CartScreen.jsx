import React, { useState } from 'react';

const INITIAL_CART_ITEMS = [
  {
    id: 'cart-1',
    name: 'Horizon Luxury Resort & Spa Da Nang',
    location: 'Bãi biển Mỹ Khê, Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80',
    dates: '25 Thg 8 - 28 Thg 8, 2026',
    nights: 3,
    guests: '2 Người lớn',
    roomType: 'Deluxe Ocean View Double Suite',
    pricePerNight: 3200000,
    freeCancel: true,
  },
  {
    id: 'cart-2',
    name: 'Peridot Grand Luxury Boutique Hotel',
    location: 'Quận Hoàn Kiếm, Hà Nội',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=700&q=80',
    dates: '02 Thg 9 - 04 Thg 9, 2026',
    nights: 2,
    guests: '2 Người lớn',
    roomType: 'Premier City View Room',
    pricePerNight: 2800000,
    freeCancel: true,
  },
];

export const CartScreen = ({ onProceedToCheckout, onNavigateToExplore, onNavigateToBookings, onNavigateToProfile }) => {
  const [items, setItems] = useState(INITIAL_CART_ITEMS);
  const [couponCode, setCouponCode] = useState('TRAVELOKA300');
  const [discount, setDiscount] = useState(300000);

  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + item.pricePerNight * item.nights, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = Math.max(0, subtotal + tax - discount);

  const formatVND = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative pb-2">
      {/* 1. Top Header */}
      <header className="d-flex align-items-center justify-content-between p-3 px-4 bg-white border-bottom sticky-top">
        <div className="d-flex align-items-center gap-2">
          {onNavigateToExplore && (
            <button
              type="button"
              className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center border"
              style={{ width: '34px', height: '34px' }}
              onClick={onNavigateToExplore}
              title="Quay lại khám phá"
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          )}
          <div>
            <h1 className="h6 fw-bold mb-0 text-dark" style={{ fontSize: '1.2rem' }}>
              Giỏ Hàng Đặt Chỗ
            </h1>
            <span className="text-secondary small" style={{ fontSize: '11.5px' }}>
              Bạn đang có <strong>{items.length}</strong> khách sạn trong giỏ hàng
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-warning text-dark fw-bold px-3 py-1.5 rounded-pill">
            <i className="bi bi-cart3 me-1"></i> {items.length} Chỗ nghỉ
          </span>
        </div>
      </header>

      {/* 2. Main Cart Content (Desktop 2-Column) */}
      <div className="p-3 p-md-4 bg-light">
        {items.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 border p-4 shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
            <div className="rounded-circle bg-light p-3 d-inline-flex mb-3 text-secondary">
              <i className="bi bi-cart-x fs-1"></i>
            </div>
            <h3 className="h6 fw-bold text-dark mb-1">Giỏ hàng của bạn đang trống</h3>
            <p className="text-secondary small mb-4">
              Hãy khám phá các khách sạn, resort sang trọng và thêm vào giỏ hàng để nhận ưu đãi từ Traveloka.
            </p>
            <button
              type="button"
              className="btn btn-warning rounded-pill px-4 py-2 fw-bold text-white shadow-sm"
              style={{ backgroundColor: '#ff5e1f', borderColor: '#ff5e1f' }}
              onClick={onNavigateToExplore}
            >
              Khám phá khách sạn ngay
            </button>
          </div>
        ) : (
          <div className="row g-3 g-lg-4">
            {/* LEFT COLUMN: CART ITEMS LIST */}
            <div className="col-12 col-lg-8">
              <div className="d-flex flex-column gap-3">
                {items.map((item) => {
                  const itemTotal = item.pricePerNight * item.nights;
                  return (
                    <div key={item.id} className="card rounded-4 border bg-white shadow-sm overflow-hidden">
                      <div className="row g-0">
                        <div className="col-12 col-sm-4 position-relative" style={{ minHeight: '160px' }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-100 h-100 object-fit-cover"
                          />
                          <span
                            className="badge position-absolute top-0 start-0 m-2 rounded-pill text-white"
                            style={{ backgroundColor: '#0194f3', fontSize: '10px' }}
                          >
                            Đã lưu giá tốt
                          </span>
                        </div>

                        <div className="col-12 col-sm-8 p-3 d-flex flex-column justify-content-between">
                          <div>
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h3 className="h6 fw-bold text-dark mb-1">{item.name}</h3>
                                <p className="text-secondary small mb-2 d-flex align-items-center gap-1" style={{ fontSize: '11.5px' }}>
                                  <i className="bi bi-geo-alt text-danger"></i>
                                  {item.location}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="btn btn-link text-danger p-0 text-decoration-none small fw-semibold"
                                onClick={() => handleRemoveItem(item.id)}
                                title="Xóa khỏi giỏ hàng"
                              >
                                <i className="bi bi-trash3 me-1"></i> Xóa
                              </button>
                            </div>

                            <div className="bg-light p-2 rounded-3 small mb-2">
                              <div className="d-flex justify-content-between">
                                <span className="text-secondary">Loại phòng:</span>
                                <strong className="text-dark">{item.roomType}</strong>
                              </div>
                              <div className="d-flex justify-content-between">
                                <span className="text-secondary">Thời gian:</span>
                                <span className="text-dark fw-semibold">{item.dates} ({item.nights} đêm)</span>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex justify-content-between align-items-end pt-2 border-top">
                            <span className="text-success small fw-semibold">
                              <i className="bi bi-check-circle-fill me-1"></i> Miễn phí hủy phòng
                            </span>
                            <div className="text-end">
                              <span className="text-secondary small d-block" style={{ fontSize: '10.5px' }}>
                                {formatVND(item.pricePerNight)} / đêm
                              </span>
                              <strong className="text-danger fs-6" style={{ color: '#ff5e1f' }}>
                                {formatVND(itemTotal)}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: PRICE SUMMARY & PROMO CODE */}
            <div className="col-12 col-lg-4">
              <div className="card rounded-3 border bg-white p-3 p-md-4 shadow-sm sticky-top" style={{ top: '80px', zIndex: 10 }}>
                <h2 className="h6 fw-bold mb-3 text-dark pb-2 border-bottom">
                  Tóm Tắt Đơn Hàng
                </h2>

                {/* Coupon input */}
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold mb-1">Mã giảm giá Traveloka</label>
                  <div className="input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control text-uppercase font-monospace fw-bold"
                      placeholder="Nhập mã voucher..."
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary fw-bold"
                      onClick={() => setDiscount(300000)}
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-between small mb-2">
                  <span className="text-secondary">Tạm tính ({items.length} phòng)</span>
                  <strong className="text-dark">{formatVND(subtotal)}</strong>
                </div>

                <div className="d-flex justify-content-between small mb-2">
                  <span className="text-secondary">Thuế & Phí dịch vụ (8%)</span>
                  <strong className="text-dark">{formatVND(tax)}</strong>
                </div>

                {discount > 0 && (
                  <div className="d-flex justify-content-between small mb-3 text-success">
                    <span>Mã voucher {couponCode}</span>
                    <strong className="fw-bold">-{formatVND(discount)}</strong>
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center pt-2 border-top mb-3">
                  <div>
                    <span className="fw-bold text-dark fs-6 d-block">Tổng cộng</span>
                    <span className="text-success small" style={{ fontSize: '11px' }}>
                      Đã bao gồm thuế GTGT
                    </span>
                  </div>
                  <span className="fw-bold fs-4 text-danger" style={{ color: '#ff5e1f' }}>
                    {formatVND(total)}
                  </span>
                </div>

                <button
                  type="button"
                  className="btn btn-warning w-100 fw-bold py-3 text-white rounded-3 shadow d-flex align-items-center justify-content-center gap-2"
                  style={{ backgroundColor: '#ff5e1f', borderColor: '#ff5e1f', fontSize: '15px' }}
                  onClick={onProceedToCheckout}
                >
                  <span>Tiến Hành Đặt Phòng</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
