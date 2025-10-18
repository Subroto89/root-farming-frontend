import React from 'react';
import { X } from 'lucide-react';

const BlogModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>

      {/* Modal content */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Modal body */}
        {children}
      </div>
    </div>
  );
};

export default BlogModal;
