import React, { useState } from 'react';
import { HeaderBooking } from '../bookings/HeaderBooking.jsx';
import { useNavigate } from 'react-router-dom';
import { PaymentSuccess } from './PaymentSuccess.jsx'
import { SelectionPayment } from './SelectionPayment.jsx'

export const SecureCheckout = ({ onBack, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('vietqr'); // 'vietqr' | 'momo' | 'card' | 'zalopay' | 'paylater'
  const [cardInfo, setCardInfo] = useState({
    number: '9704 •••• •••• 8868',
    expiry: '08/29',
    cvv: '998',
    name: 'NGUYEN VAN AN',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handlePay = (e) => {
    e?.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    }, 900);
  };
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative">
      {/* 1. Header */}
      <HeaderBooking onBack={() => navigate('/booking')} />

      {/* 2. Main Checkout Body (Desktop 2-Column) */}
      <div className="p-3 p-md-4 bg-light">
        {isPaid ? (
          <PaymentSuccess paymentMethod={paymentMethod}
            onBack={onBack}
          />
        ) : (
          <>
            {/* LEFT COLUMN: PAYMENT METHODS */}
            <SelectionPayment
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              cardInfo={cardInfo}
              setCardInfo={setCardInfo}
              isProcessing={isProcessing}
              handlePay={handlePay}
            />
          </>
        )}
      </div>
    </div>
  );
};
