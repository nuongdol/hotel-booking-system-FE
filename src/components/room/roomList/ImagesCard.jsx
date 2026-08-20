import React, { useRef } from 'react';

export const ImagesCard = ({
  images = [],
  onAddImages,
  onRemoveImage,
  maxImages = 5,
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    const remainingSlots = maxImages - images.length;
    if (remainingSlots <= 0) return;

    const selectedFiles = files.slice(0, remainingSlots);
    const newItems = selectedFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      url: URL.createObjectURL(file),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    }));

    onAddImages(newItems);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddSample = () => {
    if (images.length >= maxImages) return;
    const sampleUrls = [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=600&q=80',
    ];

    const nextSample = sampleUrls[images.length % sampleUrls.length];
    onAddImages([
      {
        id: Math.random().toString(36).substring(2, 9),
        url: nextSample,
        name: `Phòng mẫu ${images.length + 1}.jpg`,
      },
    ]);
  };

  // Calculate placeholder slots to render
  const placeholderCount = Math.max(0, 2 - images.length);

  return (
    <div className="card form-card p-3 mb-3">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="h6 fw-bold mb-0 text-dark">Hình ảnh</h2>
        <span className="text-secondary small fw-medium">
          {images.length}/{maxImages}
        </span>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="d-none"
        accept="image/png, image/jpeg, image/webp"
        multiple
        onChange={handleFileChange}
      />

      {/* Image Upload Gallery Row */}
      <div className="d-flex align-items-center gap-2 overflow-auto pb-2">
        {/* Upload Button */}
        {images.length < maxImages && (
          <div
            id="btn-upload-image"
            className="image-upload-box text-center"
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
          >
            <div className="position-relative mb-1">
              <i className="bi bi-camera fs-4 text-primary"></i>
            </div>
            <span className="small fw-semibold text-primary" style={{ fontSize: '11.5px' }}>
              Thêm ảnh
            </span>
          </div>
        )}

        {/* Uploaded Images */}
        {images.map((img) => (
          <div
            key={img.id}
            className="image-preview-box position-relative"
            style={{ backgroundImage: `url(${img.url})` }}
          >
            <button
              type="button"
              className="btn-delete-img"
              onClick={() => onRemoveImage(img.id)}
              aria-label="Xóa ảnh"
              title="Xóa ảnh"
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
        ))}

        {/* Placeholders matching design */}
        {Array.from({ length: placeholderCount }).map((_, idx) => (
          <div key={`placeholder-${idx}`} className="image-placeholder-box">
            <i className="bi bi-image text-muted opacity-50 fs-3"></i>
          </div>
        ))}
      </div>

      {/* Quick sample add & Helper text */}
      <div className="mt-2 pt-1 border-top d-flex flex-column gap-1">
        <p className="text-secondary mb-0" style={{ fontSize: '11px' }}>
          Hỗ trợ định dạng: JPG, PNG... Kích thước tối đa 5MB
        </p>
        <div className="d-flex align-items-center justify-content-between mt-1">
          <button
            type="button"
            id="btn-sample-image"
            className="btn btn-sm btn-outline-secondary py-0 px-2"
            style={{ fontSize: '11px' }}
            onClick={handleAddSample}
            disabled={images.length >= maxImages}
          >
            <i className="bi bi-plus me-1"></i>Thêm ảnh mẫu
          </button>
          {images.length > 0 && (
            <button
              type="button"
              className="btn btn-sm btn-link text-danger py-0 px-1 text-decoration-none"
              style={{ fontSize: '11px' }}
              onClick={() => images.forEach((img) => onRemoveImage(img.id))}
            >
              Xóa tất cả
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
