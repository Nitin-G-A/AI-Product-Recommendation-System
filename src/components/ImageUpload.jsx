function ImageUpload({ image, handleImageChange }) {
  return (
    <div className="upload-section">
      <label>Upload Image</label>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {image && (
        <img
          src={image}
          alt="Preview"
          className="preview-image"
        />
      )}
    </div>
  );
}

export default ImageUpload;