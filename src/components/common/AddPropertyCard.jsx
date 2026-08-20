import React, { useState } from 'react';

export const AddPropertyCard = ({ onNavigateToExplore, onNavigateToProfile }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyName: '',
    propertyType: '',
    starRating: '',
    addressLine1: '',
    city: '',
    country: 'Vietnam',
  });
  const [activeBottomNav, setActiveBottomNav] = useState('add');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative">
      {/* 1. Header with Menu & Profile Avatar */}
      <header className="d-flex align-items-center justify-content-between p-3 px-4 bg-white border-bottom">
        <button
          type="button"
          className="btn btn-link text-dark p-0 text-decoration-none"
          aria-label="Menu"
        >
          <i className="bi bi-list fs-4"></i>
        </button>

        <h1 className="h6 fw-bold mb-0 text-primary" style={{ color: '#0062a3', fontSize: '1.15rem' }}>
          Azure Horizon
        </h1>

        <div className="rounded-circle overflow-hidden border" style={{ width: '34px', height: '34px' }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="User avatar"
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </header>

      {/* 2. Main Title & Subtitle */}
      <div className="p-4 pb-2">
        <h2 className="h5 fw-bold text-dark mb-1" style={{ fontSize: '1.35rem' }}>
          Add New Property
        </h2>
        <p className="text-secondary small mb-3">
          Complete the steps below to list your hotel on Azure Horizon.
        </p>

        {/* Stepper */}
        <div className="d-flex align-items-center justify-content-between position-relative mb-4 px-2">
          {/* Connector Line */}
          <div
            className="position-absolute top-50 start-0 end-0 translate-middle-y bg-light"
            style={{ height: '2px', zIndex: 0 }}
          ></div>

          {/* Step 1 */}
          <div
            className="d-flex flex-column align-items-center position-relative"
            style={{ zIndex: 1, cursor: 'pointer' }}
            onClick={() => setCurrentStep(1)}
          >
            <div
              className={`rounded-circle d-flex align-items-center justify-content-center text-white fw-bold mb-1 shadow-sm ${
                currentStep >= 1 ? 'bg-primary' : 'bg-secondary'
              }`}
              style={{
                width: '28px',
                height: '28px',
                fontSize: '13px',
                backgroundColor: currentStep >= 1 ? '#0062a3' : '#6c757d',
              }}
            >
              1
            </div>
            <span
              className={`small fw-semibold ${currentStep === 1 ? 'text-primary' : 'text-secondary'}`}
              style={{
                fontSize: '12px',
                borderBottom: currentStep === 1 ? '2px solid #0062a3' : 'none',
                paddingBottom: '2px',
              }}
            >
              General Info
            </span>
          </div>

          {/* Step 2 */}
          <div
            className="d-flex flex-column align-items-center position-relative"
            style={{ zIndex: 1, cursor: 'pointer' }}
            onClick={() => setCurrentStep(2)}
          >
            <div
              className={`rounded-circle d-flex align-items-center justify-content-center text-white fw-bold mb-1 shadow-sm ${
                currentStep >= 2 ? 'bg-primary' : 'bg-secondary-subtle text-secondary'
              }`}
              style={{
                width: '28px',
                height: '28px',
                fontSize: '13px',
                backgroundColor: currentStep >= 2 ? '#0062a3' : '#e2e8f0',
                color: currentStep >= 2 ? '#fff' : '#64748b',
              }}
            >
              2
            </div>
            <span
              className={`small fw-semibold ${currentStep === 2 ? 'text-primary' : 'text-secondary'}`}
              style={{
                fontSize: '12px',
                borderBottom: currentStep === 2 ? '2px solid #0062a3' : 'none',
                paddingBottom: '2px',
              }}
            >
              Amenities
            </span>
          </div>

          {/* Step 3 */}
          <div
            className="d-flex flex-column align-items-center position-relative"
            style={{ zIndex: 1, cursor: 'pointer' }}
            onClick={() => setCurrentStep(3)}
          >
            <div
              className={`rounded-circle d-flex align-items-center justify-content-center text-white fw-bold mb-1 shadow-sm ${
                currentStep >= 3 ? 'bg-primary' : 'bg-secondary-subtle text-secondary'
              }`}
              style={{
                width: '28px',
                height: '28px',
                fontSize: '13px',
                backgroundColor: currentStep >= 3 ? '#0062a3' : '#e2e8f0',
                color: currentStep >= 3 ? '#fff' : '#64748b',
              }}
            >
              3
            </div>
            <span
              className={`small fw-semibold ${currentStep === 3 ? 'text-primary' : 'text-secondary'}`}
              style={{
                fontSize: '12px',
                borderBottom: currentStep === 3 ? '2px solid #0062a3' : 'none',
                paddingBottom: '2px',
              }}
            >
              Photos
            </span>
          </div>
        </div>
      </div>

      {/* 3. Form Sections */}
      <div className="p-4 pt-0">
        {isSuccess ? (
          <div className="bg-light p-4 rounded-3 border text-center my-3">
            <div className="text-success mb-2">
              <i className="bi bi-building-check fs-1"></i>
            </div>
            <h5 className="fw-bold text-dark mb-1">Thêm khách sạn thành công!</h5>
            <p className="text-secondary small mb-4">
              Khách sạn <strong>{formData.propertyName || 'The Grand Azure Resort'}</strong> đã được lưu và sẵn sàng mở bán phòng.
            </p>
            <button
              type="button"
              className="btn btn-primary w-100 rounded-3 py-2 fw-bold"
              style={{ backgroundColor: '#0062a3' }}
              onClick={() => {
                setIsSuccess(false);
                setCurrentStep(1);
              }}
            >
              Thêm khách sạn khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleNext}>
            {currentStep === 1 && (
              <>
                {/* Step 1: General Information */}
                <h3 className="h6 fw-bold text-dark mb-3">Step 1: General Information</h3>

                {/* Property Name */}
                <div className="mb-3">
                  <label htmlFor="prop-name" className="form-label text-dark small fw-medium mb-1">
                    Property Name *
                  </label>
                  <input
                    type="text"
                    id="prop-name"
                    className="form-control"
                    placeholder="e.g. The Grand Azure Resort"
                    value={formData.propertyName}
                    onChange={(e) => handleChange('propertyName', e.target.value)}
                    required
                  />
                </div>

                {/* Property Type */}
                <div className="mb-3">
                  <label htmlFor="prop-type" className="form-label text-dark small fw-medium mb-1">
                    Property Type *
                  </label>
                  <select
                    id="prop-type"
                    className="form-select text-secondary"
                    value={formData.propertyType}
                    onChange={(e) => handleChange('propertyType', e.target.value)}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="resort">Luxury Resort</option>
                    <option value="hotel">City Hotel</option>
                    <option value="boutique">Boutique Hotel</option>
                    <option value="villa">Beach Villa</option>
                    <option value="homestay">Homestay & Apartment</option>
                  </select>
                </div>

                {/* Star Rating */}
                <div className="mb-4">
                  <label htmlFor="prop-rating" className="form-label text-dark small fw-medium mb-1">
                    Star Rating
                  </label>
                  <select
                    id="prop-rating"
                    className="form-select text-secondary"
                    value={formData.starRating}
                    onChange={(e) => handleChange('starRating', e.target.value)}
                  >
                    <option value="">Select rating</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                    <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                    <option value="3">⭐⭐⭐ 3 Stars</option>
                    <option value="2">⭐⭐ 2 Stars</option>
                    <option value="1">⭐ 1 Star</option>
                  </select>
                </div>

                {/* LOCATION DETAILS */}
                <div className="mb-3">
                  <div className="text-secondary fw-bold mb-2" style={{ fontSize: '11.5px', letterSpacing: '0.5px' }}>
                    LOCATION DETAILS
                  </div>

                  {/* Address Line 1 */}
                  <div className="mb-3">
                    <label htmlFor="loc-address" className="form-label text-dark small fw-medium mb-1">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      id="loc-address"
                      className="form-control"
                      placeholder="Street address, P.O. box, etc."
                      value={formData.addressLine1}
                      onChange={(e) => handleChange('addressLine1', e.target.value)}
                      required
                    />
                  </div>

                  {/* City */}
                  <div className="mb-3">
                    <label htmlFor="loc-city" className="form-label text-dark small fw-medium mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="loc-city"
                      className="form-control"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      required
                    />
                  </div>

                  {/* Country */}
                  <div className="mb-4">
                    <label htmlFor="loc-country" className="form-label text-dark small fw-medium mb-1">
                      Country *
                    </label>
                    <select
                      id="loc-country"
                      className="form-select"
                      value={formData.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      required
                    >
                      <option value="Vietnam">Vietnam</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Japan">Japan</option>
                      <option value="France">France</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <div className="py-2">
                <h3 className="h6 fw-bold text-dark mb-3">Step 2: Hotel Amenities</h3>
                <div className="row g-2 mb-4">
                  {[
                    { label: 'Swimming Pool', icon: 'bi-water' },
                    { label: 'Free High-Speed Wi-Fi', icon: 'bi-wifi' },
                    { label: 'Spa & Wellness', icon: 'bi-heart-pulse' },
                    { label: 'Fitness Center / Gym', icon: 'bi-activity' },
                    { label: 'Restaurant & Bar', icon: 'bi-cup-hot' },
                    { label: 'Airport Shuttle', icon: 'bi-car-front' },
                  ].map((amenity, idx) => (
                    <div key={idx} className="col-6">
                      <div className="border rounded-3 p-3 text-center bg-light">
                        <i className={`bi ${amenity.icon} fs-4 text-primary mb-1 d-block`}></i>
                        <span className="small fw-medium text-dark">{amenity.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="py-2">
                <h3 className="h6 fw-bold text-dark mb-3">Step 3: Property Photos</h3>
                <div className="border border-dashed rounded-3 p-4 text-center bg-light mb-4">
                  <i className="bi bi-cloud-arrow-up fs-1 text-secondary mb-2 d-block"></i>
                  <div className="small fw-semibold text-dark mb-1">Drag & drop photos or click to browse</div>
                  <div className="text-secondary" style={{ fontSize: '11px' }}>PNG, JPG up to 10MB each</div>
                </div>
              </div>
            )}

            {/* Next / Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2.5 fw-bold rounded-3 mb-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: '#0062a3', borderColor: '#0062a3' }}
            >
              <span>{currentStep === 3 ? 'Complete & Save Property' : 'Save & Continue'}</span>
              <i className="bi bi-arrow-right"></i>
            </button>
          </form>
        )}
      </div>

      {/* 4. Bottom Navigation */}
      <nav className="bg-white border-top py-2 px-3 d-flex align-items-center justify-content-around">
        <button
          type="button"
          className={`btn btn-link p-0 text-decoration-none d-flex flex-column align-items-center ${
            activeBottomNav === 'explore' ? 'text-primary' : 'text-secondary'
          }`}
          onClick={() => {
            setActiveBottomNav('explore');
            if (onNavigateToExplore) onNavigateToExplore();
          }}
        >
          <i className="bi bi-search fs-5"></i>
          <span style={{ fontSize: '11px' }}>Explore</span>
        </button>

        <button
          type="button"
          className={`btn btn-link p-0 text-decoration-none d-flex flex-column align-items-center ${
            activeBottomNav === 'my-hotels' ? 'text-primary' : 'text-secondary'
          }`}
          onClick={() => setActiveBottomNav('my-hotels')}
        >
          <i className="bi bi-building fs-5"></i>
          <span style={{ fontSize: '11px' }}>My Hotels</span>
        </button>

        <button
          type="button"
          className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow-sm text-white border-0"
          style={{ width: '40px', height: '40px', backgroundColor: '#0062a3', marginTop: '-15px' }}
          onClick={() => {
            setActiveBottomNav('add');
            setCurrentStep(1);
          }}
          title="Add Hotel"
        >
          <i className="bi bi-plus-lg fs-5"></i>
        </button>

        <button
          type="button"
          className={`btn btn-link p-0 text-decoration-none d-flex flex-column align-items-center ${
            activeBottomNav === 'profile' ? 'text-primary' : 'text-secondary'
          }`}
          onClick={() => {
            setActiveBottomNav('profile');
            if (onNavigateToProfile) onNavigateToProfile();
          }}
        >
          <i className="bi bi-person fs-5"></i>
          <span style={{ fontSize: '11px' }}>Profile</span>
        </button>
      </nav>
    </div>
  );
};
