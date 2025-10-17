import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

const ImageUploader = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState('');

  const handleChange = async e => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      onUpload(res.data.data.url);
    } catch (err) {
      console.error(err);
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mb-2 w-full h-20 object-cover rounded"
        />
      )}
      <label className="inline-block bg-green-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-700">
        {uploading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={16} />
            Uploading...
          </span>
        ) : (
          'Upload Image'
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
