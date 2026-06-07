import React from "react";
import { FaExternalLinkAlt, FaFilePdf, FaFileImage } from "react-icons/fa";

const isPdf = (url) => {
  if (!url) return false;
  // Cloudinary raw PDF URLs contain /raw/upload/ or end with .pdf
  return url.includes("/raw/upload/") || url.toLowerCase().includes(".pdf");
};

const ResumeModal = ({ imageUrl, onClose }) => {
  const pdf = isPdf(imageUrl);

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col"
        style={{ width: "100%", maxWidth: pdf ? "800px" : "560px", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#CED0D4] flex-shrink-0">
          <div className="flex items-center gap-2">
            {pdf ? (
              <FaFilePdf className="text-red-500" />
            ) : (
              <FaFileImage className="text-[#1877F2]" />
            )}
            <span className="font-semibold text-sm text-[#050505]">
              Resume Preview
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Always give an open-in-new-tab option */}
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#1877F2] font-semibold hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt className="text-xs" />
              Open in new tab
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f0f2f5] text-[#65676B] hover:text-[#050505] text-xl transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto min-h-0">
          {pdf ? (
            // PDF — embed using <iframe> so it renders natively in browser
            <iframe
              src={imageUrl}
              title="Resume PDF"
              className="w-full"
              style={{ height: "75vh", border: "none" }}
            />
          ) : (
            // Image resume
            <img
              src={imageUrl}
              alt="Resume"
              className="w-full h-auto object-contain"
              style={{ maxHeight: "75vh" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
