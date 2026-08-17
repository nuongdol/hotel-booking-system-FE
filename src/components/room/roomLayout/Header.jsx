import React from 'react';

export const Header = ({ onBack, onHelp }) => {
  return (
    <header className="d-flex align-items-center justify-content-between py-3 px-3 bg-white border-bottom sticky-top">
      <button
        type="button"
        id="btn-back"
        className="btn btn-link text-dark p-1 text-decoration-none d-flex align-items-center justify-content-center"
        onClick={onBack || (() => window.history.back())}
        style={{ width: '32px', height: '32px', borderRadius: '50%' }}
        aria-label="Quay lại"
      >
        <i className="bi bi-arrow-left fs-5"></i>
      </button>

      <h1 className="h6 fw-bold mb-0 text-dark" style={{ fontSize: '1.05rem' }}>
        Thêm Phòng Mới
      </h1>

      <button
        type="button"
        id="btn-help"
        className="btn btn-link text-secondary p-1 text-decoration-none d-flex align-items-center justify-content-center"
        onClick={onHelp}
        style={{ width: '32px', height: '32px', borderRadius: '50%' }}
        aria-label="Trợ giúp"
      >
        <i className="bi bi-question-circle fs-5"></i>
      </button>
    </header>
  );
};
