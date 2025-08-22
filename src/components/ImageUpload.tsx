import React, { useState, useRef } from "react";
import "./ImageUpload.css";

interface ImageUploadProps {
  onImageSelect: (file: File, imageUrl: string) => void;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  disabled = false,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
    onImageSelect(file, imageUrl);
  };

  const onButtonClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="image-upload-container">
      {previewUrl ? (
        <div className="image-preview">
          <img src={previewUrl} alt="Preview" className="preview-image" />
          <div className="image-actions">
            <button
              onClick={onButtonClick}
              disabled={disabled}
              className="upload-button secondary"
            >
              Change Image
            </button>
            <button
              onClick={clearImage}
              disabled={disabled}
              className="upload-button danger"
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`upload-area ${dragActive ? "drag-active" : ""} ${
            disabled ? "disabled" : ""
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
        >
          <div className="upload-content">
            <div className="upload-icon">📷</div>
            <p className="upload-text">
              {dragActive
                ? "Drop the image here"
                : "Click to upload or drag and drop"}
            </p>
            <p className="upload-subtext">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        className="file-input"
        accept="image/*"
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};

export default ImageUpload;
