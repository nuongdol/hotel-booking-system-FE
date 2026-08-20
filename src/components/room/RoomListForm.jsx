import React, { useState } from 'react';
import { Header } from './roomList/Header.jsx';
import { StepProgress } from './roomList/StepProgress.jsx';
import { BasicInfoCard } from '../room/cartRoom/BasicInfoCard.jsx';
import { AmenitiesCard } from './roomList/AmenitiesCard.jsx';
import { ImagesCard } from './roomList/ImagesCard.jsx';
import { SuccessModal } from './roomList/SuccessModal.jsx';
import { HelpModal } from './roomList/HelpModal.jsx';
import { CodeModal } from './roomList/CodeModal.jsx';
import { BookingSummary } from '../bookings/BookingSummary.jsx';
import { HotelList } from '../hotel/HotelList.jsx';
import { AuthCard } from '../auth/AuthCard.jsx';
import { ResetPasswordCard } from '../auth/ResetPasswordCard.jsx';
import { AddPropertyCard } from '../common/AddPropertyCard.jsx';
import { SecureCheckout } from '../payment/SecureCheckout.jsx';
import { TravelEaseHome } from '../home/TravelEaseHome.jsx';
import { OwnerDashboard } from '../home/OwnerDashboard.jsx';
import { ManageHotels } from '../hotel/ManageHotels.jsx';
import { CartScreen } from './roomList/CartScreen.jsx';
import { MessagesList } from './roomList/MessagesList.jsx';
import { ChatDetail } from './roomList/ChatDetail.jsx';

