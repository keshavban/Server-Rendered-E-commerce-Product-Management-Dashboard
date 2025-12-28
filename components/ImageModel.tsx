// components/ImageModel.tsx
"use client";

import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
};

export default function ImageModel({ isOpen, onClose, imageUrl }: Props) {
  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Overlay to close on click outside */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative bg-transparent max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        {/* Full Image */}
        <img
          src={imageUrl}
          alt="Product Full View"
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}