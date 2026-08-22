import React, { useState, useRef, useEffect } from 'react';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'concierge',
    senderName: 'Lễ Tân Khách Sạn (Sarah)',
    text: 'Xin chào quý khách! Cảm ơn bạn đã đặt phòng qua Traveloka. Chúng tôi có thể hỗ trợ gì để kỳ nghỉ sắp tới của bạn thêm trọn vẹn?',
    time: '10:42 AM',
  },
  {
    id: 2,
    sender: 'user',
    text: 'Chào bạn! Mình dự kiến đến khách sạn hơi muộn tầm 21:00 tối, nhà hàng và quầy bar của resort còn phục vụ ăn tối không ạ?',
    time: '10:45 AM',
    status: 'read',
  },
  {
    id: 3,
    sender: 'concierge',
    senderName: 'Lễ Tân Khách Sạn (Sarah)',
    text: 'Dạ nhà hàng chính mở cửa phục vụ đến 22:00, và khách sạn có dịch vụ In-Room Dining 24/7. Bạn có muốn mình gửi trước thực đơn tối qua tin nhắn không ạ?',
    time: '10:48 AM',
  },
  {
    id: 4,
    sender: 'user',
    text: 'Tuyệt vời quá! Bạn gửi giúp mình thực đơn nhé. Cảm ơn bạn!',
    time: '10:50 AM',
    status: 'sent',
  },
];