const INITIAL_ROOM_STATE = {
  name: '',
  type: '',
  guestCount: 2,
  area: 25,
  amenities: [],
  images: [],
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home'); 
  // 'home' | 'messages' | 'chat-detail' | 'dashboard' | 'manage-hotels' | 'cart' | 'hotels' | 'booking' | 'checkout' | 'auth' | 'reset-password' | 'add-property' | 'add-room'
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
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

  // Handle hotel selection from list or home
  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setActiveScreen('booking');
    setAlertMessage(`Đang mở xác nhận đặt phòng cho: ${hotel.name}`);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  // Handle successful login/signup
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setAlertMessage(`Chào mừng ${user.name || user.email}!`);
    setTimeout(() => {
      setActiveScreen('dashboard');
      setAlertMessage(null);
    }, 1200);
  };

  // Save & Continue handler
  const handleSave = (e) => {
    e.preventDefault();

    if (!roomData.name && !roomData.type) {
      setAlertMessage('Lưu ý: Bạn chưa nhập tên phòng hoặc loại phòng.');
      setTimeout(() => setAlertMessage(null), 4000);
    }

    setShowSuccessModal(true);
  };

  return (
    <div className="min-vh-100 py-3 py-md-4" style={{ backgroundColor: '#e9eef3' }}>
      {/* Top Navigation Bar: Screen Switcher & Tools */}
      <div className="container mb-3" style={{ maxWidth: viewMode === 'mobile' ? '460px' : '1080px' }}>
        <div className="bg-white p-2 rounded-3 shadow-sm border d-flex flex-column flex-lg-row align-items-center justify-content-between gap-2">
          {/* Tabs switch */}
          <div className="btn-group w-100 w-lg-auto overflow-auto flex-nowrap" role="group" style={{ scrollbarWidth: 'thin' }}>
            <button
              type="button"
              id="tab-home"
              className={`btn btn-sm text-nowrap ${
                activeScreen === 'home'
                  ? 'btn-primary fw-bold shadow-sm'
                  : 'btn-outline-secondary'
              }`}
              style={activeScreen === 'home' ? { backgroundColor: '#0062a3', borderColor: '#0062a3' } : {}}
              onClick={() => setActiveScreen('home')}
            >
              <i className="bi bi-house-door me-1"></i>
              Trang chủ
            </button>

            <button
              type="button"
              id="tab-dashboard"
              className={`btn btn-sm text-nowrap ${
                activeScreen === 'dashboard'
                  ? 'btn-primary fw-bold shadow-sm'
                  : 'btn-outline-secondary'
              }`}
              style={activeScreen === 'dashboard' ? { backgroundColor: '#0062a3', borderColor: '#0062a3' } : {}}
              onClick={() => setActiveScreen('dashboard')}
            >
              <i className="bi bi-speedometer2 me-1"></i>
              Dashboard
            </button>

            <button
              type="button"
              id="tab-manage-hotels"
              className={`btn btn-sm text-nowrap ${
                activeScreen === 'manage-hotels'
                  ? 'btn-primary fw-bold shadow-sm'
                  : 'btn-outline-secondary'
              }`}
              style={activeScreen === 'manage-hotels' ? { backgroundColor: '#0062a3', borderColor: '#0062a3' } : {}}
              onClick={() => setActiveScreen('manage-hotels')}
            >
              <i className="bi bi-buildings me-1"></i>
              QL Khách Sạn
            </button>

            <button
              type="button"
              id="tab-cart"
              className={`btn btn-sm text-nowrap ${
                activeScreen === 'cart'
                  ? 'btn-warning text-dark fw-bold shadow-sm'
                  : 'btn-outline-secondary'
              }`}
              style={activeScreen === 'cart' ? { backgroundColor: '#f59e0b', borderColor: '#f59e0b' } : {}}
              onClick={() => setActiveScreen('cart')}
            >
              <i className="bi bi-cart3 me-1"></i>
              Giỏ hàng
            </button>

            <button
              type="button"
              id="tab-messages"
              className={`btn btn-sm text-nowrap ${
                activeScreen === 'messages' || activeScreen === 'chat-detail'
                  ? 'btn-warning text-dark fw-bold shadow-sm'
                  : 'btn-outline-secondary'
              }`}
              style={activeScreen === 'messages' || activeScreen === 'chat-detail' ? { backgroundColor: '#f59e0b', borderColor: '#f59e0b' } : {}}
              onClick={() => setActiveScreen('messages')}
            >
              <i className="bi bi-chat-dots-fill me-1"></i>
              Tin nhắn
            </button>

            <button
              type="button"
              id="tab-hotel-list"
              className={`btn btn-sm text-nowrap ${
                activeScreen === 'hotels'
                  ? 'btn-dark fw-bold shadow-sm'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveScreen('hotels')}
            >
              <i className="bi bi-compass me-1"></i>
              Khám phá
            </button>

            <button
              type="button"
              id="tab-booking-summary"
              className={`btn btn-sm text-nowrap ${
                activeScreen === 'booking'
                  ? 'btn-warning text-white fw-bold shadow-sm'
                  : 'btn-outline-secondary'
              }`}
              style={activeScreen === 'booking' ? { backgroundColor: '#f59e0b', borderColor: '#f59e0b' } : {}}
              onClick={() => setActiveScreen('booking')}
            >
              <i className="bi bi-receipt me-1"></i>
              Đặt phòng
            </button>

            <button
              type="button"
              id="tab-checkout"
              className={`btn btn-sm text-nowrap ${
                activeScreen === 'checkout'
                  ? 'btn-dark fw-bold shadow-sm'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveScreen('checkout')}
            >
              <i className="bi bi-credit-card me-1"></i>
              Thanh toán
            </button>

            <button
              type="button"
              id="tab-auth"
              className={`btn btn-sm text-nowrap ${
                activeScreen === 'auth'
                  ? 'btn-dark fw-bold shadow-sm'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveScreen('auth')}
            >
              <i className="bi bi-box-arrow-in-right me-1"></i>
              Đăng nhập
            </button>

            <button
              type="button"
              id="tab-add-property"
              className={`btn btn-sm text-nowrap ${
                activeScreen === 'add-property'
                  ? 'btn-info text-white fw-bold shadow-sm'
                  : 'btn-outline-secondary'
              }`}
              style={activeScreen === 'add-property' ? { backgroundColor: '#0ea5e9', borderColor: '#0ea5e9' } : {}}
              onClick={() => setActiveScreen('add-property')}
            >
              <i className="bi bi-building-add me-1"></i>
              Thêm KS
            </button>

            <button
              type="button"
              id="tab-add-room"
              className={`btn btn-sm text-nowrap ${
                activeScreen === 'add-room'
                  ? 'btn-success fw-bold shadow-sm'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveScreen('add-room')}
            >
              <i className="bi bi-door-open me-1"></i>
              Thêm Phòng
            </button>
          </div>

          {/* Quick Actions */}
          <div className="d-flex align-items-center justify-content-end gap-2 w-100 w-lg-auto">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 text-nowrap"
              onClick={() => setShowCodeModal(true)}
              title="Xem và sao chép mã nguồn React JSX"
            >
              <i className="bi bi-code-slash"></i>
              <span>Xem Code JSX</span>
            </button>
            {activeScreen === 'add-room' && (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleFillSample}
                title="Điền mẫu để kiểm tra"
              >
                <i className="bi bi-magic"></i>
              </button>
            )}
            <button
              type="button"
              className="btn btn-sm btn-light border"
              onClick={() => setViewMode((m) => (m === 'mobile' ? 'responsive' : 'mobile'))}
              title="Chuyển kích thước xem"
            >
              <i className={`bi ${viewMode === 'mobile' ? 'bi-phone' : 'bi-display'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Alert toast message if any */}
      {alertMessage && (
        <div className="container mb-2" style={{ maxWidth: viewMode === 'mobile' ? '460px' : '1080px' }}>
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
        {activeScreen === 'home' && (
          /* SCREEN 0: TRANG CHỦ - TRAVELEASE */
          <TravelEaseHome
            onSelectHotel={handleSelectHotel}
            onSearch={(searchData) => {
              setActiveScreen('hotels');
              setAlertMessage(`Tìm kiếm "${searchData.destination}" (${searchData.dates})`);
              setTimeout(() => setAlertMessage(null), 3000);
            }}
            onNavigateToBookings={() => setActiveScreen('cart')}
            onNavigateToProfile={() => setActiveScreen('dashboard')}
          />
        )}

        {activeScreen === 'dashboard' && (
          /* SCREEN: DASHBOARD CHỦ KHÁCH SẠN */
          <OwnerDashboard
            onNavigateToManageHotels={() => setActiveScreen('manage-hotels')}
            onNavigateToCart={() => setActiveScreen('cart')}
            onNavigateToProfile={() => setActiveScreen('auth')}
          />
        )}

        {activeScreen === 'manage-hotels' && (
          /* SCREEN: QUẢN LÝ KHÁCH SẠN */
          <ManageHotels
            onAddProperty={() => setActiveScreen('add-property')}
            onManageRooms={() => setActiveScreen('add-room')}
            onNavigateToCart={() => setActiveScreen('cart')}
            onNavigateToExplore={() => setActiveScreen('home')}
            onEditHotel={(hotel) => {
              setAlertMessage(`Đang mở chỉnh sửa cho: ${hotel.name}`);
              setTimeout(() => setAlertMessage(null), 3000);
            }}
          />
        )}

        {activeScreen === 'cart' && (
          /* SCREEN: GIỎ HÀNG CỦA BẠN */
          <CartScreen
            onProceedToCheckout={() => setActiveScreen('checkout')}
            onNavigateToExplore={() => setActiveScreen('home')}
            onNavigateToBookings={() => setActiveScreen('booking')}
            onNavigateToProfile={() => setActiveScreen('auth')}
          />
        )}

        {activeScreen === 'messages' && (
          /* SCREEN: TIN NHẮN (MESSAGES LIST) */
          <MessagesList
            onSelectConversation={(item) => {
              setSelectedChat(item);
              setActiveScreen('chat-detail');
            }}
            onNavigateToExplore={() => setActiveScreen('home')}
            onNavigateToBookings={() => setActiveScreen('booking')}
            onNavigateToCart={() => setActiveScreen('cart')}
            onNavigateToProfile={() => setActiveScreen('dashboard')}
          />
        )}

        {activeScreen === 'chat-detail' && (
          /* SCREEN: TRÒ CHUYỆN VỚI KHÁCH SẠN (HOTEL CHAT CONVERSATION) */
          <ChatDetail
            hotel={selectedChat}
            onBack={() => setActiveScreen('messages')}
            onOpenDetails={() => {
              setAlertMessage(`Thông tin khách sạn: ${selectedChat?.name || 'Grand Azure Resort & Spa'}`);
              setTimeout(() => setAlertMessage(null), 3000);
            }}
          />
        )}

        {activeScreen === 'auth' && (
          /* SCREEN 1: ĐĂNG NHẬP / ĐĂNG KÝ - AZURE HORIZON */
          <AuthCard
            onLoginSuccess={handleLoginSuccess}
            onNavigateToExplore={() => setActiveScreen('home')}
            onForgotPassword={() => setActiveScreen('reset-password')}
          />
        )}

        {activeScreen === 'reset-password' && (
          /* SCREEN 2: QUÊN MẬT KHẨU - RESET PASSWORD */
          <ResetPasswordCard
            onBackToLogin={() => setActiveScreen('auth')}
            onClose={() => setActiveScreen('auth')}
          />
        )}

        {activeScreen === 'hotels' && (
          /* SCREEN 3: DANH SÁCH PHÒNG - VOYAGE ELITE */
          <HotelList
            onSelectHotel={handleSelectHotel}
            onAddNewRoom={() => setActiveScreen('add-room')}
            onOpenAuth={() => setActiveScreen('auth')}
          />
        )}

        {activeScreen === 'booking' && (
          /* SCREEN 4: BOOKING SUMMARY (XÁC NHẬN ĐẶT PHÒNG) */
          <BookingSummary
            selectedHotel={selectedHotel}
            onBack={() => setActiveScreen('cart')}
            onProceedToCheckout={() => setActiveScreen('checkout')}
            onBookingSuccess={() => {
              setAlertMessage('Đã xác nhận đặt phòng thành công! Bạn có thể tiến hành thanh toán.');
              setTimeout(() => setAlertMessage(null), 3000);
            }}
          />
        )}

        {activeScreen === 'checkout' && (
          /* SCREEN 5: THANH TOÁN - SECURE CHECKOUT */
          <SecureCheckout
            onBack={() => setActiveScreen('cart')}
            onPaymentSuccess={() => {
              setAlertMessage('Thanh toán hoàn tất! Đơn đặt phòng đã được xác nhận.');
              setTimeout(() => setAlertMessage(null), 4000);
            }}
          />
        )}

        {activeScreen === 'add-property' && (
          /* SCREEN 6: THÊM KHÁCH SẠN MỚI - ADD NEW PROPERTY */
          <AddPropertyCard
            onNavigateToExplore={() => setActiveScreen('home')}
            onNavigateToProfile={() => setActiveScreen('dashboard')}
          />
        )}

        {activeScreen === 'add-room' && (
          /* SCREEN 7: THÊM PHÒNG MỚI - ADD ROOM FORM */
          <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative">
            {/* 1. Header with back & help */}
            <Header
              onBack={() => {
                setActiveScreen('manage-hotels');
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
        )}
      </main>

      {/* Modals */}
      <SuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        data={roomData}
        onReset={handleReset}
        onGoToBooking={() => setActiveScreen('booking')}
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
