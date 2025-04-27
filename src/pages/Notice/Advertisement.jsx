import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import Button from '../../component/Button';

const Advertisement = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [submittedImages, setSubmittedImages] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ type: '', index: null });

  const fileInputRef = useRef();

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...imageUrls]);
  };

  const confirmDelete = (type, index) => {
    setDeleteTarget({ type, index });
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    const { type, index } = deleteTarget;
    if (type === 'selected') {
      setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    } else if (type === 'submitted') {
      setSubmittedImages((prev) => prev.filter((_, i) => i !== index));
    }
    setShowConfirm(false);
    setDeleteTarget({ type: '', index: null });
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setDeleteTarget({ type: '', index: null });
  };

  const handleSubmit = () => {
    if (selectedImages.length === 0) return;
    setSubmittedImages((prev) => [...prev, ...selectedImages]);
    setSelectedImages([]);
  };

  const ImagePreviewCard = ({ src, onDelete }) => (
    <div className="relative w-32 h-32 m-2 border rounded-md overflow-hidden">
      <img src={src} alt="preview" className="object-cover w-full h-full" />
      <button
        onClick={onDelete}
        className="absolute top-1 right-1 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-1"
      >
        <X size={16} />
      </button>
    </div>
  );

  const ConfirmModal = () => (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h3 className="text-xl font-semibold mb-4 text-center text-red-600">
          Are you sure you want to delete this image?
        </h3>
        <div className="flex justify-center gap-4">
          <Button label="Cancel" color="gray" onClick={handleCancelDelete} >Cancel </Button>
          <Button label="Delete" color="red" onClick={handleConfirmDelete} >Delete </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Upload Advertisement Images</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageSelect}
        className="hidden"
      />

      <Button label="Select Images" onClick={() => fileInputRef.current.click()} > Select Images </Button>

      {selectedImages.length > 0 && (
        <>
          <h3 className="font-semibold">Selected Images</h3>
          <div className="flex flex-wrap">
            {selectedImages.map((img, index) => (
              <ImagePreviewCard
                key={index}
                src={img}
                onDelete={() => confirmDelete('selected', index)}
              />
            ))}
          </div>

          <Button onClick={handleSubmit} label="Submit" >Submit </Button>
        </>
      )}

      {submittedImages.length > 0 && (
        <>
          <h3 className="font-semibold mt-6">Uploaded Images</h3>
          <div className="flex flex-wrap">
            {submittedImages.map((img, index) => (
              <ImagePreviewCard
                key={index}
                src={img}
                onDelete={() => confirmDelete('submitted', index)}
              />
            ))}
          </div>
        </>
      )}

      {showConfirm && <ConfirmModal />}
    </div>
  );
};

export default Advertisement;
