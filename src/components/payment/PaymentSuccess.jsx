import React from "react";

export const PaymentSuccess = ({paymentMethod, onBack}) => {
    
    const formatVND = (num) => new Intl.NumberFormat('vi-VN').format(num) + ' ₫'
    return (
        <>
            <div className="bg-white p-4 p-md-5 rounded-4 border text-center my-3 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
                <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white"
                    style={{ width: '72px', height: '72px', backgroundColor: '#00b14f' }}
                >
                    <i className="bi bi-check-lg" style={{ fontSize: '2.5rem' }}></i>
                </div>
                <h3 className="h5 fw-bold text-dark mb-1">Thanh Toán Đặt Phòng Thành Công!</h3>
                <p className="text-secondary small mb-3">
                    Cảm ơn bạn đã lựa chọn <strong>Traveloka</strong>. Vé điện tử và phiếu xác nhận phòng đã được gửi tới email <strong>vanan.nguyen@example.com</strong>.
                </p>
                <div className="bg-light p-3 rounded-3 border mb-4 text-start small">
                    <div className="d-flex justify-content-between mb-1.5">
                        <span className="text-secondary">Khách sạn:</span>
                        <strong className="text-dark">Horizon Luxury Resort & Spa Da Nang</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-1.5">
                        <span className="text-secondary">Phương thức:</span>
                        <strong className="text-primary text-uppercase">{paymentMethod}</strong>
                    </div>
                    <div className="d-flex justify-content-between pt-2 border-top">
                        <span className="text-secondary">Tổng tiền đã thanh toán:</span>
                        <strong className="text-danger fs-6" style={{ color: '#ff5e1f' }}>{formatVND(10068000)}</strong>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-warning w-100 rounded-pill py-2.5 fw-bold text-white shadow-sm"
                    style={{ backgroundColor: '#ff5e1f', borderColor: '#ff5e1f' }}
                    onClick={onBack}
                >
                    Quay lại Trang Chủ Traveloka
                </button>
            </div>
        </>
    )
}