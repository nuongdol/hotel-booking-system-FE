import React from "react";

export const HeaderHome = ({onNavigateToDashboard, setActiveBottomTab,onNavigateToMessages, selectedCategory, onNavigateToCart, onNavigateToBookings, onNavigateToAuth, CATEGORIES }) => {
    return (
        <>
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
                                    className={`btn btn-sm rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5 border transition-all text-nowrap ${isSelected
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
                                            className={`badge rounded-pill ms-1 ${isSelected ? 'bg-warning text-dark' : 'bg-danger text-white'
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
        </>
    )
}