export const ChatDetail = ({ hotel, onBack, onOpenDetails, isEmbedded = false }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const hotelInfo = hotel || {
    name: 'Horizon Luxury Resort & Spa',
    avatar: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=80',
    online: true,
    reservationDetails: 'Đặt chỗ #TVLK-89421 cho ngày 25 Thg 8 - 28 Thg 8 đã xác nhận.',
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate auto reply from hotel concierge
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'concierge',
          senderName: 'Lễ Tân Khách Sạn (Sarah)',
          text: 'Dạ vâng, bên mình đã ghi chú thông tin nhận phòng muộn và gửi kèm thực đơn món ngon đặc sản Đà Nẵng rồi ạ!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className={`bg-white ${!isEmbedded ? 'rounded-4 shadow-sm border' : ''} overflow-hidden position-relative d-flex flex-column`} style={{ height: isEmbedded ? '600px' : '650px' }}>
      {/* 1. Header */}
      <header className="d-flex align-items-center justify-content-between p-3 px-3.5 bg-white border-bottom flex-shrink-0">
        <div className="d-flex align-items-center gap-2.5">
          {!isEmbedded && (
            <button
              type="button"
              className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center border me-1"
              style={{ width: '32px', height: '32px' }}
              onClick={onBack}
              aria-label="Quay lại"
            >
              <i className="bi bi-arrow-left" style={{ color: '#0194f3' }}></i>
            </button>
          )}

          {/* Hotel Thumbnail */}
          <div className="position-relative flex-shrink-0" style={{ width: '40px', height: '40px' }}>
            {hotelInfo.avatar ? (
              <img
                src={hotelInfo.avatar}
                alt={hotelInfo.name}
                className="w-100 h-100 rounded-circle border object-fit-cover"
              />
            ) : (
              <div
                className="w-100 h-100 rounded-circle d-flex align-items-center justify-content-center text-white"
                style={{ backgroundColor: '#0194f3' }}
              >
                <i className="bi bi-headset fs-5"></i>
              </div>
            )}
            {hotelInfo.online && (
              <span
                className="position-absolute bottom-0 end-0 p-1 bg-success border border-white rounded-circle"
                style={{ width: '10px', height: '10px' }}
              ></span>
            )}
          </div>

          {/* Hotel Name & Status */}
          <div>
            <h3 className="h6 fw-bold mb-0 text-dark text-truncate" style={{ fontSize: '14.5px', maxWidth: '240px' }}>
              {hotelInfo.name}
            </h3>
            <span className="text-success small d-flex align-items-center gap-1" style={{ fontSize: '11px' }}>
              <span className="d-inline-block rounded-circle bg-success" style={{ width: '6px', height: '6px' }}></span>
              Đang hoạt động (Phản hồi trong vài phút)
            </span>
          </div>
        </div>

        {/* Action Menu */}
        <div className="d-flex align-items-center gap-1">
          <button
            type="button"
            className="btn btn-light btn-sm rounded-pill px-2.5 py-1 text-primary d-none d-sm-inline-flex align-items-center gap-1 border"
            onClick={onOpenDetails}
          >
            <i className="bi bi-info-circle"></i>
            <span className="small">Chi tiết đặt phòng</span>
          </button>
        </div>
      </header>

      {/* 2. Message Conversation History Body */}
      <div className="flex-grow-1 p-3 overflow-auto d-flex flex-column gap-2.5" style={{ backgroundColor: '#f4f7fa' }}>
        {/* Date Marker */}
        <div className="text-center my-1">
          <span className="badge bg-white text-secondary border px-3 py-1 fw-normal" style={{ fontSize: '11px' }}>
            Hôm nay, 20 Tháng 8
          </span>
        </div>

        {/* Booking Reference Notice */}
        <div className="bg-white border rounded-3 p-2.5 text-center shadow-xs mx-auto my-1" style={{ maxWidth: '92%' }}>
          <div className="small text-primary fw-bold mb-0.5">
            <i className="bi bi-shield-check me-1"></i>
            Xác nhận đặt phòng Traveloka
          </div>
          <span className="text-secondary small" style={{ fontSize: '11.5px' }}>
            {hotelInfo.reservationDetails || 'Mã đặt chỗ #TVLK-89421 cho ngày 25 Thg 8 - 28 Thg 8 đã được bảo đảm.'}
          </span>
        </div>

        {/* Messages */}
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`d-flex flex-column ${isUser ? 'align-items-end' : 'align-items-start'}`}
            >
              {!isUser && msg.senderName && (
                <span className="text-secondary small ms-1 mb-1" style={{ fontSize: '10.5px' }}>
                  {msg.senderName}
                </span>
              )}

              <div
                className={`p-3 rounded-4 shadow-sm position-relative ${
                  isUser
                    ? 'text-white'
                    : 'bg-white border text-dark'
                }`}
                style={{
                  maxWidth: '82%',
                  fontSize: '13px',
                  lineHeight: '1.45',
                  backgroundColor: isUser ? '#0194f3' : '#ffffff',
                  borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                }}
              >
                {msg.text}
              </div>

              <div className="d-flex align-items-center gap-1 mt-1 px-1">
                <span className="text-secondary" style={{ fontSize: '10px' }}>
                  {msg.time}
                </span>
                {isUser && (
                  <i className="bi bi-check2-all text-primary small" style={{ fontSize: '12px' }}></i>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. Input & Attachment Bar */}
      <form onSubmit={handleSend} className="p-2.5 px-3 bg-white border-top d-flex align-items-center gap-2 flex-shrink-0">
        <button
          type="button"
          className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center text-secondary border-0"
          style={{ width: '36px', height: '36px' }}
          title="Gửi hình ảnh"
        >
          <i className="bi bi-image fs-5"></i>
        </button>

        <div className="input-group bg-light rounded-pill border px-2 py-1 flex-grow-1 align-items-center">
          <input
            type="text"
            className="form-control bg-transparent border-0 ps-2 small shadow-none"
            placeholder="Nhập tin nhắn cho khách sạn..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ fontSize: '13px' }}
          />
          <button
            type="button"
            className="btn btn-link text-secondary p-0 me-1"
            title="Icon cảm xúc"
          >
            <i className="bi bi-emoji-smile"></i>
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-warning rounded-circle p-0 d-flex align-items-center justify-content-center text-white shadow-sm flex-shrink-0"
          style={{
            width: '38px',
            height: '38px',
            backgroundColor: '#ff5e1f',
            borderColor: '#ff5e1f',
          }}
          disabled={!inputText.trim()}
          title="Gửi tin nhắn"
        >
          <i className="bi bi-send-fill" style={{ fontSize: '14px', marginLeft: '2px' }}></i>
        </button>
      </form>
    </div>
  );
};
