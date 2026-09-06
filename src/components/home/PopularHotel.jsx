import React from "react";
import { useNavigate } from "react-router-dom";

export const PopularHotel = ({ handleSearchSubmit, error, loading, citys = [], onSearch, setCity, checkInDate, totalNights, adults, formatVND }) => {
    const navigate = useNavigate();
    return (
        <>
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

                {loading && <p className="text-secondary small">Đang tải dữ liệu điểm đến...</p>}
                {error && <p className="text-danger small">Lỗi khi tải dữ liệu điểm đến: {error.message}</p>}

                {!loading && !error &&
                    (<div className="row g-2 g-md-3">
                        {citys.length > 0 && citys.map((dest) => (
                            <div key={dest.cityId} className="col-6 col-md-4 col-lg-2">
                                <div
                                    className="card rounded-3 border-0 shadow-sm overflow-hidden h-100 cursor-pointer tv-card-hover position-relative"
                                    onClick={() => {
                                        // Chỉ gọi setCity nếu nó thực sự là một function
                                        if (typeof setCity === 'function') {
                                            setCity(dest.name);
                                            console.log(dest.name)
                                        }

                                        if (typeof onSearch === 'function') {
                                            onSearch({
                                                destination: dest.name,
                                                dates: `${checkInDate} (${totalNights} đêm)`,
                                                guests: `${adults} khách`,
                                                category: 'hotel'
                                            });
                                        }
                                        // Luôn luôn chuyển hướng trang
                                        navigate(`/lst-hotel?destination=${encodeURIComponent(dest.name)}`);
                                    }}
                                >
                                    <div style={{ height: '120px' }}>
                                        <img
                                            src={dest.imageUrl}
                                            alt={dest.name}
                                            className="w-100 h-100 object-fit-cover"
                                        />
                                    </div>
                                    <div className="p-2 bg-white">
                                        <h4 className="fw-bold mb-0 text-truncate" style={{ fontSize: '13px' }}>{dest.name}</h4>
                                        <div className="text-secondary small" style={{ fontSize: '10.5px' }}>{dest.hotelsCount}+ Chỗ nghỉ</div>
                                        <div className="text-danger fw-bold mt-1" style={{ fontSize: '11.5px', color: '#ff5e1f' }}>
                                            {dest.minPrice ? `Từ ${formatVND(dest.minPrice)}` : '500.000 ₫'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    )}
            </section>
        </>
    )
}