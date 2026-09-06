import React from "react";
export const Coupon = ({ error, loading, vouchers, copiedCoupon, handleCopyCoupon }) => {
    const formatVND = (num) => {
        return new Intl.NumberFormat('vi-VN').format(num) + ' ₫';
    };

    return (
        <>
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

                {loading && <p className="text-secondary small">Đang tải dữ liệu điểm đến...</p>}
                {error && <p className="text-danger small">Lỗi khi tải dữ liệu điểm đến: {error.message}</p>}
                <div className="row g-2 g-md-3">
                    {!loading && !error && vouchers.length > 0 && vouchers.map((v) => (
                        <div key={v.voucherId} className="col-12 col-md-4">
                            <div className="card rounded-3 border bg-white p-3 shadow-sm h-100 d-flex flex-column justify-content-between position-relative overflow-hidden">
                                <div
                                    className="position-absolute top-0 end-0 px-2 py-0.5 text-white fw-bold"
                                    style={{ backgroundColor: '#0194f3', fontSize: '10px', borderRadius: '0 0 0 8px' }}
                                >
                                    {v.label}
                                </div>
                                <div>
                                    <h4 className="fw-bold text-dark mb-1" style={{ fontSize: '14.5px' }}>{v.description}</h4>
                                    <p className="text-secondary small mb-2" style={{ fontSize: '11.5px' }}> {v.discountAmount ? `${formatVND(v.discountAmount)} OFF` : ''}</p>
                                </div>
                                <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                                    <div className="font-monospace fw-bold text-primary small bg-light px-2 py-1 rounded border">
                                        {v.code}
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 fw-bold"
                                        style={{ borderColor: '#0194f3', color: '#0194f3' }}
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
        </>
    )
}