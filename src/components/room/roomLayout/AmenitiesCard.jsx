import React from 'react';

export const AMENITIES_LIST = [
  { id: 'wifi', label: 'Wi-Fi', iconName: 'bi-wifi' },
  { id: 'ac', label: 'Máy lạnh', iconName: 'bi-snow' },
  { id: 'breakfast', label: 'Bữa sáng', iconName: 'bi-cup-hot' },
  { id: 'tv', label: 'TV', iconName: 'bi-tv' },
  { id: 'balcony', label: 'Ban công', iconName: 'bi-window-dock' },
];

export const AmenitiesCard = ({ selectedAmenities = [], onToggleAmenity }) => {
  return (
    <div className="card form-card p-3 mb-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="h6 fw-bold mb-0 text-dark">Tiện nghi</h2>
        <span className="badge bg-light text-secondary fw-normal border">
          Đã chọn: {selectedAmenities.length}
        </span>
      </div>

      <div className="row g-2">
        {AMENITIES_LIST.map((item) => {
          const isSelected = selectedAmenities.includes(item.id);

          return (
            <div key={item.id} className="col-6">
              <div
                id={`amenity-item-${item.id}`}
                className={`amenity-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onToggleAmenity(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onToggleAmenity(item.id);
                  }
                }}
              >
                <i className={`bi ${item.iconName} amenity-icon`}></i>
                <p className="amenity-title">{item.label}</p>
                {isSelected && (
                  <span className="position-absolute top-0 end-0 p-1 me-1 text-primary">
                    <i className="bi bi-check-circle-fill" style={{ fontSize: '12px' }}></i>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
