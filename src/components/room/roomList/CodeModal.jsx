import React, { useState } from 'react';

export const CodeModal = ({ show, onClose }) => {
  const [activeTab, setActiveTab] = useState('messages'); 
  // 'messages' | 'chat-detail' | 'dashboard' | 'manage-hotels' | 'cart'
  const [copied, setCopied] = useState(false);

  if (!show) return null;

  const messagesListCode = `import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function MessagesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const conversations = [
    {
      id: 'azure-oasis',
      name: 'The Azure Oasis Res...',
      avatar: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=80',
      lastMessage: 'We look forward to welcomin...',
      time: '10:42 AM',
      unreadCount: 2,
      online: true,
    },
    {
      id: 'metropolitan',
      name: 'Metropolitan Suites',
      avatar: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=200&q=80',
      lastMessage: 'Thank you for your stay. Here is th...',
      time: 'Yesterday',
      unreadCount: 0,
      online: false,
    },
    {
      id: 'coastal-villa',
      name: 'Coastal Villa Retreat',
      avatar: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=200&q=80',
      lastMessage: 'Perfect, we have arranged the airp...',
      time: 'Mon',
      unreadCount: 0,
      online: false,
    },
    {
      id: 'staywell-support',
      name: 'StayWell Support',
      avatar: null,
      lastMessage: 'Your refund request has been proc...',
      time: 'Oct 12',
      unreadCount: 0,
      online: true,
      isSupport: true,
    },
  ];

  return (
    <div className="container py-3" style={{ maxWidth: '420px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0">Messages</h4>
        <i className="bi bi-sliders2 fs-5 text-secondary"></i>
      </div>

      {/* Search */}
      <div className="input-group bg-light rounded-3 border mb-3">
        <span className="input-group-text bg-transparent border-0"><i className="bi bi-search"></i></span>
        <input
          type="text"
          className="form-control bg-transparent border-0 ps-0 small shadow-none"
          placeholder="Search conversations or hotels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* List */}
      {conversations.map((item) => (
        <div
          key={item.id}
          className={'card border rounded-3 p-3 mb-2.5 ' + (item.unreadCount > 0 ? 'border-primary' : '')}
        >
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              {item.isSupport ? (
                <div className="rounded-3 d-flex align-items-center justify-content-center bg-primary-subtle" style={{ width: '46px', height: '46px' }}>
                  <i className="bi bi-headset fs-4 text-primary"></i>
                </div>
              ) : (
                <img src={item.avatar} alt={item.name} className="rounded-circle border" style={{ width: '46px', height: '46px', objectFit: 'cover' }} />
              )}
              {item.online && <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-white rounded-circle"></span>}
            </div>

            <div className="flex-grow-1 overflow-hidden">
              <div className="d-flex justify-content-between mb-1">
                <h6 className="fw-bold mb-0 text-truncate">{item.name}</h6>
                <span className="small text-secondary" style={{ fontSize: '11px' }}>{item.time}</span>
              </div>
              <div className="d-flex justify-content-between">
                <p className="text-secondary small mb-0 text-truncate">{item.lastMessage}</p>
                {item.unreadCount > 0 && (
                  <span className="badge rounded-pill bg-primary">{item.unreadCount}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}`;

  const chatDetailCode = `import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function ChatDetail() {
  const [messages, setMessages] = useState([
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
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: inputText,
        time: '10:52 AM',
      },
    ]);
    setInputText('');
  };

  return (
    <div className="container py-3" style={{ maxWidth: '420px' }}>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom bg-white rounded-top-4">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-arrow-left fs-5 text-primary"></i>
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=200&q=80"
            alt="hotel"
            className="rounded-circle border"
            style={{ width: '36px', height: '36px' }}
          />
          <div>
            <h6 className="fw-bold mb-0">Grand Azure Resort & Spa</h6>
            <span className="text-success small" style={{ fontSize: '10px' }}>● Online</span>
          </div>
        </div>
        <i className="bi bi-three-dots-vertical fs-5 text-secondary"></i>
      </div>

      {/* Body */}
      <div className="p-3 bg-light d-flex flex-column gap-3" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <span className="badge bg-white text-secondary border px-3 py-1">Today</span>
        </div>
        <div className="bg-light-subtle border rounded-3 p-2 text-center text-secondary small">
          Your reservation for Sep 12 - Sep 15 is confirmed. Confirmation #AZ492K.
        </div>

        {messages.map((m) => (
          <div key={m.id} className={'d-flex flex-column ' + (m.sender === 'user' ? 'align-items-end' : 'align-items-start')}>
            {m.senderName && <span className="text-secondary small mb-1">{m.senderName}</span>}
            <div
              className={'p-3 rounded-4 ' + (m.sender === 'user' ? 'bg-primary text-white' : 'bg-white border text-dark')}
              style={{ maxWidth: '85%', fontSize: '13px' }}
            >
              {m.text}
            </div>
            <span className="text-secondary mt-1" style={{ fontSize: '10px' }}>{m.time}</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-2 bg-white border-top d-flex align-items-center gap-2 rounded-bottom-4">
        <i className="bi bi-image fs-5 text-secondary"></i>
        <input
          type="text"
          className="form-control rounded-pill bg-light border-0 small"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
          <i className="bi bi-send-fill"></i>
        </button>
      </form>
    </div>
  );
}`;

  const dashboardCode = `import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function OwnerDashboard() {
  return (
    <div className="container py-3" style={{ maxWidth: '420px' }}>
      <div className="card p-3 rounded-4 border-0 mb-3 bg-light">
        <span className="small text-secondary">Total Earnings (MTD)</span>
        <h4 className="fw-bold mb-0">$24,500</h4>
      </div>
    </div>
  );
}`;

  let currentCode = messagesListCode;
  let currentFileName = 'MessagesList.jsx';

  if (activeTab === 'chat-detail') {
    currentCode = chatDetailCode;
    currentFileName = 'ChatDetail.jsx';
  } else if (activeTab === 'dashboard') {
    currentCode = dashboardCode;
    currentFileName = 'OwnerDashboard.jsx';
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: 1060 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg px-3">
        <div className="modal-content rounded-4 border-0 shadow">
          <div className="modal-header border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
            <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2 mb-0">
              <i className="bi bi-code-slash text-primary"></i>
              Mã nguồn ReactJS (JSX) + Bootstrap
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-4 pt-3 bg-light border-bottom">
            <ul className="nav nav-pills gap-2 mb-2 flex-nowrap overflow-auto">
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link py-1 px-3 small fw-semibold text-nowrap ${
                    activeTab === 'messages' ? 'active bg-warning text-dark' : 'text-secondary'
                  }`}
                  onClick={() => setActiveTab('messages')}
                >
                  <i className="bi bi-chat-dots me-1"></i>
                  MessagesList.jsx (Tin nhắn)
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link py-1 px-3 small fw-semibold text-nowrap ${
                    activeTab === 'chat-detail' ? 'active bg-primary text-white' : 'text-secondary'
                  }`}
                  onClick={() => setActiveTab('chat-detail')}
                >
                  <i className="bi bi-chat-text me-1"></i>
                  ChatDetail.jsx (Trò chuyện KS)
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link py-1 px-3 small fw-semibold text-nowrap ${
                    activeTab === 'dashboard' ? 'active bg-primary text-white' : 'text-secondary'
                  }`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <i className="bi bi-speedometer2 me-1"></i>
                  OwnerDashboard.jsx (Dashboard)
                </button>
              </li>
            </ul>
          </div>

          <div className="modal-body p-4 bg-dark rounded-bottom-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-light small font-monospace">{currentFileName}</span>
              <button
                type="button"
                className="btn btn-sm btn-outline-light d-flex align-items-center gap-1"
                onClick={handleCopy}
              >
                <i className={`bi ${copied ? 'bi-check2' : 'bi-clipboard'}`}></i>
                {copied ? 'Đã sao chép!' : 'Sao chép mã'}
              </button>
            </div>
            <pre
              className="text-white bg-black p-3 rounded-3 overflow-auto small mb-0"
              style={{ maxHeight: '420px', fontSize: '12.5px', lineHeight: '1.45' }}
            >
              <code>{currentCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
