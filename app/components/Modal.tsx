'use client';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="relative rounded-lg shadow-xl p-7 w-full max-w-lg bg-[#2E284D] text-white border-2 border-[#141414]" onMouseDown={(event) => event.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-white focus:outline-none"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
