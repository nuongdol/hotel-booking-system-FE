import React from 'react'
export const HeaderBooking = ({ onBack }) => {
    return (
        <div>
            {/* 1. Header */}
            <header className="d-flex align-items-center justify-content-between py-3 px-4 bg-white border-bottom sticky-top">
                <div className="d-flex align-items-center gap-3">
                    <button
                        type="button"
                        id="btn-booking-back"
                        className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center border"
                        onClick={onBack}
                        style={{ width: '36px', height: '36px' }}
                        aria-label="Quay lại"
                    >
                        <i className="bi bi-arrow-left fs-5"></i>
                    </button>
                    <div>
                        <h1 className="h6 fw-bold mb-0 text-dark" style={{ fontSize: '1.2rem' }}>
                            Xác Nhận Đặt Phòng
                        </h1>
                        <span className="text-secondary small" style={{ fontSize: '11.5px' }}>
                            Vui lòng kiểm tra lại thông tin khách lưu trú và chi tiết đặt phòng
                        </span>
                    </div>
                </div>

                <span className="badge bg-success-subtle text-success fw-bold px-3 py-1.5 rounded-pill d-none d-sm-inline">
                    <i className="bi bi-shield-check me-1"></i> Đặt phòng được đảm bảo 100%
                </span>
            </header>
        </div>
    );
}