function ImageUpload({ image, handleImageChange }) {
  return (
    <div className="upload-section">
      <label>Upload Image</label>

      <div className="upload-zone">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {!image && (
          <div className="upload-placeholder">
            <span className="up-icon">📷</span>
            <p>Click or drag a photo here</p>
            <span>JPG, PNG, WEBP — max 10 MB</span>
          </div>
        )}
        {image && (
          <img
            src={image}
            alt="Preview"
            className="preview-image"
          />
        )}
      </div>
    </div>
  );
}

export default ImageUpload;