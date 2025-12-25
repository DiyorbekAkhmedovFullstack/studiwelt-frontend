import { toast as hotToast, Toaster, type Toast } from 'react-hot-toast';
import type { ReactElement } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

const icons: Record<ToastType, ReactElement> = {
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
};

const titles: Record<ToastType, string> = {
  success: 'Success',
  error: 'Error',
  info: 'Info',
  warning: 'Warning',
};

interface CustomToastProps {
  t: Toast;
  type: ToastType;
  message: string;
}

function CustomToastComponent({ t, type, message }: CustomToastProps) {
  return (
    <div
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={`toast-item toast-${type} ${t.visible ? 'toast-enter' : 'toast-exit'}`}
      style={{
        opacity: t.visible ? 1 : 0,
      }}
    >
      <div className="toast-icon">{icons[type]}</div>
      <div className="toast-content">
        <div className="toast-title">{titles[type]}</div>
        <div className="toast-msg">{message}</div>
      </div>
      <button
        className="toast-close"
        onClick={() => hotToast.dismiss(t.id)}
        aria-label="Close"
      >
        ×
      </button>
      <div className="toast-progress">
        <div
          className="toast-progress-bar"
          style={{
            animationDuration: `${t.duration || 4000}ms`,
            animationPlayState: t.visible ? 'running' : 'paused',
          }}
        />
      </div>
    </div>
  );
}

export function CustomToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
          margin: 0,
        },
      }}
      containerStyle={{
        top: 16,
        right: 12,
      }}
      containerClassName="sm:!top-6 sm:!right-6"
    >
      {(t) => {
        const toastType = t.type === 'success' || t.type === 'error'
          ? t.type
          : t.type === 'loading'
          ? 'info'
          : 'info';

        return (
          <CustomToastComponent
            t={t}
            type={toastType}
            message={typeof t.message === 'string' ? t.message : ''}
          />
        );
      }}
    </Toaster>
  );
}
