import React, { useState } from 'react';
import { Header } from './roomLayout/Header.jsx';
import { StepProgress } from './roomLayout/StepProgress.jsx';
import { BasicInfoCard } from './roomLayout/BasicInfoCard.jsx';
import { AmenitiesCard } from './roomLayout/AmenitiesCard.jsx';
import { ImagesCard } from './roomLayout/ImagesCard.jsx';
import { SuccessModal } from './roomLayout/SuccessModal.jsx';
import { HelpModal } from './roomLayout/HelpModal.jsx';
import { CodeModal } from './roomLayout/CodeModal.jsx';

const INITIAL_ROOM_STATE = {
  name: '',
  type: '',
  guestCount: 2,
  area: 25,
  amenities: [],
  images: [],
};

export default function App() {
  const [roomData, setRoomData] = useState(INITIAL_ROOM_STATE);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [viewMode, setViewMode] = useState('mobile');
  const [alertMessage, setAlertMessage] = useState(null);

  // Field change handler
  const handleFieldChange = (field, value) => {
    setRoomData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Toggle amenity
  const handleToggleAmenity = (amenityId) => {
    setRoomData((prev) => {
      const exists = prev.amenities.includes(amenityId);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((id) => id !== amenityId)
          : [...prev.amenities, amenityId],
      };
    });
  };

  // Add images
  const handleAddImages = (newImages) => {
    setRoomData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 5),
    }));
  };

  // Remove image
  const handleRemoveImage = (id) => {
    setRoomData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }));
  };

  // Reset to initial state
  const handleReset = () => {
    setRoomData(INITIAL_ROOM_STATE);
    setCurrentStep(1);
    setAlertMessage(null);
  };

  // Pre-fill with sample data
  const handleFillSample = () => {
    setRoomData({
      name: 'Deluxe Ocean View Double Room',
      type: 'Deluxe',
      guestCount: 2,
      area: 28,
      amenities: ['wifi', 'ac', 'breakfast', 'tv', 'balcony'],
      images: [
        {
          id: 'sample-1',
          url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
          name: 'phong-deluxe-1.jpg',
        },
        {
          id: 'sample-2',
          url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80',
          name: 'phong-deluxe-2.jpg',
        },
      ],
    });
    setAlertMessage('Đã điền dữ liệu mẫu thành công!');
    setTimeout(() => setAlertMessage(null), 3000);
  };

  // Save & Continue handler
  const handleSave = (e) => {
    e.preventDefault();

    // Basic validation warning if empty, but still allow saving
    if (!roomData.name && !roomData.type) {
      setAlertMessage('Lưu ý: Bạn chưa nhập tên phòng hoặc loại phòng.');
      setTimeout(() => setAlertMessage(null), 4000);
    }

    setShowSuccessModal(true);
  };

  return (
    <div className="min-vh-100 py-3 py-md-4" style={{ backgroundColor: '#e9eef3' }}>
      {/* Top Utility Bar for quick actions */}
      <div className="container mb-3" style={{ maxWidth: viewMode === 'mobile' ? '460px' : '720px' }}>
        <div className="d-flex align-items-center justify-content-between bg-white px-3 py-2 rounded-3 shadow-sm border">
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-primary-subtle text-primary fw-medium px-2 py-1">
              React JSX + Bootstrap
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
              onClick={() => setShowCodeModal(true)}
            >
              <i className="bi bi-code-slash"></i>
              <span className="d-none d-sm-inline">Xem mã nguồn JSX</span>
            </button>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={handleFillSample}
              title="Điền mẫu để kiểm tra"
            >
              <i className="bi bi-magic me-1"></i>
              <span className="d-none d-sm-inline">Dữ liệu mẫu</span>
            </button>
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setViewMode((m) => (m === 'mobile' ? 'responsive' : 'mobile'))}
              title="Chuyển chế độ xem"
            >
              <i className={`bi ${viewMode === 'mobile' ? 'bi-phone' : 'bi-display'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Alert toast message if any */}
      {alertMessage && (
        <div className="container mb-2" style={{ maxWidth: viewMode === 'mobile' ? '460px' : '720px' }}>
          <div className="alert alert-info py-2 px-3 small d-flex align-items-center justify-content-between mb-0 shadow-sm">
            <span>
              <i className="bi bi-info-circle-fill me-2"></i>
              {alertMessage}
            </span>
            <button
              type="button"
              className="btn-close btn-close-sm"
              onClick={() => setAlertMessage(null)}
            ></button>
          </div>
        </div>
      )}

      {/* Main App Container */}
      <main
        className="container px-2 px-sm-3"
        style={{
          maxWidth: viewMode === 'mobile' ? '430px' : '680px',
          transition: 'max-width 0.25s ease',
        }}
      >
        <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative">
          {/* 1. Header with back & help */}
          <Header
            onBack={() => {
              if (window.confirm('Bạn có muốn hủy các thay đổi và quay lại?')) {
                handleReset();
              }
            }}
            onHelp={() => setShowHelpModal(true)}
          />

          {/* 2. Stepper Progress Bar */}
          <StepProgress
            currentStep={currentStep}
            onSelectStep={(step) => setCurrentStep(step)}
          />

          {/* 3. Form Content */}
          <form onSubmit={handleSave} className="p-3" style={{ backgroundColor: '#f8f9fa' }}>
            {/* Section 1: Thông tin cơ bản */}
            <div id="section-basic-info">
              <BasicInfoCard
                roomData={roomData}
                onChange={handleFieldChange}
              />
            </div>

            {/* Section 2: Tiện nghi */}
            <div id="section-amenities">
              <AmenitiesCard
                selectedAmenities={roomData.amenities}
                onToggleAmenity={handleToggleAmenity}
              />
            </div>

            {/* Section 3: Hình ảnh */}
            <div id="section-images">
              <ImagesCard
                images={roomData.images}
                onAddImages={handleAddImages}
                onRemoveImage={handleRemoveImage}
              />
            </div>

            {/* 4. Main Submit Button */}
            <div className="pt-2 sticky-bottom bg-transparent">
              <button
                type="submit"
                id="btn-save-room"
                className="btn btn-primary-action w-100 shadow-sm d-flex align-items-center justify-content-center gap-2"
              >
                <i className="bi bi-floppy"></i>
                Lưu & Tiếp tục
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Modals */}
      <SuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        data={roomData}
        onReset={handleReset}
      />

      <HelpModal
        show={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />

      <CodeModal
        show={showCodeModal}
        onClose={() => setShowCodeModal(false)}
      />
    </div>
  );
}
