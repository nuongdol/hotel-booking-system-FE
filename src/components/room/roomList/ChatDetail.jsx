import React, { useState, useRef, useEffect } from 'react';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'concierge',
    senderName: 'Concierge Sarah',
    text: 'Hello! Welcome to Grand Azure. How can we make your upcoming stay more comfortable?',
    time: '10:42 AM',
  },
  {
    id: 2,
    sender: 'user',
    text: "Hi Sarah! I'm arriving a bit late, around 9 PM. Is the restaurant still open then?",
    time: '10:45 AM',
    status: 'read', // read | delivered | sent
  },
  {
    id: 3,
    sender: 'concierge',
    senderName: 'Concierge Sarah',
    text: 'Our main dining room closes at 10 PM, so you should have time! We also offer 24-hour room service. Would you like me to send you the late-night menu?',
    time: '10:48 AM',
  },
  {
    id: 4,
    sender: 'user',
    text: 'Yes, please! That would be perfect.',
    time: '10:50 AM',
    status: 'sent',
  },
];

export const ChatDetail = ({ hotel, onBack, onOpenDetails }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const hotelInfo = hotel || {
    name: 'Grand Azure Resort & Spa',
    avatar: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=80',
    online: true,
    reservationDetails: 'Your reservation for Sep 12 - Sep 15 is confirmed. Confirmation #AZ492K.',
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

    // Simulate auto reply from concierge
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'concierge',
          senderName: 'Concierge Sarah',
          text: 'Great! I have sent the menu to your email and our team is notified about your late arrival.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative d-flex flex-column" style={{ height: '620px' }}>
      {/* 1. Header */}
      <header className="d-flex align-items-center justify-content-between p-3 px-3.5 bg-white border-bottom flex-shrink-0">
        <div className="d-flex align-items-center gap-2.5">
          <button
            type="button"
            className="btn btn-link text-dark p-0 me-1"
            onClick={onBack}
            aria-label="Quay lại"
          >
            <i className="bi bi-arrow-left fs-5" style={{ color: '#0062a3' }}></i>
          </button>

          {/* Hotel Thumbnail */}
          <div className="position-relative" style={{ width: '40px', height: '40px' }}>
            <img
              src={hotelInfo.avatar || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=80'}
              alt={hotelInfo.name}
              className="rounded-circle w-100 h-100 border"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div>
            <h1 className="h6 fw-bold mb-0 text-dark" style={{ fontSize: '13.5px' }}>
              {hotelInfo.name}
            </h1>
            <div className="d-flex align-items-center gap-1.5" style={{ fontSize: '11px' }}>
              <span className="bg-success rounded-circle" style={{ width: '6px', height: '6px' }}></span>
              <span className="text-secondary">Online</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-link text-secondary p-0"
          onClick={onOpenDetails}
          title="Tùy chọn"
        >
          <i className="bi bi-three-dots-vertical fs-5"></i>
        </button>
      </header>

      {/* 2. Chat Scroll Area */}
      <div className="flex-grow-1 p-3 overflow-auto d-flex flex-column gap-3" style={{ backgroundColor: '#f9fafb' }}>
        {/* Date separator */}
        <div className="text-center my-1">
          <span className="badge bg-light text-secondary border px-3 py-1 fw-medium" style={{ fontSize: '11px' }}>
            Today
          </span>
        </div>

        {/* Reservation Confirmation Notice */}
        <div className="bg-light-subtle border rounded-3 p-2.5 text-center text-secondary small mx-auto" style={{ maxWidth: '340px', fontSize: '11.5px', backgroundColor: '#f1f5f9' }}>
          {hotelInfo.reservationDetails || 'Your reservation for Sep 12 - Sep 15 is confirmed. Confirmation #AZ492K.'}
        </div>

        {/* Message Stream */}
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`d-flex flex-column ${isUser ? 'align-items-end' : 'align-items-start'}`}>
              {!isUser && msg.senderName && (
                <span className="text-secondary small mb-1 ps-1 fw-medium" style={{ fontSize: '11px' }}>
                  {msg.senderName}
                </span>
              )}

              <div className="d-flex align-items-end gap-1.5" style={{ maxWidth: '85%' }}>
                {!isUser && (
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center border flex-shrink-0 bg-white shadow-xs"
                    style={{ width: '26px', height: '26px', marginBottom: '2px' }}
                  >
                    <i className="bi bi-shield-check text-primary" style={{ fontSize: '13px', color: '#0062a3' }}></i>
                  </div>
                )}

                <div
                  className={`p-3 rounded-4 shadow-2xs ${
                    isUser ? 'text-white' : 'bg-white text-dark border'
                  }`}
                  style={{
                    backgroundColor: isUser ? '#0062a3' : '#ffffff',
                    fontSize: '12.5px',
                    lineHeight: '1.45',
                    borderBottomRightRadius: isUser ? '4px' : '16px',
                    borderBottomLeftRadius: !isUser ? '4px' : '16px',
                  }}
                >
                  {msg.text}
                </div>
              </div>

              {/* Timestamp & Status */}
              <div className="d-flex align-items-center gap-1 mt-1 px-1 text-secondary" style={{ fontSize: '10px' }}>
                <span>{msg.time}</span>
                {isUser && (
                  <span>
                    {msg.status === 'read' ? (
                      <i className="bi bi-check2-all text-primary" style={{ color: '#0062a3' }}></i>
                    ) : (
                      <i className="bi bi-check2"></i>
                    )}
                  </span>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. Input Toolbar */}
      <form onSubmit={handleSend} className="p-2.5 px-3 bg-white border-top d-flex align-items-center gap-2 flex-shrink-0">
        <button
          type="button"
          className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center text-secondary border"
          style={{ width: '36px', height: '36px' }}
          title="Đính kèm ảnh"
        >
          <i className="bi bi-image fs-6"></i>
        </button>

        <div className="input-group bg-light rounded-pill border px-2">
          <input
            type="text"
            className="form-control bg-transparent border-0 small py-1.5 shadow-none"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ fontSize: '13px' }}
          />
          <button
            type="button"
            className="btn btn-link text-secondary p-0 pe-1"
            title="Biểu tượng cảm xúc"
          >
            <i className="bi bi-emoji-smile fs-5"></i>
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm flex-shrink-0"
          style={{ width: '36px', height: '36px', backgroundColor: '#0062a3', borderColor: '#0062a3' }}
          title="Gửi tin nhắn"
        >
          <i className="bi bi-send-fill" style={{ fontSize: '13px', marginLeft: '1px' }}></i>
        </button>
      </form>
    </div>
  );
};
