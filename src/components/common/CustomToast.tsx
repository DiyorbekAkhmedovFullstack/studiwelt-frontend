import { toast as hotToast, Toaster, type Toast } from 'react-hot-toast';
import type { ReactElement } from 'react';
import { Icon, Ui } from '../../lib/icons';

type ToastType = 'success' | 'error' | 'info' | 'warning';

const icons: Record<ToastType, ReactElement> = {
  success: <Ui.Check size={24} stroke={2.5} />,
  error: <Icon.Error size={24} stroke={2.5} />,
  info: <Icon.Info size={24} stroke={2.5} />,
  warning: <Icon.Warning size={24} stroke={2.5} />,
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
