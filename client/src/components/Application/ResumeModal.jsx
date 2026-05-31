import React from "react";
import { RxCross2 } from "react-icons/rx";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-fb-panel rounded-xl shadow-fb-modal max-w-2xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-fb-surface hover:bg-fb-border text-fb-text transition-colors"
          aria-label="Close"
        >
          <RxCross2 />
        </button>
        <div className="p-4 pt-12">
          <img src={imageUrl} alt="Resume" className="w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
