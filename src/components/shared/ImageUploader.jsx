import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

const ImageUploader = ({ onUpload, type = 'profile' }) => {
  const [uploading, setUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState('');

  const handleImageChange = async e => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    // Local preview
    setLocalPreview(URL.createObjectURL(imageFile));

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append(
        'upload_preset',
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData
      );

      onUpload(response.data.secure_url);
    } catch (err) {
      console.error('Cloudinary upload failed', err.response?.data || err);
      alert('Image upload failed. Check your Cloudinary config.');
    } finally {
      setUploading(false);
    }
  };

  const previewClasses =
    type === 'profile'
      ? 'w-[100px] h-[100px] rounded-full object-cover border'
      : 'w-[200px] rounded-lg object-cover border';

  return (
    <div className="w-full m-auto rounded-lg flex-grow">
      <div className="file_upload px-5 py-3 relative border border-gray-300 rounded-lg">
        <div className="flex flex-col items-center gap-4 w-max mx-auto text-center">
          {localPreview && (
            <div className="w-full flex justify-center">
              <img
                className={previewClasses}
                src={localPreview}
                alt="Selected Preview"
              />
            </div>
          )}
          <label>
            <input
              onChange={handleImageChange}
              className="hidden"
              type="file"
              accept="image/*"
            />
            <div className="bg-green-700 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-green-700">
              {uploading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  Uploading...
                </span>
              ) : (
                'Upload'
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
