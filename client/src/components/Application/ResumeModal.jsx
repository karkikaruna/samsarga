import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl overflow-hidden max-w-xl w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#CED0D4]">
          <span className="font-semibold text-sm text-[#050505]">Resume Preview</span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f0f2f5] text-[#65676B] hover:text-[#050505] text-xl transition-colors"
          >
            ×
          </button>
        </div>
        <img src={imageUrl} alt="Resume" className="w-full h-auto max-h-[75vh] object-contain" />
      </div>
    </div>
  );
};

export default ResumeModal;
