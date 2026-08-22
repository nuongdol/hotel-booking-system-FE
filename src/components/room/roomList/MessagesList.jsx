import React, { useState } from 'react';
import { ChatDetail } from './ChatDetail.jsx';

const CONVERSATIONS = [
  {
    id: 'azure-oasis',
    name: 'Horizon Luxury Resort & Spa',
    avatar: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'Chúng tôi rất mong được đón tiếp bạn vào ngày 25/08 sắp tới...',
    time: '10:42 AM',
    unreadCount: 2,
    online: true,
    isSupport: false,
    reservationDetails: 'Đặt chỗ #TVLK-89421 cho ngày 25 Thg 8 - 28 Thg 8 đã xác nhận.',
  },
  {
    id: 'metropolitan',
    name: 'Peridot Grand Boutique Hotel',
    avatar: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'Cảm ơn quý khách! Hóa đơn điện tử VAT đã được gửi qua email.',
    time: 'Hôm qua',
    unreadCount: 0,
    online: false,
    isSupport: false,
    reservationDetails: 'Đặt phòng #TVLK-77412 (Hà Nội).',
  },
  {
    id: 'coastal-villa',
    name: 'JW Marriott Phu Quoc Resort',
    avatar: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'Dạ, xe đưa đón sân bay Phú Quốc đã được sắp xếp sẵn sàng.',
    time: 'Thứ 2',
    unreadCount: 0,
    online: true,
    isSupport: false,
    reservationDetails: 'Đặt phòng #TVLK-99124 (Phú Quốc).',
  },
  {
    id: 'staywell-support',
    name: 'Traveloka Hỗ Trợ 24/7',
    avatar: null,
    lastMessage: 'Yêu cầu hỗ trợ đổi ngày nhận phòng của bạn đã được xử lý thành công.',
    time: '12 Thg 8',
    unreadCount: 0,
    online: true,
    isSupport: true,
    reservationDetails: 'Trung tâm trợ giúp khách hàng Traveloka Việt Nam.',
  },
];

export const MessagesList = ({
  onSelectConversation,
  onNavigateToExplore,
  onNavigateToBookings,
  onNavigateToCart,
  onNavigateToProfile,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [selectedChat, setSelectedChat] = useState(CONVERSATIONS[0]);
  const [activeBottomNav, setActiveBottomNav] = useState('chat');

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (item) => {
    setSelectedChat(item);
    if (onSelectConversation) {
      onSelectConversation(item);
    }
  };

  return (
    <div className="bg-white rounded-4 shadow-sm border overflow-hidden position-relative">
      {/* 1. Header */}
      <header className="d-flex align-items-center justify-content-between p-3 px-4 bg-white border-bottom">
        <div className="d-flex align-items-center gap-2">
          {onNavigateToExplore && (
            <button
              type="button"
              className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center border me-1"
              style={{ width: '32px', height: '32px' }}
              onClick={onNavigateToExplore}
              title="Quay lại"
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          )}
          <div>
            <h1 className="h6 fw-bold mb-0 text-dark" style={{ fontSize: '1.25rem' }}>
              Tin Nhắn & Hỗ Trợ Khách Hàng
            </h1>
            <span className="text-secondary small" style={{ fontSize: '11.5px' }}>
              Trò chuyện trực tiếp với lễ tân khách sạn và nhân viên hỗ trợ Traveloka
            </span>
          </div>
        </div>

        <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-1.5 rounded-pill">
          <i className="bi bi-chat-dots-fill me-1"></i> {conversations.length} Hội thoại
        </span>
      </header>

      {/* 2. Main Desktop 2-Column Split View */}
      <div className="row g-0">
        {/* LEFT COLUMN: CONVERSATION LIST */}
        <div className="col-12 col-lg-5 border-end">
          {/* Search Input */}
          <div className="p-3 pb-2 border-bottom bg-light">
            <div className="input-group input-group-sm bg-white rounded-pill border px-2 py-0.5">
              <span className="input-group-text bg-transparent border-0 text-secondary">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-transparent border-0 shadow-none small"
                placeholder="Tìm hội thoại hoặc tên khách sạn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="btn btn-link text-secondary p-0 me-1"
                  onClick={() => setSearchTerm('')}
                >
                  <i className="bi bi-x-circle-fill"></i>
                </button>
              )}
            </div>
          </div>

          {/* Conversation List Items */}
          <div className="p-2 overflow-auto" style={{ maxHeight: '560px' }}>
            {filteredConversations.map((item) => {
              const isSelected = selectedChat?.id === item.id;
              return (
                <div
                  key={item.id}
                  className={`card border-0 rounded-3 p-3 mb-2 cursor-pointer transition-all ${
                    isSelected ? 'bg-primary-subtle shadow-sm border-start border-4 border-primary' : 'hover-bg-light'
                  }`}
                  style={{
                    backgroundColor: isSelected ? '#e8f4fc' : '#ffffff',
                    borderLeft: isSelected ? '4px solid #0194f3 !important' : 'none',
                  }}
                  onClick={() => handleSelect(item)}
                >
                  <div className="d-flex align-items-center gap-3">
                    {/* Avatar & Online Dot */}
                    <div className="position-relative flex-shrink-0">
                      {item.isSupport ? (
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center text-white"
                          style={{ width: '46px', height: '46px', backgroundColor: '#0194f3' }}
                        >
                          <i className="bi bi-headset fs-4"></i>
                        </div>
                      ) : (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="rounded-circle border"
                          style={{ width: '46px', height: '46px', objectFit: 'cover' }}
                        />
                      )}
                      {item.online && (
                        <span
                          className="position-absolute bottom-0 end-0 p-1 bg-success border border-white rounded-circle"
                          style={{ width: '12px', height: '12px' }}
                          title="Online"
                        ></span>
                      )}
                    </div>

                    {/* Content Details */}
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <h3 className="h6 fw-bold mb-0 text-dark text-truncate" style={{ fontSize: '13.5px' }}>
                          {item.name}
                        </h3>
                        <span className="text-secondary small" style={{ fontSize: '10.5px' }}>
                          {item.time}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <p className="text-secondary small mb-0 text-truncate" style={{ fontSize: '12px' }}>
                          {item.lastMessage}
                        </p>
                        {item.unreadCount > 0 && (
                          <span
                            className="badge rounded-pill bg-danger text-white ms-2"
                            style={{ fontSize: '10px' }}
                          >
                            {item.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: CHAT DETAIL (Desktop Embedded or Selected) */}
        <div className="col-12 col-lg-7 d-none d-lg-block">
          {selectedChat ? (
            <ChatDetail hotel={selectedChat} onBack={() => {}} isEmbedded={true} />
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center p-5 text-center text-secondary" style={{ minHeight: '500px' }}>
              <i className="bi bi-chat-dots fs-1 mb-2 text-primary"></i>
              <h4 className="h6 fw-bold">Chọn một cuộc trò chuyện</h4>
              <p className="small mb-0">Chọn khách sạn hoặc đội ngũ hỗ trợ bên trái để bắt đầu nhắn tin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
