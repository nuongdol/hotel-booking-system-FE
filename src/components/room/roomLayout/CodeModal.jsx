import React, { useState } from 'react';

export const CodeModal = ({ show, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!show) return null;

  const sampleCode = `import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function AddRoomForm() {
  const [roomData, setRoomData] = useState({
    name: '',
    type: 'Deluxe',
    guestCount: 2,
    area: 25,
    amenities: ['wifi', 'ac'],
    images: []
  });

  const toggleAmenity = (id) => {
    setRoomData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(id)
        ? prev.amenities.filter(item => item !== id)
        : [...prev.amenities, id]
    }));
  };

  return (
    <div className="container py-4" style={{ maxWidth: '420px' }}>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between py-2 mb-3">
        <button className="btn btn-link text-dark p-0"><i className="bi bi-arrow-left fs-5"></i></button>
        <h5 className="fw-bold mb-0">Thêm Phòng Mới</h5>
        <button className="btn btn-link text-secondary p-0"><i className="bi bi-question-circle fs-5"></i></button>
      </div>

      {/* Thông tin cơ bản */}
      <div className="card p-3 mb-3 border rounded-3 shadow-sm">
        <h6 className="fw-bold mb-3">Thông tin cơ bản</h6>
        <div className="mb-3">
          <label className="form-label small fw-medium">Tên phòng</label>
          <input
            className="form-control"
            placeholder="VD: Deluxe Double Room"
            value={roomData.name}
            onChange={e => setRoomData({ ...roomData, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label small fw-medium">Loại phòng</label>
          <select
            className="form-select"
            value={roomData.type}
            onChange={e => setRoomData({ ...roomData, type: e.target.value })}
          >
            <option value="Standard">Phòng Standard</option>
            <option value="Deluxe">Phòng Deluxe</option>
            <option value="Suite">Phòng Suite</option>
          </select>
        </div>
        <div className="row g-2">
          <div className="col-6">
            <label className="form-label small fw-medium">Số lượng khách</label>
            <div className="input-group">
              <span className="input-group-text bg-white"><i className="bi bi-person"></i></span>
              <input
                type="number"
                className="form-control"
                value={roomData.guestCount}
                onChange={e => setRoomData({ ...roomData, guestCount: e.target.value })}
              />
            </div>
          </div>
          <div className="col-6">
            <label className="form-label small fw-medium">Diện tích phòng (m²)</label>
            <div className="input-group">
              <span className="input-group-text bg-white"><i className="bi bi-triangle"></i></span>
              <input
                type="number"
                className="form-control"
                value={roomData.area}
                onChange={e => setRoomData({ ...roomData, area: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tiện nghi */}
      <div className="card p-3 mb-3 border rounded-3 shadow-sm">
        <h6 className="fw-bold mb-3">Tiện nghi</h6>
        <div className="row g-2">
          {[
            { id: 'wifi', label: 'Wi-Fi', icon: 'bi-wifi' },
            { id: 'ac', label: 'Máy lạnh', icon: 'bi-snow' },
            { id: 'breakfast', label: 'Bữa sáng', icon: 'bi-cup-hot' },
            { id: 'tv', label: 'TV', icon: 'bi-tv' },
            { id: 'balcony', label: 'Ban công', icon: 'bi-window-dock' },
          ].map(item => {
            const isSelected = roomData.amenities.includes(item.id);
            return (
              <div key={item.id} className="col-6">
                <div
                  className={'card p-3 text-center ' + (isSelected ? 'border-primary bg-light text-primary' : '')}
                  onClick={() => toggleAmenity(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <i className={'bi ' + item.icon + ' fs-4 mb-1'}></i>
                  <span className="small fw-medium">{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Button */}
      <button className="btn btn-primary w-100 py-3 fw-bold rounded-3">
        Lưu & Tiếp tục
      </button>
    </div>
  );
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: 1060 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg px-3">
        <div className="modal-content rounded-4 border-0 shadow">
          <div className="modal-header border-bottom py-3 px-4">
            <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
              <i className="bi bi-code-slash text-primary"></i>
              Mã nguồn ReactJS (JSX) + Bootstrap
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4 bg-dark rounded-bottom-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-light small font-monospace">AddRoomForm.jsx</span>
              <button
                type="button"
                className="btn btn-sm btn-outline-light d-flex align-items-center gap-1"
                onClick={handleCopy}
              >
                <i className={`bi ${copied ? 'bi-check2' : 'bi-clipboard'}`}></i>
                {copied ? 'Đã sao chép!' : 'Sao chép mã'}
              </button>
            </div>
            <pre
              className="text-white bg-black p-3 rounded-3 overflow-auto small mb-0"
              style={{ maxHeight: '420px', fontSize: '12.5px', lineHeight: '1.45' }}
            >
              <code>{sampleCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
