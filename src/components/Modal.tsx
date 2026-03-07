// src/components/Modal.tsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  ariaLabel?: string;
  className?: string;
};

export function Modal({ children, onClose, ariaLabel = 'Modal dialog', className = '' }: ModalProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  if (!hostRef.current) hostRef.current = document.createElement('div');

  const scrollYRef = useRef<number>(0);
  const prevBodyStyleRef = useRef<Record<string, string> | null>(null);

  useEffect(() => {
    const host = hostRef.current!;
    document.body.appendChild(host);

    // LOCK background scroll (robust cross-platform)
    scrollYRef.current = window.scrollY || window.pageYOffset || 0;
    prevBodyStyleRef.current = {
      position: document.body.style.position || '',
      top: document.body.style.top || '',
      left: document.body.style.left || '',
      right: document.body.style.right || '',
      overflow: document.body.style.overflow || ''
    };

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';

    return () => {
      // restore
      const prev = prevBodyStyleRef.current;
      if (prev) {
        document.body.style.position = prev.position;
        document.body.style.top = prev.top;
        document.body.style.left = prev.left;
        document.body.style.right = prev.right;
        document.body.style.overflow = prev.overflow;
      } else {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
      }
      window.scrollTo(0, scrollYRef.current || 0);

      if (host.parentElement) host.parentElement.removeChild(host);
    };
  }, []);

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center p-6">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={`relative w-full max-w-4xl h-[85vh] bg-surface rounded-2xl shadow-2xl overflow-auto ${className}`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(modal, hostRef.current);
}
