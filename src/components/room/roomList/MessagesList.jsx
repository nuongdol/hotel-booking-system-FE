import React, { useState } from 'react';

const CONVERSATIONS = [
  {
    id: 'azure-oasis',
    name: 'The Azure Oasis Resort',
    avatar: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'We look forward to welcoming you soon...',
    time: '10:42 AM',
    unreadCount: 2,
    online: true,
    isSupport: false,
  },
  {
    id: 'metropolitan',
    name: 'Metropolitan Suites',
    avatar: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'Thank you for your stay. Here is the invoice...',
    time: 'Yesterday',
    unreadCount: 0,
    online: false,
    isSupport: false,
  },
  {
    id: 'coastal-villa',
    name: 'Coastal Villa Retreat',
    avatar: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'Perfect, we have arranged the airport pickup...',
    time: 'Mon',
    unreadCount: 0,
    online: false,
    isSupport: false,
  },
  {
    id: 'staywell-support',
    name: 'StayWell Support',
    avatar: null,
    lastMessage: 'Your refund request has been processed...',
    time: 'Oct 12',
    unreadCount: 0,
    online: true,
    isSupport: true,
  },
];

export const MessagesList = ({ onSelectConversation, onNavigateToExplore, onNavigateToBookings, onNavigateToCart, onNavigateToProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [activeBottomNav, setActiveBottomNav] = useState('chat');

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative pb-1">
      {/* 1. Header */}
      <header className="d-flex align-items-center justify-content-between p-3 px-4 bg-white border-bottom">
        <h1 className="h5 fw-bold mb-0 text-dark" style={{ fontSize: '1.35rem', letterSpacing: '-0.3px' }}>
          Messages
        </h1>

        <button
          type="button"
          className="btn btn-link text-secondary p-0"
          title="Tùy chọn lọc"
          onClick={() => alert('Bộ lọc tin nhắn')}
        >
          <i className="bi bi-sliders2 fs-5"></i>
        </button>
      </header>

      {/* 2. Search Input */}
      <div className="p-3 pb-2">
        <div className="input-group bg-light rounded-3 border">
          <span className="input-group-text bg-transparent border-0 text-secondary ps-3">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control bg-transparent border-0 ps-1 small shadow-none"
            placeholder="Search conversations or hotels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ fontSize: '13px' }}
          />
          {searchTerm && (
            <button
              type="button"
              className="btn btn-link text-secondary p-0 pe-3 text-decoration-none"
              onClick={() => setSearchTerm('')}
            >
              <i className="bi bi-x-circle-fill small"></i>
            </button>
          )}
        </div>
      </div>

      {/* 3. Conversation List */}
      <div className="p-3 pt-1 d-flex flex-column gap-2.5" style={{ minHeight: '380px' }}>
        {filteredConversations.map((item) => (
          <div
            key={item.id}
            className={`card border rounded-3 p-3 transition-all cursor-pointer ${
              item.unreadCount > 0 ? 'border-primary bg-primary-subtle bg-opacity-10' : 'bg-white'
            }`}
            style={{
              cursor: 'pointer',
              borderColor: item.unreadCount > 0 ? '#b9e6fe' : '#e2e8f0',
            }}
            onClick={() => onSelectConversation && onSelectConversation(item)}
          >
            <div className="d-flex align-items-center gap-3">
              {/* Avatar & Online Dot */}
              <div className="position-relative flex-shrink-0">
                {item.isSupport ? (
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center text-primary"
                    style={{ width: '46px', height: '46px', backgroundColor: '#e0e7ff' }}
                  >
                    <i className="bi bi-headset fs-4" style={{ color: '#4f46e5' }}></i>
                  </div>
                ) : (
                  <div className="rounded-circle overflow-hidden border" style={{ width: '46px', height: '46px' }}>
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}

                {item.online && (
                  <span
                    className="position-absolute bottom-0 end-0 p-1 bg-success border border-white rounded-circle"
                    style={{ width: '11px', height: '11px' }}
                  ></span>
                )}
              </div>

              {/* Message Details */}
              <div className="flex-grow-1 overflow-hidden">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <h2 className="h6 fw-bold text-dark mb-0 text-truncate" style={{ fontSize: '13.5px' }}>
                    {item.name}
                  </h2>
                  <span
                    className={`small ${item.unreadCount > 0 ? 'text-primary fw-bold' : 'text-secondary'}`}
                    style={{ fontSize: '10.5px' }}
                  >
                    {item.time}
                  </span>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <p className="text-secondary small mb-0 text-truncate pe-2" style={{ fontSize: '12px', maxWidth: '190px' }}>
                    {item.lastMessage}
                  </p>

                  {item.unreadCount > 0 && (
                    <span
                      className="badge rounded-pill bg-primary fw-bold"
                      style={{ backgroundColor: '#0062a3', fontSize: '10px', padding: '4px 7px' }}
                    >
                      {item.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Bottom Navigation */}
      <nav className="bg-white border-top py-2 px-3 d-flex align-items-center justify-content-around sticky-bottom">
        <button
          type="button"
          className="btn btn-link p-0 text-secondary text-decoration-none d-flex flex-column align-items-center"
          onClick={onNavigateToExplore}
        >
          <i className="bi bi-search fs-5"></i>
          <span style={{ fontSize: '10.5px' }}>Explore</span>
        </button>

        <button
          type="button"
          className="btn btn-link p-0 text-secondary text-decoration-none d-flex flex-column align-items-center"
          onClick={onNavigateToBookings}
        >
          <i className="bi bi-calendar2-check fs-5"></i>
          <span style={{ fontSize: '10.5px' }}>Bookings</span>
        </button>

        <button
          type="button"
          className="btn btn-link p-0 text-secondary text-decoration-none d-flex flex-column align-items-center"
          onClick={onNavigateToCart}
        >
          <i className="bi bi-cart3 fs-5"></i>
          <span style={{ fontSize: '10.5px' }}>Cart</span>
        </button>

        <button
          type="button"
          className="btn btn-warning text-dark fw-bold rounded-3 px-3 py-1.5 d-flex align-items-center gap-1.5 shadow-sm"
          style={{ backgroundColor: '#f59e0b', borderColor: '#f59e0b', fontSize: '11.5px' }}
          onClick={() => setActiveBottomNav('chat')}
        >
          <i className="bi bi-chat-dots-fill"></i>
          <span>Chat</span>
        </button>

        <button
          type="button"
          className="btn btn-link p-0 text-secondary text-decoration-none d-flex flex-column align-items-center"
          onClick={onNavigateToProfile}
        >
          <i className="bi bi-person fs-5"></i>
          <span style={{ fontSize: '10.5px' }}>Profile</span>
        </button>
      </nav>
    </div>
  );
};
