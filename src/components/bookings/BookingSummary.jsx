import React, { useState } from 'react';
import { HeaderBooking } from './HeaderBooking';
import { useNavigate } from 'react-router-dom';
import {BookingConfirmedModal} from './BookingConfirmedModal.jsx'
import {ConfirmBookingButton} from './ConfirmBookingButton.jsx'
import {GuestInfoCard} from './GuestInfoCard.jsx'
import {PriceBreakdownCard} from './PriceBreakdownCard.jsx'
import {RoomOverviewCard} from './RoomOverviewCard.jsx'
import {TravelProtectionCard} from './TravelProtectionCard.jsx'

export const BookingSummary = ({ onBack, onBookingSuccess, onProceedToCheckout, selectedHotel }) => {
  const [guestInfo, setGuestInfo] = useState({
    fullName: 'Nguyễn Văn An',
    email: 'vanan.nguyen@example.com',
    phoneNumber: '0901234567',
    isGuestForSelf: true,
    specialRequests: 'Nhận phòng tầng cao, giường lớn.',
    saveForFuture: true,
  });

  const [bookingDetails, setBookingDetails] = useState({
    hotelName: selectedHotel?.name || 'Horizon Luxury Resort & Spa Da Nang',
    roomName: selectedHotel?.roomName || 'Deluxe Ocean View Double Suite',
    roomImage:
      selectedHotel?.image ||
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    checkIn: '25 Thg 8, 2026 (14:00)',
    checkOut: '28 Thg 8, 2026 (12:00)',
    guests: 2,
    rooms: 1,
    nights: 3,
    pricePerNight: selectedHotel?.price || 3200000,
    taxRate: 0.08,
    discountAmount: 300000,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmedModal, setShowConfirmedModal] = useState(false);

  // Calculations
  const roomPriceTotal = bookingDetails.pricePerNight * bookingDetails.nights;
  const taxesAndFees = Math.round(roomPriceTotal * bookingDetails.taxRate);
  const totalPrice = roomPriceTotal + taxesAndFees - bookingDetails.discountAmount;

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  const handleInputChange = (field, value) => {
    setGuestInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmedModal(true);
      if (onBookingSuccess) {
        onBookingSuccess({ guestInfo, bookingDetails, totalPrice });
      }
    }, 600);
  };

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative">
      <HeaderBooking onBack={() => navigate('/home')} />
      {/* Main Booking Content */}
      <form onSubmit={handleSubmit} className="p-3 p-md-4 bg-light">
        <div className="row g-3 g-lg-4">
          {/* LEFT COLUMN: GUEST INFORMATION & SPECIAL REQUESTS */}
          <div className="col-12 col-lg-7">
            <GuestInfoCard guestInfo={guestInfo} onChange={handleInputChange} />
            <TravelProtectionCard />
          </div>
          {/* RIGHT COLUMN: ROOM OVERVIEW & PRICE BREAKDOWN */}
          <div className="col-12 col-lg-5">
            <RoomOverviewCard bookingDetails={bookingDetails} />
            <PriceBreakdownCard
              bookingDetails={bookingDetails}
              roomPriceTotal={roomPriceTotal}
              taxesAndFees={taxesAndFees}
              totalPrice={totalPrice}
              formatVND={formatVND}
            />
            <ConfirmBookingButton isSubmitting={isSubmitting} />
          </div>
        </div>
      </form>

      {/* Confirmation Success Modal */}
      <BookingConfirmedModal
        show={showConfirmedModal}
        onReview={() => setShowConfirmedModal(false)}
        onProceedToCheckout={() => {
          setShowConfirmedModal(false);
          if (onProceedToCheckout) onProceedToCheckout();
          navigate('/payment')
        }}
      />
    </div>
  );
};
